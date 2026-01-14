# cursor-extensions

A collection of custom commands for Cursor IDE to enhance your development workflow.

## Commands

### GitLab Link Generator

Generate shareable GitLab URLs for selected code lines.

**Command:** `/gitlab-link`

**Usage:**
1. Open a file in your git repository
2. Select the lines you want to share (or just place your cursor on a single line)
3. Open Cursor chat and type `/gitlab-link`
4. The command will generate a GitLab URL pointing to the exact file and lines

**Example output:**
```
https://gitlab.com/myteam/myproject/-/blob/main/src/utils/helper.ts#L45-52
```

**Requirements:**
- File must be in a git repository
- Repository must have a GitLab remote configured as `origin`

## Installation

1. Clone this repository or copy the `.cursor` directory to your project
2. The commands will be automatically available in Cursor IDE
3. Type `/` in the Cursor chat to see all available commands

## Adding Custom Commands

To add your own commands:

1. Create a new `.md` file in `.cursor/commands/`
2. Follow the command template structure (see existing commands for examples)
3. The command will be automatically discovered by Cursor

## Contributing

Feel free to add more useful commands and submit pull requests!
