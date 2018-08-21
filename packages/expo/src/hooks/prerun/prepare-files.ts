import { Hook } from '@oclif/config'

const hook: Hook<'prerun'> = async function (options: any) {
	// const { flags } = this.parse(options)
	console.log(`example prerun hook running.`, options)
}

export default hook;
