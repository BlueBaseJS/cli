import { flags } from '@oclif/command';
export interface Flags {
    buildDir: string;
    configDir: string;
    assetsDir: string;
}
export declare const FlagDefs: {
    configDir: flags.IOptionFlag<string | undefined>;
    buildDir: flags.IOptionFlag<string | undefined>;
    assetsDir: flags.IOptionFlag<string | undefined>;
};
