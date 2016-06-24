export class StringUtil {

    /*-------------------------------------------------------------------------
     * Public Method
     *-----------------------------------------------------------------------*/
    public static IsNullOrWhiteSpace(line: string): boolean {
        return (line === null || line.trim() === '');
    }

    public static IsCodeBlockStart(line: string): boolean {
        if (line === null) return false;
        return (line.indexOf('{') !== -1) || (line.indexOf(';') !== -1);
    }

    public static RemoveComment(line: string): string {
        if (line === null) return null;
        return line.replace(/\/\/.*/, '').replace(/\/\*.*\*\//, '');
    }

    public static GetIndent(line: string, insertSpaces: boolean, tabSize: number): string {
        if (line === null) return null;
        const indent: string = line.match(/([ \t]*)?/)[0];
        const spaces: string = ' '.repeat(tabSize);
        if (insertSpaces) {
            return indent.split('\t').join(spaces);
        } else {
            return indent.split(spaces).join('\t');
        }
    }

    public static GetIndentLen(indent: string, insertSpaces: boolean, tabSize: number): number {
        if (indent === null) return 0;
        if (insertSpaces) {
            return indent.split(' ').length;
        } else {
            return indent.split('\t').length * tabSize;
        }
    }

}
