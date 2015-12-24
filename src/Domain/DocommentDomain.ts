import {TextEditor} from 'vscode';
import {VSCodeApi} from '../Api/VSCodeApi';
import {IDocommentDomain, CodeType} from './IDocommentDomain';

export class DocommentDomain implements IDocommentDomain {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/

    /* @implements */
    _vsCodeApi: VSCodeApi;

    /* @implements */
    _activeEditor: TextEditor;


    /*-------------------------------------------------------------------------
     * Entry Method
     *-----------------------------------------------------------------------*/
     
    /* @implements */
    public Execute(activeEditor: TextEditor) {

        this._activeEditor = activeEditor;
        this._vsCodeApi = new VSCodeApi(activeEditor);

        // Detect CSharp
        if (!this._vsCodeApi.IsCSharp()) return;
        
        // Fire Document Comment
        if (!this.IsTriggerDocComment()) return;

        // Get Code
        const code: string = this._vsCodeApi.ReadNextCodeFromCurrent();

        // Detect Code Type
        const codeType: CodeType = this.GetCodeType(code);
        console.log(codeType);
        if (codeType === null) return;
        
        // Gene Comment
        const docComment = this.GeneDocComment(codeType, code);
        console.log(docComment);
        if (docComment === null) return;
        
        // Write Comment
        this.WriteComment(docComment);
    }


    /*-------------------------------------------------------------------------
     * Domain Method
     *-----------------------------------------------------------------------*/

    /* @implements */
    IsTriggerDocComment(): Boolean {
        return false;
    }

    /* @implements */
    GetCodeType(code: string): CodeType {
        return null;
    }

    /* @implements */
    GeneDocComment(codeType: CodeType, code: string): string {
        return null;
    }

    /* @implements */
    WriteComment(text: string): void {
        const position = this._vsCodeApi.GetActivePosition();
        const positionShift = this._vsCodeApi.ChangeVSCodePosition(position, 1);
        this._vsCodeApi.InsertText(positionShift, text);
    }

    /* @implements */
    dispose() {
    }


}
