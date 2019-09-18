import { Command } from '@oclif/command';
export default class CustomCommand extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        configDir: import("../../../../../../../../../../Users/artalat/Coding/bluebase/cli/packages/electron/node_modules/@oclif/command/lib/flags").IOptionFlag<string | undefined>;
        buildDir: import("../../../../../../../../../../Users/artalat/Coding/bluebase/cli/packages/electron/node_modules/@oclif/command/lib/flags").IOptionFlag<string | undefined>;
        assetsDir: import("../../../../../../../../../../Users/artalat/Coding/bluebase/cli/packages/electron/node_modules/@oclif/command/lib/flags").IOptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}
