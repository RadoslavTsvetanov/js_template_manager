#!/usr/bin/env node
import { CommandLineArguments } from "./command_line_arguments_parser.js"
enum command_options{
    ADD = "--add",
    REMOVE = "--remove",
    INSTALL = "--install"
}

function main() {
    console.log(process.argv)
    const args = new CommandLineArguments(process.argv.slice(2))
    if (args.checkForOption(command_options.ADD)) {
        console.log("add")
    }else if(args.checkForOption(command_options.REMOVE)){
        console.log("remove")
    } else if (args.checkForOption(command_options.INSTALL)) {
        console.log("install")
    }
}

main()