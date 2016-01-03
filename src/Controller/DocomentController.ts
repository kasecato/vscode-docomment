import {window, workspace, Disposable, TextEditor, TextDocumentContentChangeEvent} from 'vscode';
import {IDocommentDomain} from '../Domain/IDocommentDomain';
import {IDocommentController} from './IDocommentController';

export class DocomentController implements IDocommentController {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/

    /* @implements */
    public _languageId: string;

    /* @implements */
    public _disposable: Disposable;

    /* @implements */
    public _docommentDomain: IDocommentDomain;


    /*-------------------------------------------------------------------------
     * Entry Constructor
     *-----------------------------------------------------------------------*/
    public constructor(docommentDomain: IDocommentDomain) {
        this._docommentDomain = docommentDomain;

        const subscriptions: Disposable[] = [];

        /* Add Text Change Event */
        workspace.onDidChangeTextDocument(event => {
            const activeEditor: TextEditor = window.activeTextEditor;
            if (activeEditor && event.document === activeEditor.document) {
                this._onEvent(activeEditor, event.contentChanges[0]);
            }
        }, this, subscriptions);

        this._disposable = Disposable.from(...subscriptions);
    }


    /*-------------------------------------------------------------------------
     * Public Method
     *-----------------------------------------------------------------------*/

    /* @implements */
    public dispose() {
        this._disposable.dispose();
    }


    /*-------------------------------------------------------------------------
     * Event
     *-----------------------------------------------------------------------*/
    private _onEvent(activeEditor: TextEditor, event: TextDocumentContentChangeEvent) {
        // Insert XML document comment
        this._docommentDomain.Execute(activeEditor, event, this._languageId);
    }

}
