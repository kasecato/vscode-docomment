import { DocommentDomainCSharp } from './DocommentDomainCSharp';
import { SyntacticAnalysisBlazor } from '../../SyntacticAnalysis/SyntacticAnalysisBlazor';

export class DocommentDomainBlazor extends DocommentDomainCSharp {

    /* @implements */
    public IsInScope(): boolean {
        const lineNum = this._vsCodeApi.GetActivePosition().line;
        for(let i = lineNum - 1; i >= 0; i--) {
            const line = this._vsCodeApi.ReadLine(i);
            if (SyntacticAnalysisBlazor.IsCodeScope(line)) {
                return true;
            }
        }
        return false;
    }

}
