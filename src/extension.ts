import {ExtensionContext} from 'vscode';
import {DocommentDomainCSharp} from './Domain/Lang/DocommentDomainCSharp';
import {DocommentControllerCSharp} from './Controller/Lang/DocommentControllerCSharp';

export function activate(context: ExtensionContext) {

    const domainCSharp = new DocommentDomainCSharp();
    const controllerCSharp = new DocommentControllerCSharp(domainCSharp);

    context.subscriptions.push(controllerCSharp);
    context.subscriptions.push(domainCSharp);
}
