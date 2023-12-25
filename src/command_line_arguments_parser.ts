class CommandLineArguments {
  private args: string[];

  constructor(args: string[]) {
    this.args = args;
  }

  checkForOption(option: string): boolean {
    return this.args.includes(option);
  }

  getOptionValue(option: string): string | null {
    if (this.checkForOption(option)) {
      const optionIndex = this.args.indexOf(option);
      if (optionIndex + 1 < this.args.length) {
        return this.args[optionIndex + 1];
      }
    }
    return null;
  }
}

export {CommandLineArguments}