import { Hook } from '@oclif/config';
import { FileManager } from '../../FileManager';

export type Flags = { configPath: string, buildPath: string };

const hook: Hook<'preexec'> = async function (options: any) {
	options.command.fileManager = await (new FileManager(options.command)).prepare();
}

export default hook;
