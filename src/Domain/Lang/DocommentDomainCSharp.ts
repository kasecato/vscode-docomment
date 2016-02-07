import {SyntacticAnalysisCSharp} from '../../SyntacticAnalysis/SyntacticAnalysisCSharp';
import {StringUtil} from '../../Utility/StringUtil';
import {DocommentDomain} from '../DocommentDomain';
import {CodeType} from '../IDocommentDomain';
import {Position} from 'vscode';

export class DocommentDomainCSharp extends DocommentDomain {


    /*-------------------------------------------------------------------------
     * Domain Method
     *-----------------------------------------------------------------------*/

    /* @override */
    public IsTriggerDocomment(): boolean {

        // NG: KeyCode is NOT '/' or Enter
        const activeChar: string = this._vsCodeApi.ReadCharAtCurrent();
        if (activeChar == null) return false;
        const isSlashKey: boolean = (activeChar === '/');
        const isEnterKey: boolean = (activeChar === '') && this._event.text.startsWith('\n');
        if (!isSlashKey && !isEnterKey) return false;

        // NG: Line is NOT /// (NG: ////)
        const activeLine: string = this._vsCodeApi.ReadLineAtCurrent();
        if (activeLine == null) return false;
        
        if (isSlashKey) {
            const isDocComment: boolean = (activeLine.match(/(?:[^/]\/{3}$)|(?:^\/{3}[^/])|(?:^\/{3}$)/) !== null); // fixme: to simple
            if (!isDocComment) return false;
        }
        if (isEnterKey) {
            const isDocComment: boolean = (activeLine.match(/\/{3}/) !== null);
            if (!isDocComment) return false;

            const nextLine = this._vsCodeApi.ReadLine(this._vsCodeApi.GetActiveLine() + 2);
            if (!nextLine.match(/\/{3}/)) return false;

            return true;
        }

        // NG: Position is NOT ///
        const position: number = this._vsCodeApi.GetActiveCharPosition();
        const positionDocComment: number = activeLine.lastIndexOf('///') + ((isEnterKey) ? 3 : 2);
        const isLastPosition: boolean = (position === positionDocComment);
        if (!isLastPosition) return false;

        // NG: Previous line is XML document comment
        const previousLine: string = this._vsCodeApi.ReadPreviousLineFromCurrent();
        if (previousLine != null && previousLine.match(/\/{3}/)) return false;

        // OK
        return true;
    }

    /* @override */
    public GetCodeType(code: string): CodeType {

        /*-------------------------------------------------------------------------
         *
         *-----------------------------------------------------------------------*/

        /* namespace */
        if (SyntacticAnalysisCSharp.IsNamespace(code)) return CodeType.Namespace;

        /* class */
        if (SyntacticAnalysisCSharp.IsClass(code)) return CodeType.Class;

        /* interface */
        if (SyntacticAnalysisCSharp.IsInterface(code)) return CodeType.Interface;

        /* struct */
        if (SyntacticAnalysisCSharp.IsStruct(code)) return CodeType.Struct;

        /* enum */
        if (SyntacticAnalysisCSharp.IsEnum(code)) return CodeType.Enum;


        /*-------------------------------------------------------------------------
         * 
         *-----------------------------------------------------------------------*/
        const isInMethod = false; // fixme:
        if (isInMethod) return CodeType.None;

        /* delegate */
        if (SyntacticAnalysisCSharp.IsDelegate(code)) return CodeType.Delegate;

        /* event */
        if (SyntacticAnalysisCSharp.IsEvent(code)) return CodeType.Event;

        /* property */
        if (SyntacticAnalysisCSharp.IsProperty(code)) return CodeType.Property;

        /* field */
        if (SyntacticAnalysisCSharp.IsField(code)) return CodeType.Field;

        /* method */
        if (SyntacticAnalysisCSharp.IsMethod(code)) return CodeType.Method;

        /* comment */
        if (SyntacticAnalysisCSharp.IsComment(code)) return CodeType.Comment;

        return CodeType.None;
    }

    /* @override */
    public GeneDocomment(code: string, codeType: CodeType): string {

        let paramNameList: Array<string> = null;
        let hasReturn = false;
        switch (codeType) {
            case CodeType.Namespace:
                break;
            case CodeType.Class:
                break;
            case CodeType.Interface:
                break;
            case CodeType.Struct:
                break;
            case CodeType.Enum:
                break;
            case CodeType.Delegate:
                paramNameList = SyntacticAnalysisCSharp.GetMethodParamNameList(code);
                hasReturn = SyntacticAnalysisCSharp.HasMethodReturn(code);
                break;
            case CodeType.Event:
                break;
            case CodeType.Method:
                paramNameList = SyntacticAnalysisCSharp.GetMethodParamNameList(code);
                hasReturn = SyntacticAnalysisCSharp.HasMethodReturn(code);
                break;
            case CodeType.Field:
                break;
            case CodeType.Property:
                hasReturn = SyntacticAnalysisCSharp.HasPropertyReturn(code);
                break;
            case CodeType.Comment:
                return '/// ';
            case CodeType.None:
                return ''
            default:
                return '';
        }

        return this.GeneSummary(code, paramNameList, hasReturn);
    }

    /* @implements */
    public WriteDocomment(code: string, codeType: CodeType, docommnet: string): void {
        const position: Position = this._vsCodeApi.GetActivePosition();

        if (codeType === CodeType.Comment) {
            const indentLen: number = StringUtil.GetIndent(code).length;
            const insertPosition: Position = this._vsCodeApi.GetPosition(position.line + 1, indentLen);
            this._vsCodeApi.InsertText(insertPosition, docommnet);
        } else {
            const insertPosition: Position = this._vsCodeApi.ShiftPositionChar(position, 1);
            this._vsCodeApi.InsertText(insertPosition, docommnet);
        }
    }

    /* @implements */
    public MoveCursorTo(code: string, codeType: CodeType, docomment: string): void {
        const curPosition = this._vsCodeApi.GetActivePosition();
        
        if (codeType === CodeType.Comment) {
            const indentLen: number = StringUtil.GetIndent(code).length;
            this._vsCodeApi.MoveSelection(curPosition.line + 1, indentLen + docomment.length); 
        } else {
            this._vsCodeApi.MoveSelection(curPosition.line + 1, curPosition.character + 2);
        }
    }


    /*-------------------------------------------------------------------------
     * Private Method
     *-----------------------------------------------------------------------*/

    private GeneSummary(code: string, paramNameList: Array<string>, hasReturn: boolean): string {

        let docommentList: Array<string> = new Array<string>();

        /* <summary> */
        docommentList.push('<summary>');
        docommentList.push('');
        docommentList.push('</summary>');

        /* <param> */
        if (paramNameList !== null) {
            paramNameList.forEach(name => {
                docommentList.push('<param name="' + name + '"></param>');
            });
        }

        /* <returns> */
        if (hasReturn) {
            docommentList.push('<returns></returns>');
        }

        // Format
        const indent: string = StringUtil.GetIndent(code);
        let docomment = ' ' + docommentList[0] + '\n';
        for (let i = 1; i < docommentList.length; i++) {
            docomment += indent + '/// ' + docommentList[i];
            if (i !== docommentList.length - 1) {
                docomment += '\n';
            }
        }

        return docomment;
    }

}
