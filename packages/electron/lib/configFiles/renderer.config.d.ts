import { RendererConfigs } from '../types';
export declare const fromHere: (file: string) => string;
export interface HookArgs {
    buildDir: string;
    configDir: string;
}
declare const _default: (input: RendererConfigs, args: HookArgs) => RendererConfigs;
export default _default;
