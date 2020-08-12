import { Disposable, TextDocumentContentChangeEvent, TextEditor, window, workspace, WorkspaceConfiguration } from 'vscode';
import { IDocommentDomain } from '../Domain/IDocommentDomain';
import { CommentSyntax, Configuration } from '../Entity/Config/Contributes/Configuration';
import { IDocommentController } from './IDocommentController';

export class DocommentController implements IDocommentController {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/

    /* @implements */
    public _languageId: string;

    /* @implements */
    public _disposable: Disposable;

    /*-------------------------------------------------------------------------
     * Entry Constructor
     *-----------------------------------------------------------------------*/
    public constructor(docommentDomain: IDocommentDomain) {

        /* Load Configuration File (.vscode/settings.json) */
        const config = this.loadConfig();

        const subscriptions: Disposable[] = [];

        /* Add Text Change Event */
        workspace.onDidChangeTextDocument(event => {
            const activeEditor: TextEditor = window.activeTextEditor;
            if (activeEditor && event.document === activeEditor.document) {
                this._onEvent(activeEditor, event.contentChanges[0], config, docommentDomain);
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
    private loadConfig(): Configuration {
        const confDocomment: WorkspaceConfiguration = workspace.getConfiguration(Configuration.KEY_DOCOMMENT);
        const confFiles: WorkspaceConfiguration = workspace.getConfiguration(Configuration.KEY_FILES);
        const confEditor: WorkspaceConfiguration = workspace.getConfiguration(Configuration.KEY_EDITOR);

        const config = new Configuration();
        config.syntax = CommentSyntax[confDocomment.get<string>(Configuration.SYNTAX, CommentSyntax.single)];
        config.activateOnEnter = confDocomment.get<boolean>(Configuration.ACTIVATE_ON_ENTER, false);
        config.advanced = confDocomment.get<Object>(Configuration.ADVANCED);
        config.eol = confFiles.get<string>(Configuration.EOL, '\n');
        config.insertSpaces = confEditor.get<boolean>(Configuration.INSERT_SPACES, false);
        config.detectIdentation = confEditor.get<boolean>(Configuration.DETECT_IDENTATION, true);

        return config;
    }

    /*-------------------------------------------------------------------------
     * Event
     *-----------------------------------------------------------------------*/
    private _onEvent(
        activeEditor: TextEditor, 
        event: TextDocumentContentChangeEvent, 
        config: Configuration,
        domain: IDocommentDomain) {
        // Insert XML document comment
        domain.Execute(activeEditor, event, this._languageId, config);
    }

}
