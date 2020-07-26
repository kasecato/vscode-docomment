import {TextEditor, TextDocumentContentChangeEvent} from 'vscode';
import {VSCodeApi} from '../Api/VSCodeApi';
import {IDocommentDomain, CodeType} from './IDocommentDomain';
import {StringUtil} from '../Utility/StringUtil';
import {Configuration} from '../Entity/Config/Contributes/Configuration';

export class DocommentDomain implements IDocommentDomain {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/

    /* @implements */
    public _event: TextDocumentContentChangeEvent;

    /* @implements */
    public _vsCodeApi: VSCodeApi;

    /* @implements */
    public _activeEditor: TextEditor;

    /* @implements */
    public _config: Configuration;

    /*-------------------------------------------------------------------------
     * Entry Method
     *-----------------------------------------------------------------------*/

    /* @implements */
    public Execute(activeEditor: TextEditor
    , event: TextDocumentContentChangeEvent
    , languageId: string
    , config: Configuration) {

        this._event = event;
        this._activeEditor = activeEditor;
        this._vsCodeApi = new VSCodeApi(activeEditor);
        this._config = config;

        // Detect Language
        if (!this._vsCodeApi.IsLanguage(languageId)) return;

        // Initalize
        this.Init();

        // Can Fire Document Comment
        if (!this.IsTriggerDocomment()) return;

        // Get Code
        const code: string = this.GetCode();

        // Detect Code Type
        const codeType: CodeType = this.GetCodeType(code);
        console.debug(codeType);
        if (codeType === null) return;

        // Gene Comment
        const docomment = this.GeneDocomment(code, codeType);
        console.debug(docomment);
        if (StringUtil.IsNullOrWhiteSpace(docomment)) return;

        // Write Comment
        this.WriteDocomment(code, codeType, docomment);

        // Move Cursor to <Summary>
        this.MoveCursorTo(code, codeType, docomment);

    }


    /*-------------------------------------------------------------------------
     * Domain Method
     *-----------------------------------------------------------------------*/

    /* @implements */
    public Init() {
        // NOP
    }

    /* @implements */
    public IsTriggerDocomment(): boolean {
        return false;
    }

    /* @implements */
    public GetCode(): string {
        return null;
    }

    /* @implements */
    public GetCodeType(code: string): CodeType {
        return CodeType.None;
    }

    /* @implements */
    public GeneDocomment(code: string, codeType: CodeType): string {
        return null;
    }

    /* @implements */
    public WriteDocomment(code: string, codeType: CodeType, docommnet: string): void {
        // NOP
    }

    /* @implements */
    public MoveCursorTo(code: string, codeType: CodeType, docomment: string): void {
        // NOP
    }

    /* @implements */
    public dispose() {
        // NOP
    }

}
