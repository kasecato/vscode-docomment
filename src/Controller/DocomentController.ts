import {window, workspace, Disposable, TextEditor} from 'vscode';
import {IDocommentDomain} from '../Domain/IDocommentDomain';
import {IDocommentController} from './IDocommentController';

export class DocomentController implements IDocommentController {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/

    /* @implements */
    _disposable: Disposable;

    /* @implements */
    _docommentDomain: IDocommentDomain;


    /*-------------------------------------------------------------------------
     * Entry Constructor
     *-----------------------------------------------------------------------*/
    constructor(docommentDomain: IDocommentDomain) {
        this._docommentDomain = docommentDomain;

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


    /*-------------------------------------------------------------------------
     * Public Method
     *-----------------------------------------------------------------------*/

    /* @implements */
    dispose() {
        this._disposable.dispose();
    }


    /*-------------------------------------------------------------------------
     * Event
     *-----------------------------------------------------------------------*/
    private _onEvent(activeEditor: TextEditor) {
        // Insert XML document comment
        this._docommentDomain.Execute(activeEditor);
    }

}
