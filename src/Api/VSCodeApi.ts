import {TextEditor, Position, Selection} from 'vscode';
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


    /*-------------------------------------------------------------------------
     * VS Code API
     *-----------------------------------------------------------------------*/
    public IsLanguage(languageId: string): boolean {
        return (this._activeEditor.document.languageId === languageId);
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

    public GetPosition(line: number, charcter: number): Position {
        return new Position(line, charcter);
    }

    public ShiftPositionLine(position: Position, offset: number): Position {
        return this.GetPosition(position.line + offset, position.character);
    }

    public ShiftPositionChar(position: Position, offset: number): Position {
        return this.GetPosition(position.line, position.character + offset);
    }

    public GetSelection(line: number, charcter: number): Selection {
        return new Selection(line, charcter, line, charcter);
    }

    public GetSelectionByPosition(anchor: Position, active: Position): Selection {
        return new Selection(anchor, active);
    }

    public MoveSelection(line: number, charcter: number): void {
        const move: Selection = this.GetSelection(line, charcter);
        this._activeEditor.selection = move;
    }

    public InsertText(position: Position, text: string) {
        this._activeEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
    }

    public ReplaceText(selection: Selection, text: string) {
        this._activeEditor.edit((editBuilder) => {
            editBuilder.replace(selection, text);
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

        let code = '';
        for (let i: number = curLine; i < lineCount - 1; i++) {

            const line: string = this.ReadLine(i + 1);

            // Skip empty line
            if (StringUtil.IsNullOrWhiteSpace(line)) continue;

            code += line;

            // Detect start of code
            if (!StringUtil.IsCodeBlockStart(line)) {
                continue;
            }

            return StringUtil.RemoveComment(code);
        }

        return null;
    }

    public ReadPreviousCodeFromCurrent(): string {
        const curLine: number = this.GetActiveLine();

        let code = '';
        for (let i: number = curLine; 0 < i; i--) {

            const line: string = this.ReadLine(i - 1);

            // Skip empty line
            if (StringUtil.IsNullOrWhiteSpace(line)) continue;

            code += line;

            // Detect start of code
            if (!StringUtil.IsCodeBlockStart(line)) {
                continue;
            }

            return code;
        }

        return null;
    }

    public ReadPreviousLineFromCurrent(): string {
        const curLine: number = this.GetActiveLine();

        for (let i: number = curLine; 0 < i; i--) {

            // Skip empty line
            const line: string = this.ReadLine(i - 1);
            if (StringUtil.IsNullOrWhiteSpace(line)) continue;

            return line;
        }

        return null;
    }

    public ReadNextLineFromCurrent(): string {
        const lineCount: number = this.GetLineCount();
        const curLine: number = this.GetActiveLine();

        for (let i: number = curLine; i < lineCount - 1; i++) {

            // Skip empty line
            const line: string = this.ReadLine(i + 1);
            if (StringUtil.IsNullOrWhiteSpace(line)) continue;

            return line;
        }

        return null;
    }

}
