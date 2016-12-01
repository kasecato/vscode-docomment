export class SyntacticAnalysisCSharp {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    private static RESERVED_WORDS: RegExp =
    /(void|event|delegate|internal|public|protected|private|static|const|new|sealed|abstract|virtual|override|extern|unsafe|readonly|volatile|implicit|explicit|operator)/;

    /*-------------------------------------------------------------------------
     * Public Method: Comment Type
     *-----------------------------------------------------------------------*/
    public static IsEnterKey(activeChar: string, text: string): boolean {
        return (activeChar === '') && text.startsWith('\n');
    }

    public static IsSlashKey(activeChar: string): boolean {
        return (activeChar === '/');
    }

    public static IsDocCommentStrict(activeLine: string): boolean {
        return activeLine.match(/(?:[^/]\/{3}[ \t]*$)|(?:^\/{3}[^/])|(?:^\/{3}[ \t]*$)/) !== null; // fixme: to simple
    }

    public static IsDocComment(activeLine: string): boolean {
        return activeLine.match(/\/{3}/) !== null;
    }

    public static IsDoubleDocComment(activeLine: string): boolean {
        return activeLine.match(/^[ \t]+\/{3} $/) !== null;
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
        return code.match(/[\w\S]+[^)]?\b\s*{/) !== null;
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
        return code.match(/[ \t]+/) !== null;
    }

    public static GetMethodParamNameList(code: string): Array<string> {
        if (code === null) return null;
        const params: RegExpMatchArray = code.match(/[\w\S]\s+[\w\S]+\s*\((.*)\)/);

        const isMatched = (params === null || params.length !== 2);
        if (isMatched) return null;

        let paramName: Array<string> = new Array<string>();
        params[1].split(',').forEach(param => {
            const hasOptionalParam: boolean = param.match(/\S+\s+\S+\s*=/) !== null;
            const hasGenericParam: boolean = param.match(/[<]/) !== null;
            const hasTypeInfo: boolean = param.match(/[\w\W]+\s+[\w\W]+/) !== null;
            let name: RegExpMatchArray = null;
            if (hasOptionalParam) {
                name = param.match(/\S+\s+(\S+)\s*=.*/)
            } else if (hasGenericParam) {
                name = null; // SKIP
            } else if (!hasTypeInfo) {
                name = null; // SKIP
            } else {
                name = param.match(/(\S+)\s*$/);
            }
            if (name !== null && name.length === 2) {
                paramName.push(name[1]);
            }
        });

        return paramName;
    }

    public static HasMethodReturn(code: string): boolean {
        if (code === null) return false;
        const returns: RegExpMatchArray = code.match(/([\w\S]+)\s+[\w\S]+\s*\(.*\)/);

        const isMatched = (returns === null || returns.length !== 2);
        if (isMatched) return false;

        return (returns[1].match(this.RESERVED_WORDS) === null) ? true : false;
    }

    public static HasPropertyReturn(code: string): boolean {
        if (code === null) return false;
        const returns: RegExpMatchArray = code.match(/([\w\S]+)\s+[\w\S]+\s*\{/);

        const isMatched = (returns === null || returns.length !== 2);
        if (isMatched) return false;

        return (returns[1].match(this.RESERVED_WORDS) === null) ? true : false;
    }

}
