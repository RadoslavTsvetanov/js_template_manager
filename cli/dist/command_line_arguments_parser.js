class CommandLineArguments {
    constructor(args) {
        this.args = args;
    }
    checkForOption(option) {
        return this.args.includes(option);
    }
    getOptionValue(option) {
        if (this.checkForOption(option)) {
            const optionIndex = this.args.indexOf(option);
            if (optionIndex + 1 < this.args.length) {
                return this.args[optionIndex + 1];
            }
        }
        return null;
    }
}
export { CommandLineArguments };
//# sourceMappingURL=command_line_arguments_parser.js.map