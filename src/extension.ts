import {ExtensionContext} from 'vscode';
import {DocommentDomainCSharp} from './Domain/Lang/DocommentDomainCSharp';
import {DocomentControllerCSharp} from './Controller/Lang/DocomentControllerCSharp';

export function activate(context: ExtensionContext) {

    const domainCSharp = new DocommentDomainCSharp();
    const controllerCSharp = new DocomentControllerCSharp(domainCSharp);

    context.subscriptions.push(controllerCSharp);
    context.subscriptions.push(domainCSharp);
}
