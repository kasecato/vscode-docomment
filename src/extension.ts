import {ExtensionContext} from 'vscode';
import {DocomentCSharpController} from './Controller/DocomentCSharpController';
import {DocomentCSharpDomain} from './Domain/DocomentCSharpDomain';

export function activate(context: ExtensionContext) {

    const domainCSharp = new DocomentCSharpDomain();
    const controllerCSharp = new DocomentCSharpController(domainCSharp);

    context.subscriptions.push(controllerCSharp);
    context.subscriptions.push(domainCSharp);
}
