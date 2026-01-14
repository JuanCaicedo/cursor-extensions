# GitLab Link Generator for Cursor

A Cursor/VS Code extension that generates shareable GitLab URLs for selected code lines.

## Features

- Generate GitLab permalink URLs directly from your editor
- Supports single line or multi-line selections
- Automatically copies the link to your clipboard
- Works with any branch or commit SHA
- Handles both HTTPS and SSH remote URLs

## Usage

1. Open a file in your git repository
2. Select the lines you want to share (or place your cursor on a single line)
3. Open the command palette (`Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux)
4. Type "GitLab: Generate Link for Selection" and press Enter
5. The GitLab URL is automatically copied to your clipboard!

**Example output:**
```
https://gitlab.com/myteam/myproject/-/blob/main/src/utils/helper.ts#L45-52
```

## Requirements

- File must be in a git repository
- Repository must have a GitLab remote configured as `origin`

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/juancaicedo/gitlab-link-generator.git
   cd cursor-extensions
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile the extension:
   ```bash
   npm run compile
   ```

4. Package the extension:
   ```bash
   npm run package
   ```

5. Install the generated `.vsix` file in Cursor:
   - Open Cursor
   - Go to Extensions (Cmd+Shift+X)
   - Click the "..." menu at the top
   - Select "Install from VSIX..."
   - Choose the generated `.vsix` file

### From Marketplace (Coming Soon)

Once published, you'll be able to install directly from the Cursor/VS Code marketplace.

## Development

1. Clone and install dependencies:
   ```bash
   git clone https://github.com/yourusername/cursor-extensions.git
   cd cursor-extensions
   npm install
   ```

2. Open in VS Code/Cursor:
   ```bash
   code .
   ```

3. Press F5 to launch the extension in debug mode

4. Make your changes and test

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT
