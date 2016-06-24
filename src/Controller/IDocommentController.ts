import {Disposable} from 'vscode';
import {IDocommentDomain} from '../Domain/IDocommentDomain';
import {Configuration} from '../Entity/Config/Contributes/Configuration';

export interface IDocommentController {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    _languageId: string;
    _disposable: Disposable;
    _docommentDomain: IDocommentDomain;
    _config: Configuration;


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
