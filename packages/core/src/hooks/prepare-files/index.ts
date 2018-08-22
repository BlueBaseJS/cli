import { Hook } from '@oclif/config';
import { FileManager } from '../../FileManager';

export type Flags = { configPath: string, buildPath: string };

const hook: Hook<'preexec'> = async function (options: any) {
	// const { flags } = this.parse(options)
	// console.log(`hahahahaha example config files hook running.`, options);

	debugger;
	options.command.fileManager = await (new FileManager(options.command)).prepare();
	
	console.log(options.command.fileManager.configs);

}

export default hook;
