import * as assert from 'assert';
import {StringUtil} from '../../src/Utility/StringUtil';

suite('Utility.StringUtil.IsNullOrWhiteSpace Tests', () => {

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : IsNullOrWhiteSpace
        STATE   : -
        IN      : null
        OUT     : true
    `, () => {
            // arrange
            const code: string = null;

            // act
            const actual: boolean = StringUtil.IsNullOrWhiteSpace(code);

            // assert
            assert.equal(actual, true);
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : IsNullOrWhiteSpace
        STATE   : -
        IN      : ''
        OUT     : true
    `, () => {
            // arrange
            const code = '';

            // act
            const actual: boolean = StringUtil.IsNullOrWhiteSpace(code);

            // assert
            assert.equal(actual, true);
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : IsNullOrWhiteSpace
        STATE   : -
        IN      : ' '
        OUT     : false
    `, () => {
            // arrange
            const code = ' ';

            // act
            const actual: boolean = StringUtil.IsNullOrWhiteSpace(code);

            // assert
            assert.equal(actual, true);
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : IsNullOrWhiteSpace
        STATE   : -
        IN      : 'foo'
        OUT     : false
    `, () => {
            // arrange
            const code = 'foo';

            // act
            const actual: boolean = StringUtil.IsNullOrWhiteSpace(code);

            // assert
            assert.equal(actual, false);
        });
});



suite('Utility.StringUtil.IsCodeBlockStart Tests', () => {

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : IsCodeBlockStart
        STATE   : -
        IN      : null
        OUT     : false
    `, () => {
            // arrange
            const code: string = null;

            // act
            const actual: boolean = StringUtil.IsCodeBlockStart(code);

            // assert
            assert.equal(actual, false);
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : IsCodeBlockStart
        STATE   : -
        IN      : ''
        OUT     : false
    `, () => {
            // arrange
            const code = '';

            // act
            const actual: boolean = StringUtil.IsCodeBlockStart(code);

            // assert
            assert.equal(actual, false);
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : IsCodeBlockStart
        STATE   : -
        IN      : '{'
        OUT     : true
    `, () => {
            // arrange
            const code = '{';

            // act
            const actual: boolean = StringUtil.IsCodeBlockStart(code);

            // assert
            assert.equal(actual, true);
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : IsCodeBlockStart
        STATE   : -
        IN      : ';'
        OUT     : true
    `, () => {
            // arrange
            const code = ';';

            // act
            const actual: boolean = StringUtil.IsCodeBlockStart(code);

            // assert
            assert.equal(actual, true);
        });
});



suite('Utility.StringUtil.RemoveComment Tests', () => {

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : RemoveComment
        STATE   : -
        IN      : null
        OUT     : null
    `, () => {
            // arrange
            const code: string = null;

            // act
            const actual: string = StringUtil.RemoveComment(code);

            // assert
            assert.equal(actual, null);
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : RemoveComment
        STATE   : -
        IN      : ''
        OUT     : ''
    `, () => {
            // arrange
            const code = '';

            // act
            const actual: string = StringUtil.RemoveComment(code);

            // assert
            assert.equal(actual, '');
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : RemoveComment
        STATE   : -
        IN      : '/*foo*/'
        OUT     : ''
    `, () => {
            // arrange
            const code = '/*foo*/';

            // act
            const actual: string = StringUtil.RemoveComment(code);

            // assert
            assert.equal(actual, '');
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : RemoveComment
        STATE   : -
        IN      : 'bar/*foo*/fuga'
        OUT     : 'barfuga'
    `, () => {
            // arrange
            const code = 'bar/*foo*/fuga';

            // act
            const actual: string = StringUtil.RemoveComment(code);

            // assert
            assert.equal(actual, 'barfuga');
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : RemoveComment
        STATE   : -
        IN      : '/*foo'
        OUT     : '/*foo'
    `, () => {
            // arrange
            const code = '/*foo';

            // act
            const actual: string = StringUtil.RemoveComment(code);

            // assert
            assert.equal(actual, '/*foo');
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : RemoveComment
        STATE   : -
        IN      : '//foo'
        OUT     : ''
    `, () => {
            // arrange
            const code = '//foo';

            // act
            const actual: string = StringUtil.RemoveComment(code);

            // assert
            assert.equal(actual, '');
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : RemoveComment
        STATE   : -
        IN      : 'bar//foo'
        OUT     : ''
    `, () => {
            // arrange
            const code = 'bar//foo';

            // act
            const actual: string = StringUtil.RemoveComment(code);

            // assert
            assert.equal(actual, 'bar');
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : RemoveComment
        STATE   : -
        IN      : '/*bar*/ //foo'
        OUT     : ' '
    `, () => {
            // arrange
            const code = '/*bar*/ //foo';

            // act
            const actual: string = StringUtil.RemoveComment(code);

            // assert
            assert.equal(actual, ' ');
        });
});



suite('Utility.StringUtil.GetIndent Tests', () => {

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : GetIndent
        STATE   : -
        IN      : null
        OUT     : null
    `, () => {
            // arrange
            const code: string = null;

            // act
            const actual: string = StringUtil.GetIndent(code);

            // assert
            assert.equal(actual, null);
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : GetIndent
        STATE   : -
        IN      : ''
        OUT     : ''
    `, () => {
            // arrange
            const code = '';

            // act
            const actual: string = StringUtil.GetIndent(code);

            // assert
            assert.equal(actual, '');
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : GetIndent
        STATE   : -
        IN      : '  foo '
        OUT     : '  '
    `, () => {
            // arrange
            const code = '  foo ';

            // act
            const actual: string = StringUtil.GetIndent(code);

            // assert
            assert.equal(actual, '  ');
        });

    test(`
        Category: Black-box testing
        Class   : Utility.StringUtil
        Method  : GetIndent
        STATE   : -
        IN      : '	 	foo '
        OUT     : '	 	'
    `, () => {
            // arrange
            const code = '	 	foo ';

            // act
            const actual: string = StringUtil.GetIndent(code);

            // assert
            assert.equal(actual, '	 	');
        });

});
