export class Configuration {

    /*-------------------------------------------------------------------------
     * docomment
     *-----------------------------------------------------------------------*/
    public static KEY_DOCOMMENT = 'docomment';
    public static ACTIVATE_ON_ENTER = 'activateOnEnter';
    public static ADVANCED = 'advanced';

    /*-------------------------------------------------------------------------
     * files
     *-----------------------------------------------------------------------*/
    public static KEY_FILES = 'files';
    public static EOL = 'eol';

    /*-------------------------------------------------------------------------
     * editor
     *-----------------------------------------------------------------------*/
    public static KEY_EDITOR = 'editor';
    public static INSERT_SPACES = 'insertSpaces';
    public static DETECT_IDENTATION = 'detectIndentation';

    public activateOnEnter: boolean;
    public advanced: Object;
    public eol: string;
    public insertSpaces: boolean;
    public detectIdentation: boolean;

}
