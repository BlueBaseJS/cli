import {Command, flags} from '@oclif/command'

export default class Electron extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ oclif-example hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{ name: 'build' }, { name: 'run' }]

  async run() {
    const {args, flags} = this.parse(Electron)
    this.log(`Electron`, args, flags);
  }
}
