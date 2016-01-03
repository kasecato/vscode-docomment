import {TextEditor, TextDocumentContentChangeEvent, Position} from 'vscode';
import {VSCodeApi} from '../Api/VSCodeApi';
import {IDocommentDomain, CodeType} from './IDocommentDomain';
import {StringUtil} from '../Utility/StringUtil';

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

        // Can Fire Document Comment
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
        if (StringUtil.IsNullOrWhiteSpace(docomment)) return;

        // Write Comment
        this.WriteDocomment(docomment);

        // Move Cursor to <Summary>
        this.MoveCursorTo(docomment);

    }


    /*-------------------------------------------------------------------------
     * Domain Method
     *-----------------------------------------------------------------------*/

    /* @implements */
    public IsTriggerDocomment(): boolean {
        return false;
    }

    /* @implements */
    public GetCodeType(code: string): CodeType {
        return CodeType.None;
    }

    /* @implements */
    public GeneDocomment(codeType: CodeType, code: string): string {
        return null;
    }

    /* @implements */
    public WriteDocomment(docommnet: string): void {
        const position: Position = this._vsCodeApi.GetActivePosition();
        const shiftChar = this._vsCodeApi.ShiftPositionChar(position, 1);
        this._vsCodeApi.InsertText(shiftChar, docommnet);
    }

    /* @implements */
    public MoveCursorTo(docomment: string): void {
        // NOP
    }

    /* @implements */
    public dispose() {
        // NOP
    }


}
