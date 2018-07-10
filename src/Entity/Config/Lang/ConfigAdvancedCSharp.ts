import { CodeType } from '../../../Domain/IDocommentDomain';

export enum Attribute {
    summary = 'summary',
    param = 'param',
    typeparam = 'typeparam',
    returns = 'returns',
    value = 'value',
}

export interface Options {
    attribute: Attribute;
    inline: boolean;
}

export class ConfigAdvancedCSharp {
    private static KEY = 'cs';
    private static ATTRIBUTES = 'attributes';
    private static INLINE = 'inline';

    public static GetInline(advanced: Object, codeType: CodeType): boolean {
        if (!advanced.hasOwnProperty(ConfigAdvancedCSharp.KEY)) return true;
        if (!advanced[ConfigAdvancedCSharp.KEY].hasOwnProperty(codeType)) return true;
        if (!advanced[ConfigAdvancedCSharp.KEY][codeType].hasOwnProperty(ConfigAdvancedCSharp.INLINE)) return true;

        return advanced[ConfigAdvancedCSharp.KEY][codeType][ConfigAdvancedCSharp.INLINE] as boolean;
    }

    public static HasAttribute(advanced: Object, codeType: CodeType, attribute: Attribute): boolean {
        if (!advanced.hasOwnProperty(ConfigAdvancedCSharp.KEY)) return true;
        if (!advanced[ConfigAdvancedCSharp.KEY].hasOwnProperty(codeType)) return true;
        if (!advanced[ConfigAdvancedCSharp.KEY][codeType].hasOwnProperty(ConfigAdvancedCSharp.ATTRIBUTES)) return true;

        const attributes = advanced[ConfigAdvancedCSharp.KEY][codeType][ConfigAdvancedCSharp.ATTRIBUTES] as Array<Attribute>;
        return 0 <= attributes.findIndex(x => x === attribute);
    }

}
