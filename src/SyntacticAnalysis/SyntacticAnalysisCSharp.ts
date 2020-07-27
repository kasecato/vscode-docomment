import { CodeType } from "../Domain/IDocommentDomain";
import { CommentSyntax } from "../Entity/Config/Contributes/Configuration";

export class SyntacticAnalysisCSharp {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    private static RESERVED_WORDS: RegExp =
        /(void|event|delegate|internal|public|protected|private|static|const|new|sealed|abstract|virtual|override|extern|unsafe|readonly|volatile|implicit|explicit|operator)/;

    /*-------------------------------------------------------------------------
     * Public Method: Comment Type
     *-----------------------------------------------------------------------*/
    public static IsEnterKey(text: string): boolean {
        return (text.startsWith('\n') || text.startsWith("\r\n"));
    }

    public static IsInsertLineAbove(activeLine: string): boolean {
        return activeLine !== null && activeLine.trim().length === 0 ;
    }

    public static IsActivationKey(activeChar: string, syntax: CommentSyntax): boolean {
        switch (syntax) {
            case CommentSyntax.single:
                return activeChar === '/';
            case CommentSyntax.delimited:
                return activeChar === '*';
        }
    }

    /**
     * Tests whether a line contains ONLY a doc comment and nothing else except whitespace.
     * @param activeLine The line to test.
     */
    public static IsDocCommentStrict(activeLine: string, syntax: CommentSyntax): boolean {
        switch (syntax) {
            case CommentSyntax.single:
                return activeLine.match(/^[ \t]*\/{3}[ \t]*$/) !== null; // FIXME:
            case CommentSyntax.delimited:
                return activeLine.match(/^[ \t]*\/\*{2}[ \t]*$/) !== null; // FIXME:
        }
    }

    public static IsDocComment(activeLine: string, syntax: CommentSyntax): boolean {
        switch (syntax) {
            case CommentSyntax.single:
                return activeLine.match(/\/{3}/) !== null;
            case CommentSyntax.delimited:
                return activeLine.match(/^[ \t]*\*{1}[^\/]/) !== null;
        }
    }

    public static IsDocCommentOnActivationEnter(activeLine: string, syntax: CommentSyntax): boolean {
        switch (syntax) {
            case CommentSyntax.single:
                return activeLine.match(/^[ \t]*\/{3} $/) !== null;
            case CommentSyntax.delimited:
                return activeLine.match(/^[ \t]*\/\*{2}[ \t]*$/) !== null
                    || SyntacticAnalysisCSharp.IsDocComment(activeLine, syntax);
        }
    }

    public static IsDoubleDocComment(activeLine: string, syntax: CommentSyntax): boolean {
        switch (syntax) {
            case CommentSyntax.single:
                return activeLine.match(/^[ \t]*\/{3} $/) !== null;
            case CommentSyntax.delimited:
                return activeLine.match(/^[ \t]*\*{1} $/) !== null;
        }
    }


    /*-------------------------------------------------------------------------
     * Public Method: Code
     *-----------------------------------------------------------------------*/
    public static IsAttribute(code: string): boolean {
        if (code === null) return false;
        return code.match(/^\[.+\]$/) !== null;
    }

    /*-------------------------------------------------------------------------
     * Public Method: Code Type
     *-----------------------------------------------------------------------*/
    public static IsNamespace(code: string): boolean {
        if (code === null) return false;
        return code.match(/\bnamespace\b/) !== null;
    }

    public static IsClass(code: string): boolean {
        if (code === null) return false;
        return code.match(/\bclass\b/) !== null;
    }

    public static IsInterface(code: string): boolean {
        if (code === null) return false;
        return code.match(/\binterface\b/) !== null;
    }

    public static IsStruct(code: string): boolean {
        if (code === null) return false;
        return code.match(/\bstruct\b/) !== null;
    }

    public static IsEnum(code: string): boolean {
        if (code === null) return false;
        return code.match(/\benum\b/) !== null;
    }

    public static IsDelegate(code: string): boolean {
        if (code === null) return false;
        return code.match(/\bdelegate\b/) !== null;
    }

    public static IsEvent(code: string): boolean {
        if (code === null) return false;
        return code.match(/\bevent\b/) !== null;
    }

    public static IsProperty(code: string): boolean {
        if (code === null) return false;
        return code.match(/[\w\S]+[^)]?(\b)?\s*{/) !== null;
    }

    public static IsField(code: string): boolean {
        if (code === null) return false;
        return code.match(/[^()]+;[ \t]*$/) !== null;
    }

    public static IsMethod(code: string): boolean {
        if (code === null) return false;
        return code.match(/[\w\S]\s+[\w\S]+\s*\(.*\)/) !== null;
    }

    public static IsComment(code: string): boolean {
        if (code === null) return false;
        if (code === '') return true;
        return code.match(/[ \t]+/) !== null;
    }

    public static GetCommentSyntax(syntax: CommentSyntax): string {
        switch (syntax) {
            case CommentSyntax.single:
                return '///';
            case CommentSyntax.delimited:
                return '*';
        }
    }

    public static GetGenericList(code: string): Array<string> {
        if (code === null) return null;

        const isAfterExtends: boolean = code.match(/:.+<([^<>]*)>/) !== null;
        if (isAfterExtends) {
            const isBeforeExtends: boolean = code.match(/<([^<>]*)>.+:/) !== null;
            if (!isBeforeExtends) return null;
        }

        const generics: RegExpMatchArray = code.match(/<([^<>]*)>/);

        const isUnMatched = (generics === null || generics.length !== 2);
        if (isUnMatched) return null;

        let genericNames: Array<string> = new Array<string>();
        generics[1].split(',').forEach(param => {
            const name: RegExpMatchArray = param.match(/(\S+)\s*$/);
            if (name !== null && name.length === 2) {
                genericNames.push(name[1]);
            }
        });

        return genericNames;
    }

    public static GetGenericMethodsList(code: string): Array<string> {
        if (code === null) return null;
        const generics: RegExpMatchArray = code.match(/<([^<>]*)>\s*\(/);

        const isUnMatched = (generics === null || generics.length !== 2);
        if (isUnMatched) return null;

        let genericNames: Array<string> = new Array<string>();
        generics[1].split(',').forEach(param => {
            const name: RegExpMatchArray = param.match(/(\S+)\s*$/);
            if (name !== null && name.length === 2) {
                genericNames.push(name[1]);
            }
        });

        return genericNames;
    }

    public static GetMethodParamNameList(code: string): Array<string> {
        if (code === null) return null;
        const removedAttrCode: string = code.replace(/^\s*\[.+?\]/, '');       // FIXME:
        const removedExtendsCode: string = removedAttrCode.replace(/:.+/, ''); // FIXME:
        const removedLamdaCode: string = removedExtendsCode.replace(/=>.*/, ''); // FIXME:
        const params: RegExpMatchArray = removedLamdaCode.match(/.+\(([^)]*)\)/);

        const isMatched = (params === null || params.length !== 2);
        if (isMatched) return null;

        let paramNames: Array<string> = new Array<string>();
        params[1].split(',').forEach(param => {
            const hasOpen: boolean = param.match(/</) !== null;
            const hasClose: boolean = param.match(/>/) !== null;
            const isHighOrderParam = hasOpen && !hasClose;
            if (isHighOrderParam) {
                return;
            }

            const hasOptionalParam: boolean = param.match(/\S+\s+\S+\s*=/) !== null;
            const hasTypeInfo: boolean = param.match(/[\w\W]+\s+[\w\W]+/) !== null;
            let name: RegExpMatchArray = null;
            if (hasOptionalParam) {
                name = param.match(/\S+\s+(\S+)\s*=.*/);
            } else if (!hasTypeInfo) {
                name = null; // SKIP
            } else {
                name = param.match(/(\S+)\s*$/);
            }
            if (name !== null && name.length === 2) {
                const hasIdentifer = name[1].startsWith('@');
                const paramName = (hasIdentifer)
                    ? name[1].replace('@', '')
                    : name[1];
                paramNames.push(paramName);
            }
        });

        return paramNames;
    }

    public static HasMethodReturn(code: string): boolean {
        if (code === null) {
            return false;
        }

        {
            const returns: RegExpMatchArray = code.match(/([\w\S]+)\s+[\w\S]+\s*\(.*\)/);
            const isMatched = (returns !== null && returns.length === 2);
            if (isMatched) {
                const isReserved = (returns[1].match(this.RESERVED_WORDS) !== null);
                if (!isReserved) {
                    return true;
                }
            }
        }
        {
            const returns: RegExpMatchArray = code.match(/([\w\S]+)\s+[\w\S]+\s+[\w\S]+\s*\(.*\)/);
            const isMatched = (returns !== null && returns.length === 2);
            if (isMatched) {
                const isReserved = (returns[1].match(this.RESERVED_WORDS) !== null);
                if (!isReserved) {
                    return true;
                }
            }
        }

        return false;
    }

    public static HasPropertyReturn(code: string): boolean {
        if (code === null) return false;
        const returns: RegExpMatchArray = code.match(/([\w\S]+)\s+[\w\S]+\s*\{/);

        const isMatched = (returns === null || returns.length !== 2);
        if (isMatched) return false;

        return (returns[1].match(this.RESERVED_WORDS) === null) ? true : false;
    }

    /*-------------------------------------------------------------------------
     * Public Method: Cursor
     *-----------------------------------------------------------------------*/
    public static GetLineOffset(syntax: CommentSyntax, codeType: CodeType) {
        switch (syntax) {
            case CommentSyntax.single:
                return 1;
            case CommentSyntax.delimited:
                switch (codeType) {
                    case CodeType.Comment:
                        return 1;
                    default:
                        return 2;
                }
        }
    }

}
