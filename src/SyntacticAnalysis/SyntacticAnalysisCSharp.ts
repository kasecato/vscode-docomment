export class SyntacticAnalysisCSharp {

    /*-------------------------------------------------------------------------
     * Public Method
     *-----------------------------------------------------------------------*/
    public static IsNamespace(code: string): boolean {
        return code.match(/\bnamespace\b/) !== null;
    }

    public static IsClass(code: string): boolean {
        return code.match(/\bclass\b/) !== null;
    }

    public static IsInterface(code: string): boolean {
        return code.match(/\binterface\b/) !== null;
    }

    public static IsStruct(code: string): boolean {
        return code.match(/\bstruct\b/) !== null;
    }

    public static IsEnum(code: string): boolean {
        return code.match(/\benum\b/) !== null;
    }

    public static IsDelegate(code: string): boolean {
        return code.match(/\bdelegate\b/) !== null;
    }

    public static IsEvent(code: string): boolean {
        return code.match(/\bevent\b/) !== null;
    }

    public static IsProperty(code: string): boolean {
        return code.match(/\w+[^)]?\b{/) !== null;
    }

    public static IsField(code: string): boolean {
        return code.match(/;[ \t]*$/) !== null;
    }

    public static IsMethod(code: string): boolean {
        return code.match(/\w\s\w*\s*\(.*\)/) !== null;
    }


    public static GetMethodParamNameList(code: string): Array<string> {
        const params: RegExpMatchArray = code.match(/\w\s\w*\s*\((.*)\)/);

        if (params === null || params.length !== 2) return null;

        let paramName: Array<string> = new Array<string>();
        params[1].split(',').forEach(param => {
            const name: RegExpMatchArray = param.match(/\s(\w+)$/);
            if (name !== null && name.length === 2) {
                paramName.push(name[1]);
            }
        });

        return paramName;
    }

    public static HasMethodReturn(code: string): boolean {
        const returns: RegExpMatchArray = code.match(/(\w+)\s\w+\s*\(.*\)/);

        if (returns === null || returns.length !== 2) return null;

        const reservedWords = /(void|event|delegate|internal|public|protected|private|static|sealed|abstract|virtual|override)/;
        return (returns[1].match(reservedWords) === null) ? true : false;
    }
}
