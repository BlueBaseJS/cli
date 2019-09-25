import { flags } from '@oclif/command';
export interface ExpoFlags {
    assetsDir: string;
    buildDir: string;
    configDir: string;
    appJsPath: string;
}
export declare const ExpoFlagDefs: {
    configDir: flags.IOptionFlag<string | undefined>;
    buildDir: flags.IOptionFlag<string | undefined>;
    assetsDir: flags.IOptionFlag<string | undefined>;
    appJsPath: flags.IOptionFlag<string | undefined>;
};
