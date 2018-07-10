import {window, workspace, Disposable, TextEditor, TextDocumentContentChangeEvent, WorkspaceConfiguration} from 'vscode';
import {IDocommentDomain} from '../Domain/IDocommentDomain';
import {IDocommentController} from './IDocommentController';
import {Configuration} from '../Entity/Config/Contributes/Configuration';

export class DocommentController implements IDocommentController {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/

    /* @implements */
    public _languageId: string;

    /* @implements */
    public _disposable: Disposable;

    /* @implements */
    public _docommentDomain: IDocommentDomain;

    /* @implements */
    public _config: Configuration;

    /*-------------------------------------------------------------------------
     * Entry Constructor
     *-----------------------------------------------------------------------*/
    public constructor(docommentDomain: IDocommentDomain) {
        this._docommentDomain = docommentDomain;

        /* Load Configuration File (.vscode/settings.json) */
        this.loadConfig();

        const subscriptions: Disposable[] = [];

        /* Add Text Change Event */
        workspace.onDidChangeTextDocument(event => {
            const activeEditor: TextEditor = window.activeTextEditor;
            if (activeEditor && event.document === activeEditor.document) {
                this._onEvent(activeEditor, event.contentChanges[0]);
            }
        }, this, subscriptions);

        /* Add Config File Change Event */
        workspace.onDidChangeConfiguration(() => {
            this.loadConfig();
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
     * Private Method
     *-----------------------------------------------------------------------*/
    private loadConfig() {
        const confDocomment: WorkspaceConfiguration = workspace.getConfiguration(Configuration.KEY_DOCOMMENT);
        const confFiles: WorkspaceConfiguration = workspace.getConfiguration(Configuration.KEY_FILES);
        const confEditor: WorkspaceConfiguration = workspace.getConfiguration(Configuration.KEY_EDITOR);

        this._config = new Configuration();
        this._config.activateOnEnter = confDocomment.get<boolean>(Configuration.ACTIVATE_ON_ENTER, false);
        this._config.advanced = confDocomment.get<Object>(Configuration.ADVANCED);
        this._config.eol = confFiles.get<string>(Configuration.EOL, '\n');
        this._config.insertSpaces = confEditor.get<boolean>(Configuration.INSERT_SPACES, false);
        this._config.detectIdentation = confEditor.get<boolean>(Configuration.DETECT_IDENTATION, true);
    }

    /*-------------------------------------------------------------------------
     * Event
     *-----------------------------------------------------------------------*/
    private _onEvent(activeEditor: TextEditor, event: TextDocumentContentChangeEvent) {
        // Insert XML document comment
        this._docommentDomain.Execute(activeEditor, event, this._languageId, this._config);
    }

}
