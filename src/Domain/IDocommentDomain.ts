import {TextEditor, TextDocumentContentChangeEvent} from 'vscode';
import {VSCodeApi} from '../Api/VSCodeApi';
import {Configuration} from '../Entity/Config/Contributes/Configuration';

/*-------------------------------------------------------------------------
 * Enum
 *-----------------------------------------------------------------------*/
export enum CodeType {
    None = 'none',
    Comment = 'comment',
    Namespace = 'namespace',
    Class = 'class',
    Interface = 'interface',
    Struct = 'struct',
    Enum = 'enum',
    Delegate = 'delegate',
    Field = 'field',
    Property = 'property',
    Method = 'method',
    Event = 'event',
}

export interface IDocommentDomain {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    _event: TextDocumentContentChangeEvent;
    _vsCodeApi: VSCodeApi;
    _activeEditor: TextEditor;
    _config: Configuration;

    /*-------------------------------------------------------------------------
     * Entry Method
     *-----------------------------------------------------------------------*/
    Execute(activeEditor: TextEditor
    , event: TextDocumentContentChangeEvent
    , languageId: string
    , config: Configuration);


    /*-------------------------------------------------------------------------
     * Domain Method
     *-----------------------------------------------------------------------*/
    IsTriggerDocomment(): boolean;
    GetCode(): string;
    GetCodeType(code: string): CodeType;
    GeneDocomment(code: string, codeType: CodeType): string;
    WriteDocomment(code: string, codeType: CodeType, docommnet: string): void;
    MoveCursorTo(code: string, codeType: CodeType, docommnet: string): void;
    dispose(): void;

}
