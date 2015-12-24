import {TextEditor, TextDocumentContentChangeEvent} from 'vscode';
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
    Event,
    None
}

export interface IDocommentDomain {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    _event: TextDocumentContentChangeEvent;
    _vsCodeApi: VSCodeApi;
    _activeEditor: TextEditor;


    /*-------------------------------------------------------------------------
     * Entry Method
     *-----------------------------------------------------------------------*/
    Execute(activeEditor: TextEditor, event: TextDocumentContentChangeEvent, languageId: string);


    /*-------------------------------------------------------------------------
     * Domain Method
     *-----------------------------------------------------------------------*/
    IsTriggerDocomment(): boolean;
    GetCodeType(code: string): CodeType;
    GeneDocomment(codeType: CodeType, code: string): string;
    WriteDocomment(text: string): void;
    dispose(): void;

}
