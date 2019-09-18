import { Command } from '@oclif/command';
export default class StartCommand extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        configDir: import("@oclif/command/lib/flags").IOptionFlag<string | undefined>;
        buildDir: import("@oclif/command/lib/flags").IOptionFlag<string | undefined>;
        assetsDir: import("@oclif/command/lib/flags").IOptionFlag<string | undefined>;
        appJsPath: import("@oclif/command/lib/flags").IOptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}
