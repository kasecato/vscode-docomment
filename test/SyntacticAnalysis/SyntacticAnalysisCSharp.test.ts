import * as assert from 'assert';
import {SyntacticAnalysisCSharp} from '../../src/SyntacticAnalysis/SyntacticAnalysisCSharp';

suite('SyntacticAnalysis.SyntacticAnalysisCSharp.IsNamespace Tests', () => {

    test(`
        Category: Black-box testing
        Class   : SyntacticAnalysis.SyntacticAnalysisCSharp
        Method  : IsNamespace
        STATE   : -
        IN      : null
        OUT     : false
    `, () => {
            // arrange
            const code: string = null;

            // act
            const actual: boolean = SyntacticAnalysisCSharp.IsNamespace(code);

            // assert
            assert.equal(actual, false);
        });

    test(`
        Category: Black-box testing
        Class   : SyntacticAnalysis.SyntacticAnalysisCSharp
        Method  : IsNamespace
        STATE   : -
        IN      : ''
        OUT     : false
    `, () => {
            // arrange
            const code = '';

            // act
            const actual: boolean = SyntacticAnalysisCSharp.IsNamespace(code);

            // assert
            assert.equal(actual, false);
        });

    test(`
        Category: Black-box testing
        Class   : SyntacticAnalysis.SyntacticAnalysisCSharp
        Method  : IsNamespace
        STATE   : -
        IN      : 'namespacefoo'
        OUT     : false
    `, () => {
            // arrange
            const code = 'namespacefoo';

            // act
            const actual: boolean = SyntacticAnalysisCSharp.IsNamespace(code);

            // assert
            assert.equal(actual, false);
        });

    test(`
        Category: Black-box testing
        Class   : SyntacticAnalysis.SyntacticAnalysisCSharp
        Method  : IsNamespace
        STATE   : -
        IN      : 'namespace'
        OUT     : true
    `, () => {
            // arrange
            const code = 'namespace';

            // act
            const actual: boolean = SyntacticAnalysisCSharp.IsNamespace(code);

            // assert
            assert.equal(actual, true);
        });

    test(`
        Category: Black-box testing
        Class   : SyntacticAnalysis.SyntacticAnalysisCSharp
        Method  : IsNamespace
        STATE   : -
        IN      : ' namespace '
        OUT     : true
    `, () => {
            // arrange
            const code = ' namespace ';

            // act
            const actual: boolean = SyntacticAnalysisCSharp.IsNamespace(code);

            // assert
            assert.equal(actual, true);
        });

});



suite('SyntacticAnalysis.SyntacticAnalysisCSharp.IsClass Tests', () => {

    test(`
        Category: Black-box testing
        Class   : SyntacticAnalysis.SyntacticAnalysisCSharp
        Method  : IsClass
        STATE   : -
        IN      : null
        OUT     : false
    `, () => {
            // arrange
            const code: string = null;

            // act
            const actual: boolean = SyntacticAnalysisCSharp.IsClass(code);

            // assert
            assert.equal(actual, false);
        });

    test(`
        Category: Black-box testing
        Class   : SyntacticAnalysis.SyntacticAnalysisCSharp
        Method  : IsClass
        STATE   : -
        IN      : ''
        OUT     : false
    `, () => {
            // arrange
            const code = '';

            // act
            const actual: boolean = SyntacticAnalysisCSharp.IsClass(code);

            // assert
            assert.equal(actual, false);
        });

    test(`
        Category: Black-box testing
        Class   : SyntacticAnalysis.SyntacticAnalysisCSharp
        Method  : IsClass
        STATE   : -
        IN      : 'namespacefoo'
        OUT     : false
    `, () => {
            // arrange
            const code = 'namespacefoo';

            // act
            const actual: boolean = SyntacticAnalysisCSharp.IsClass(code);

            // assert
            assert.equal(actual, false);
        });

    test(`
        Category: Black-box testing
        Class   : SyntacticAnalysis.SyntacticAnalysisCSharp
        Method  : IsClass
        STATE   : -
        IN      : 'class'
        OUT     : true
    `, () => {
            // arrange
            const code = 'class';

            // act
            const actual: boolean = SyntacticAnalysisCSharp.IsClass(code);

            // assert
            assert.equal(actual, true);
        });

    test(`
        Category: Black-box testing
        Class   : SyntacticAnalysis.SyntacticAnalysisCSharp
        Method  : IsNamespace
        STATE   : -
        IN      : ' class '
        OUT     : true
    `, () => {
            // arrange
            const code = ' class ';

            // act
            const actual: boolean = SyntacticAnalysisCSharp.IsClass(code);

            // assert
            assert.equal(actual, true);
        });

});
