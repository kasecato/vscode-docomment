import { CommentSyntax } from "../Entity/Config/Contributes/Configuration";

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

        const isInterface: boolean = (line.indexOf(';') !== -1);
        if (isInterface) return true;

        const isEndMethod: boolean = (line.trim().endsWith(')'));
        if (isEndMethod) return true;

        const isXml: boolean = (line.indexOf('</') !== -1);
        if (isXml) return true;

        return isCodeBlockStart;
    }

    public static RemoveComment(line: string): string {
        if (line === null) return null;
        return line.replace(/\/\/.*/, '').replace(/\/\*.*\*\//, '');
    }

    public static GetIndent(line: string, indentBaseLine: string, insertSpaces: boolean, detectIdentation: boolean): string {
        if (line === null) return null;
        const indent: string = indentBaseLine.match(/([ \t]*)?/)[0];
        const spaces: string = ' '.repeat(indent.length);

        if (detectIdentation) {
            const isSpaceIdentation: boolean = (indent.match(/([ ]+)/) !== null);
            insertSpaces = isSpaceIdentation;
        }

        if (insertSpaces) {
            return indent.split('\t').join(spaces);
        } else {
            return indent.split(spaces).join('\t');
        }
    }

    public static GetIndentLen(indent: string, commentSyntax: CommentSyntax, insertSpaces: boolean, detectIdentation: boolean): number {
        if (indent === null) return 0;

        if (detectIdentation) {
            const isSpaceIdentation: boolean = (indent.match(/([ ]+)/) !== null);
            insertSpaces = isSpaceIdentation;
        }

        if (insertSpaces) {
            return indent.split(' ').length;
        } else {
            const offset = commentSyntax == CommentSyntax.delimited ? 1 : 0;
            return indent.split('\t').length + offset;
        }
    }

}
