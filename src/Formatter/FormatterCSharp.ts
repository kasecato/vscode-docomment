import { CommentSyntax } from "../Entity/Config/Contributes/Configuration";
import { SyntacticAnalysisCSharp } from "../SyntacticAnalysis/SyntacticAnalysisCSharp";

export class FormatterCSharp {

    /*-------------------------------------------------------------------------
     * Public Method: Formatter
     *-----------------------------------------------------------------------*/
    public static Format(docommentList: string[], indent: string, syntax: CommentSyntax, activateOnEnter: boolean) {
        switch (syntax) {
            case CommentSyntax.single:
                return FormatterCSharp.FormatAsSingle(docommentList, indent, syntax);
            case CommentSyntax.delimited:
                return FormatterCSharp.FormatAsDelimited(docommentList, indent, syntax, activateOnEnter);
        }
    }

    /*-------------------------------------------------------------------------
     * Private Method: Formatter
     *-----------------------------------------------------------------------*/
    private static FormatAsSingle(docommentList: string[], indent: string, syntax: CommentSyntax) {
        let docomment = ' ' + docommentList[0] + '\n';
        for (let i = 1; i < docommentList.length; i++) {
            docomment += indent + SyntacticAnalysisCSharp.GetCommentSyntax(syntax) + ' ' + docommentList[i];
            if (i !== docommentList.length - 1) {
                docomment += '\n';
            }
        }
        return docomment;
    }

    private static FormatAsDelimited(docommentList: string[], indent: string, syntax: CommentSyntax, activateOnEnter: boolean) {
        let docomment = '\n';
        for (let i = 0; i < docommentList.length; i++) {
            docomment += indent + ' ' + SyntacticAnalysisCSharp.GetCommentSyntax(syntax) + ' ' + docommentList[i];
            if (i !== docommentList.length - 1) {
                docomment += '\n';
            }
        }
        docomment += '\n';
        docomment += indent;
        docomment += ' */';
        return docomment;
    }

}
