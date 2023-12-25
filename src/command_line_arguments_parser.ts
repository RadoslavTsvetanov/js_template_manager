class Command_line_arguments {
  constructor(args: ) {
    this.args = args;
  }

  check_for_option(option) {
    return this.args.includes(option);
  }

  get_option_value(option) {
    const optionIndex = this.args.indexOf(option);
    if (optionIndex !== -1 && optionIndex + 1 < this.args.length) {
      return this.args[optionIndex + 1];
    }
    return null;
  }
}
