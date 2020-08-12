import {Disposable} from 'vscode';
import {IDocommentDomain} from '../Domain/IDocommentDomain';
import {Configuration} from '../Entity/Config/Contributes/Configuration';

export interface IDocommentController {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    _languageId: string;
    _disposable: Disposable;

    /*-------------------------------------------------------------------------
     * Public Method
     *-----------------------------------------------------------------------*/
    dispose(): void;

}

export interface IDocommentControllerConstructor {

    /*-------------------------------------------------------------------------
     * Public Method
     *-----------------------------------------------------------------------*/
    new (docommentDomain: IDocommentDomain): IDocommentController;
}
