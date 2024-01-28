Terminal Usage Examples:
Command: Add a Template
**when you want to use current dir use .**
bash

my-command --add ./template-directory --name myTemplate

    This command adds a template from the template-directory to your API with the name myTemplate.

Command: Remove a Template

bash

my-command --remove --name myTemplate

    This command removes the template named myTemplate from the API.

Command: Install a Template

bash

my-command --install --name myTemplate --dir ./target-directory

    This command installs the template named myTemplate from the API into the target-directory. If --dir is not provided, it defaults to the current directory.

These commands are hypothetical and based on the command options defined in your script (--add, --remove, --install, --name, --dir). Replace the placeholders like ./template-directory, myTemplate, ./target-directory, etc., with actual file paths, template names, or directories you want to use in your CLI tool.

You'll need to ensure that this script is made executable and is available in your system's PATH to run it directly from the terminal as my-command. Additionally, the script should have appropriate permissions (chmod +x my-command on Unix-like systems) to be executable.
 