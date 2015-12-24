import {TextEditor} from 'vscode';
import {VSCodeApi} from '../Api/VSCodeApi';

/*-------------------------------------------------------------------------
 * Enum
 *-----------------------------------------------------------------------*/
export enum CodeType {
    Namespace,
    Class,
    Interface,
    Struct,
    Enum,
    Delegate,
    Field,
    Property,
    Method,
    Event
}

export interface IDocommentDomain {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    _vsCodeApi: VSCodeApi;
    _activeEditor: TextEditor;


    /*-------------------------------------------------------------------------
     * Entry Method
     *-----------------------------------------------------------------------*/
    Execute(activeEditor: TextEditor);


    /*-------------------------------------------------------------------------
     * Domain Method
     *-----------------------------------------------------------------------*/
    IsTriggerDocComment(): Boolean;
    GetCodeType(code: string): CodeType;
    GeneDocComment(codeType: CodeType, code: string): string;
    WriteComment(text: string): void;
    dispose(): void;

}
