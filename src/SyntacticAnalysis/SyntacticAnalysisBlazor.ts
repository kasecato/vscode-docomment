import { CodeType } from "../Domain/IDocommentDomain";
import { CommentSyntax } from "../Entity/Config/Contributes/Configuration";

export class SyntacticAnalysisBlazor {

    /*-------------------------------------------------------------------------
     * Public Method: Comment Type
     *-----------------------------------------------------------------------*/
    public static IsCodeScope(line: string): boolean {
        return line.match(/@code[ \t\n]*\{/) !== null;
    }

}
