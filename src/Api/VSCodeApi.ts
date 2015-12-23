import {TextEditor, Position} from 'vscode';
import {StringUtil} from '../Utility/StringUtil';

export class VSCodeApi {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    private _activeEditor: TextEditor;


    /*-------------------------------------------------------------------------
     * Public Method
     *-----------------------------------------------------------------------*/
    constructor(activeEditor: TextEditor) {
        this._activeEditor = activeEditor;
    }

    dispose() {
    }


    /*-------------------------------------------------------------------------
     * VS Code API
     *-----------------------------------------------------------------------*/
    public IsCSharp(): boolean {
        return (this._activeEditor.document.languageId === "csharp");
    }

    public GetActivePosition(): Position {
        return this._activeEditor.selection.active;
    }

    public GetActiveLine(): number {
        return this.GetActivePosition().line;
    }

    public GetLineCount(): number {
        return this._activeEditor.document.lineCount;
    }

    public GetActiveCharPosition(): number {
        return this._activeEditor.selection.active.character;
    }

    public InsertText(position: Position, text: string) {
        this._activeEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
    }

    public ReadLine(line: number): string {
        return this._activeEditor.document.lineAt(line).text;
    }

    public ReadLineAtCurrent(): string {
        return this.ReadLine(this.GetActiveLine());
    }

    public ReadCharAtCurrent(): string {
        return this.ReadLineAtCurrent().charAt(this.GetActiveCharPosition());
    }

    public ReadNextCodeFromCurrent(): string {
        const lineCount: number = this.GetLineCount();
        const curLine: number = this.GetActiveLine();

        let code: string = "";
        for (let i: number = 1; i < lineCount + curLine; i++) {
            
            // Skip empty line
            const line: string = this.ReadLine(curLine + i);
            const isEmpty: boolean = StringUtil.IsWhiteSpace(line);
            if (isEmpty) continue;

            code += line;

            // Detect start of code
            const hasStartBlock: boolean = StringUtil.IsCodeBlockStart(line);
            if (!hasStartBlock) {
                continue;
            }

            return StringUtil.RemoveComment(code);
        }

        return null;
    }

    public ChangeVSCodePosition(org: Position, offset: number): Position {
        return new Position(org.line, org.character + offset);
    }


}
