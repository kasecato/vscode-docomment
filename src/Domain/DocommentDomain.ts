import {TextEditor, TextDocumentContentChangeEvent} from 'vscode';
import {VSCodeApi} from '../Api/VSCodeApi';
import {IDocommentDomain, CodeType} from './IDocommentDomain';

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


    /*-------------------------------------------------------------------------
     * Entry Method
     *-----------------------------------------------------------------------*/
     
    /* @implements */
    public Execute(activeEditor: TextEditor, event: TextDocumentContentChangeEvent, languageId: string) {

        this._event = event;
        this._activeEditor = activeEditor;
        this._vsCodeApi = new VSCodeApi(activeEditor);

        // Detect Language
        if (!this._vsCodeApi.IsLanguage(languageId)) return;

        // Fire Document Comment
        if (!this.IsTriggerDocomment()) return;

        // Get Code
        const code: string = this._vsCodeApi.ReadNextCodeFromCurrent();

        // Detect Code Type
        const codeType: CodeType = this.GetCodeType(code);
        console.log(codeType);
        if (codeType === null) return;

        // Gene Comment
        const docomment = this.GeneDocomment(codeType, code);
        console.log(docomment);
        if (docomment === null) return;

        // Write Comment
        this.WriteDocomment(docomment);
    }


    /*-------------------------------------------------------------------------
     * Domain Method
     *-----------------------------------------------------------------------*/

    /* @implements */
    IsTriggerDocomment(): boolean {
        return false;
    }

    /* @implements */
    GetCodeType(code: string): CodeType {
        return CodeType.None;
    }

    /* @implements */
    GeneDocomment(codeType: CodeType, code: string): string {
        return null;
    }

    /* @implements */
    public WriteDocomment(text: string): void {
        const position = this._vsCodeApi.GetActivePosition();
        const positionShift = this._vsCodeApi.ChangeVSCodePosition(position, 1);
        this._vsCodeApi.InsertText(positionShift, text);
    }

    /* @implements */
    public dispose() {
    }


}
