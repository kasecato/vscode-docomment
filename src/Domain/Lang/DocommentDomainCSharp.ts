import {TextEditor, Position} from 'vscode';
import {VSCodeApi} from '../../Api/VSCodeApi';
import {StringUtil} from '../../Utility/StringUtil';
import {DocommentDomain} from '../DocommentDomain';
import {CodeType} from '../IDocommentDomain';

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

        // NG: Line is NOT ///
        const activeLine: string = this._vsCodeApi.ReadLineAtCurrent();
        if (activeLine == null) return false;
        const isDocComment: boolean = (activeLine.match(/([^/]\/{3}$)|(^\/{3})/).length != 0);
        if (!isDocComment) return false;

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

        /* namespace */
        const isNamespace: boolean = code.match(/.*namespace /) !== null;
        if (isNamespace) return CodeType.Namespace;

        /* class */
        const isClass: boolean = code.match(/.*class /) !== null;
        if (isClass) return CodeType.Class;

        /* interface */
        const isInterface: boolean = code.match(/.*interface /) !== null;
        if (isInterface) return CodeType.Interface;

        /* struct */
        const isStruct: boolean = code.match(/.*struct /) !== null;
        if (isStruct) return CodeType.Struct;

        /* enum */
        const isEnum: boolean = code.match(/.*enum /) !== null;
        if (isEnum) return CodeType.Enum;

        /* delegate */
        const isDelegate: boolean = code.match(/.*delegate /) !== null;
        if (isDelegate) return CodeType.Delegate;

        /* event */
        const isEvent: boolean = code.match(/.*event /) !== null;
        if (isEvent) return CodeType.Event;

        /* method */
        const isMethod: boolean = false; // TODO:
        if (isMethod) return CodeType.Method;

        /* field */
        const isField: boolean = false; // TODO:
        if (isField) return CodeType.Field;

        /* Property */
        const isProperty: boolean = false; // TODO:
        if (isProperty) return CodeType.Property;

        return CodeType.None;
    }

    /* @override */
    public GeneDocomment(codeType: CodeType, code: string): string {

        const indent: string = StringUtil.GetIndent(code);

        // TODO:
        let comment: string = "";
        switch (codeType) {
            case CodeType.Namespace:
                break;
            case CodeType.Class:
                comment = ` <summary>\n`
                    + indent + `/// \n`
                    + indent + `/// </summary>`;
                break;
            case CodeType.Interface:
                break;
            case CodeType.Struct:
                break;
            case CodeType.Enum:
                break;
            case CodeType.Delegate:
                break;
            case CodeType.Event:
                break;
            case CodeType.Method:
                break;
            case CodeType.Field:
                break;
            case CodeType.Property:
                break;
            default:
                break;
        }

        return comment;
    }

}
