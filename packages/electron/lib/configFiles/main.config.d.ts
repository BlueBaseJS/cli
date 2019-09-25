import { MainConfigs } from '../types';
export declare const fromHere: (file: string) => string;
export interface HookArgs {
    buildDir: string;
    configDir: string;
}
declare const _default: (input: MainConfigs, args: HookArgs) => MainConfigs;
export default _default;
