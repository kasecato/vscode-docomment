export class StringUtil {

    /*-------------------------------------------------------------------------
     * Public Method
     *-----------------------------------------------------------------------*/
    public static IsNullOrWhiteSpace(line: string): boolean {
        return (line === null || line.trim() === '');
    }

    public static IsCodeBlockStart(line: string): boolean {
        if (line === null) return false;
        
        const isAttribute: boolean = line.trim().startsWith('['); // SKIP Attribute: [foo="bar"]
        if (isAttribute) return false;

        const isCodeBlockStart: boolean = (line.indexOf('{') !== -1);
        if (isCodeBlockStart) return true;

        const isInterface: boolean = (line.indexOf(';') !== -1)
        if (isInterface) return true;

        const isEndMethod: boolean = (line.trim().endsWith(')'))
        if (isEndMethod) return true;

        const isXml: boolean = (line.indexOf('</') !== -1);
        if (isXml) return true;

        return isCodeBlockStart;
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
            return indent.split('\t').length;
        }
    }

}
