#!/usr/bin/env node

import { CommandLineArguments } from "./command_line_arguments_parser.js";
import { ApiClient } from "./api_client.js";
import { TemplateMaker } from "./Template_maker.js";

enum command_options {
  ADD = "--add",
  REMOVE = "--remove",
  INSTALL = "--install",
  NAME = "--name",
  DIR = "--dir",
}

async function main() {
  console.log(process.argv);
  const args = new CommandLineArguments(process.argv);

  if (args.checkForOption(command_options.ADD)) {
    const api_client = new ApiClient("http://localhost:3000");
    console.log("add");

    const Templater = new TemplateMaker(args.getOptionValue(command_options.ADD));
    await api_client.createTemplate(
      args.getOptionValue(command_options.NAME),
      JSON.stringify(Templater.mapDirectory())
    );
  } else if (args.checkForOption(command_options.REMOVE)) {
    console.log("remove");
  } else if (args.checkForOption(command_options.INSTALL)) {
    console.log("install");

    const directory = args.getOptionValue(command_options.DIR) || process.cwd(); // Use current directory if --dir flag is not provided

    const Templater = new TemplateMaker(directory);
    const api = new ApiClient(process.env.URL || "http://localhost:3000");

    const template = await api.getTemplate(args.getOptionValue(command_options.NAME));
    Templater.generateFilesFromTemplate(
      JSON.parse(template[args.getOptionValue(command_options.NAME)]),
      directory
    );
  }
}

main();
