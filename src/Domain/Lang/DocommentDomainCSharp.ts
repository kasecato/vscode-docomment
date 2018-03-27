import {SyntacticAnalysisCSharp} from '../../SyntacticAnalysis/SyntacticAnalysisCSharp';
import {StringUtil} from '../../Utility/StringUtil';
import {DocommentDomain} from '../DocommentDomain';
import {CodeType} from '../IDocommentDomain';
import {Position} from 'vscode';

export class DocommentDomainCSharp extends DocommentDomain {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    private _isEnterKey: boolean = false;


    /*-------------------------------------------------------------------------
     * Domain Method
     *-----------------------------------------------------------------------*/

    /* @override */
    public IsTriggerDocomment(): boolean {
        // NG: Document is closed
        if (isNullOrUndefined(this._event)) {
            return false;
        }

        // NG: KeyCode is EMPTY
        const eventText: string = this._event.text;
        if (eventText == null || eventText.trim() === '') {
            return false;
        }

        // NG: ActiveChar is NULL
        const activeChar: string = this._vsCodeApi.ReadCharAtCurrent();
        if (activeChar == null) {
            return false;
        }

        // NG: KeyCode is NOT '/' or Enter
        const isSlashKey: boolean = SyntacticAnalysisCSharp.IsSlashKey(activeChar);
        const isEnterKey: boolean = SyntacticAnalysisCSharp.IsEnterKey(activeChar, eventText);
        if (!isSlashKey && !isEnterKey) {
            return false;
        }
        this._isEnterKey = isEnterKey;

        // NG: Activate on Enter NOT '/'
        if (this._config.activateOnEnter) {
            if (isSlashKey) {
                return false;
            }
        }

        // NG: '////'
        const activeLine: string = this._vsCodeApi.ReadLineAtCurrent();
        if (isSlashKey) {
            // NG: '////'
            if (!SyntacticAnalysisCSharp.IsDocCommentStrict(activeLine)) {
                return false;
            }

            // NG: '/' => Insert => Event => ' /// '
            if (SyntacticAnalysisCSharp.IsDoubleDocComment(activeLine)) {
                return false;
            }
        }
        if (isEnterKey) {
            // NG: '////'
            if (!SyntacticAnalysisCSharp.IsDocComment(activeLine)) {
                return false;
            }
        }

        // OK
        return true;
    }

    /* @override */
    public GetCode(): string {
        const code: string = this._vsCodeApi.ReadNextCodeFromCurrent(this._config.eol);
        const removedAttr: string = code.split(this._config.eol).filter(line => !SyntacticAnalysisCSharp.IsAttribute(line.trim())).join('');
        return removedAttr;
    }

    /* @override */
    public GetCodeType(code: string): CodeType {

        // If the previous line was a doc comment and we hit enter.
        // Extend the doc comment without generating anything else,
        // even if there's a method or something next line.
        if (this._isEnterKey && SyntacticAnalysisCSharp.IsDocComment(this._vsCodeApi.ReadLineAtCurrent())) {
            return CodeType.Comment;
        }

        /* method */
        if (SyntacticAnalysisCSharp.IsMethod(code)) return CodeType.Method;

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

        /* delegate */
        if (SyntacticAnalysisCSharp.IsDelegate(code)) return CodeType.Delegate;

        /* event */
        if (SyntacticAnalysisCSharp.IsEvent(code)) return CodeType.Event;

        /* property */
        if (SyntacticAnalysisCSharp.IsProperty(code)) return CodeType.Property;

        /* field */
        if (SyntacticAnalysisCSharp.IsField(code)) return CodeType.Field;

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
                return '';
            default:
                return '';
        }

        return this.GeneSummary(code, paramNameList, hasReturn);
    }

    /* @implements */
    public WriteDocomment(code: string, codeType: CodeType, docomment: string): void {
        const position: Position = this._vsCodeApi.GetActivePosition();

        if (codeType === CodeType.Comment) {
            const indentBaseLine: string = this._vsCodeApi.ReadPreviousLineFromCurrent();
            const indent: string = StringUtil.GetIndent(code, indentBaseLine, this._config.insertSpaces, this._config.detectIdentation);
            const indentLen: number = StringUtil.GetIndentLen(indent, this._config.insertSpaces, this._config.detectIdentation);
            const insertPosition: Position = this._vsCodeApi.GetPosition(position.line + 1, indentLen - 1);
            this._vsCodeApi.InsertText(insertPosition, docomment);
        } else {
            if (this._isEnterKey) {
                const active: Position = this._vsCodeApi.GetActivePosition();
                const anchor: Position = this._vsCodeApi.GetPosition(active.line + 1, active.character);
                const replaceSelection = this._vsCodeApi.GetSelectionByPosition(anchor, active);
                this._vsCodeApi.ReplaceText(replaceSelection, docomment);
            } else {
                const insertPosition: Position = this._vsCodeApi.ShiftPositionChar(position, 1);
                this._vsCodeApi.InsertText(insertPosition, docomment);
            }
        }
    }

    /* @implements */
    public MoveCursorTo(code: string, codeType: CodeType, docomment: string): void {
        const curPosition = this._vsCodeApi.GetActivePosition();
        const indentBaseLine: string = this._vsCodeApi.ReadLineAtCurrent();
        const indent: string = StringUtil.GetIndent(code, indentBaseLine, this._config.insertSpaces, this._config.detectIdentation);
        const indentLen: number = StringUtil.GetIndentLen(indent, this._config.insertSpaces, this._config.detectIdentation);
        this._vsCodeApi.MoveSelection(curPosition.line + 1, indentLen - 1 + docomment.length);
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
        const indentBaseLine: string = this._vsCodeApi.ReadLineAtCurrent();
        const indent: string = StringUtil.GetIndent(code, indentBaseLine, this._config.insertSpaces, this._config.detectIdentation);
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
