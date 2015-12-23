import {window, workspace, Disposable, TextEditor} from 'vscode';
import {DocomentCSharpDomain} from '../Domain/DocomentCSharpDomain';

export class DocomentCSharpController {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    private _xmlAutoCommenting: DocomentCSharpDomain;
    private _disposable: Disposable;


    /*-------------------------------------------------------------------------
     * Public Method
     *-----------------------------------------------------------------------*/
    constructor(XmlAutoCommenting: DocomentCSharpDomain) {
        this._xmlAutoCommenting = XmlAutoCommenting;
        
        const subscriptions: Disposable[] = [];
        const activeEditor: TextEditor = window.activeTextEditor;
       
        /* Add Text Change Event */
        workspace.onDidChangeTextDocument(event => {
            if (activeEditor && event.document === activeEditor.document) {
                this._onEvent(activeEditor);
            }
        }, this, subscriptions);

        this._disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }

    /*-------------------------------------------------------------------------
     * Event
     *-----------------------------------------------------------------------*/
    private _onEvent(activeEditor: TextEditor) {
        this._xmlAutoCommenting.Insert(activeEditor);
    }

}

