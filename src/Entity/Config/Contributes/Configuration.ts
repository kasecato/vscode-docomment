export class Configuration {

    /*-------------------------------------------------------------------------
     * docomment
     *-----------------------------------------------------------------------*/
    public static KEY_DOCOMMENT: string = 'docomment';
    public static ACTIVATE_ON_ENTER: string = 'activateOnEnter';

    /*-------------------------------------------------------------------------
     * files
     *-----------------------------------------------------------------------*/
    public static KEY_FILES: string = 'files';
    public static EOL: string = 'eol';

    /*-------------------------------------------------------------------------
     * editor
     *-----------------------------------------------------------------------*/
    public static KEY_EDITOR: string = 'editor';
    public static INSERT_SPACES: string = 'insertSpaces';
    public static DETECT_IDENTATION: string = 'detectIndentation';

    public activateOnEnter: boolean;
    public eol: string;
    public insertSpaces: boolean;
    public detectIdentation: boolean;

}
