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

    public static GetIndent(line: string): string {
        if (line === null) return null;
        return line.match(/([ \t]*)?/)[0];
    }

}
