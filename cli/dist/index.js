#!/usr/bin/env node
import { CommandLineArguments } from "./command_line_arguments_parser.js";
import { ApiClient } from "./api_client.js";
import { TemplateMaker } from "./Template_maker.js";
import { Config, FileManager } from "./config_saver.js";
import { fileURLToPath } from 'url';
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const config = new Config(new FileManager(path.join(__dirname, "config.json"))); //since idk how to get the path from which the exe is ran i am using this way. I could in the future specify absolute
var command_options;
(function (command_options) {
    command_options["GET_URL"] = "--getURL";
    command_options["SET_URL"] = "--setURL";
    command_options["ADD"] = "--add";
    command_options["REMOVE"] = "--remove";
    command_options["INSTALL"] = "--install";
    command_options["NAME"] = "--name";
    command_options["DIR"] = "--dir";
})(command_options || (command_options = {}));
async function main() {
    console.log(process.argv);
    const args = new CommandLineArguments(process.argv);
    if (args.checkForOption(command_options.ADD)) {
        const api_client = new ApiClient(config.get_url());
        console.log("add");
        const Templater = new TemplateMaker(args.getOptionValue(command_options.ADD));
        await api_client.createTemplate(args.getOptionValue(command_options.NAME), JSON.stringify(Templater.mapDirectory()));
    }
    else if (args.checkForOption(command_options.REMOVE)) {
        console.log("remove");
    }
    else if (args.checkForOption(command_options.INSTALL)) {
        console.log("install");
        const directory = args.getOptionValue(command_options.DIR) || process.cwd(); // Use current directory if --dir flag is not provided
        const Templater = new TemplateMaker(directory);
        const api = new ApiClient(config.get_url());
        const template = await api.getTemplate(args.getOptionValue(command_options.NAME));
        console.log("before api");
        //error somewhere after this the is error
        console.dir(template);
        const actual_template = JSON.parse(template.content);
        //befire
        console.log("after api");
        Templater.generateFilesFromTemplate(actual_template, directory);
    }
    else if (args.checkForOption(command_options.SET_URL)) {
        config.set_url(args.getOptionValue(command_options.SET_URL));
        console.log(config.get_url());
        console.log("-----");
    }
    else if (args.checkForOption(command_options.GET_URL)) {
        console.log(config.get_url());
    }
}
main();
//# sourceMappingURL=index.js.map