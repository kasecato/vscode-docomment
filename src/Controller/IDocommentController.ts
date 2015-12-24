import {Disposable} from 'vscode';
import {IDocommentDomain} from '../Domain/IDocommentDomain';

export interface IDocommentController {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    _languageId: string;
    _disposable: Disposable;
    _docommentDomain: IDocommentDomain;


    /*-------------------------------------------------------------------------
     * Public Method
     *-----------------------------------------------------------------------*/
    dispose();

}

export interface IDocommentControllerConstructor {

    /*-------------------------------------------------------------------------
     * Public Method
     *-----------------------------------------------------------------------*/
    new (docommentDomain: IDocommentDomain): IDocommentController;
}
