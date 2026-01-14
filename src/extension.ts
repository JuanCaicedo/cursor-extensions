import * as vscode from 'vscode';
import * as path from 'path';
import { execSync } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('gitlabLink.generateLink', async () => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active editor found');
                return;
            }

            const document = editor.document;
            const filePath = document.fileName;
            const selection = editor.selection;

            // Get line numbers (VS Code uses 0-based indexing, GitLab uses 1-based)
            const startLine = selection.start.line + 1;
            const endLine = selection.end.line + 1;

            // Get git repository root
            let repoRoot: string;
            try {
                repoRoot = execSync('git rev-parse --show-toplevel', {
                    cwd: path.dirname(filePath),
                    encoding: 'utf8'
                }).trim();
            } catch (error) {
                vscode.window.showErrorMessage('Not in a git repository');
                return;
            }

            // Get relative file path
            const relativePath = path.relative(repoRoot, filePath).replace(/\\/g, '/');

            // Get git remote URL
            let remoteUrl: string;
            try {
                remoteUrl = execSync('git config --get remote.origin.url', {
                    cwd: repoRoot,
                    encoding: 'utf8'
                }).trim();
            } catch (error) {
                vscode.window.showErrorMessage('No GitLab remote found (origin)');
                return;
            }

            // Convert SSH URL to HTTPS if needed and remove .git suffix
            let gitlabBaseUrl = remoteUrl
                .replace(/^git@([^:]+):/, 'https://$1/')
                .replace(/\.git$/, '');

            // Get current branch or commit SHA
            let ref: string;
            try {
                ref = execSync('git rev-parse --abbrev-ref HEAD', {
                    cwd: repoRoot,
                    encoding: 'utf8'
                }).trim();

                // If detached HEAD, use commit SHA instead
                if (ref === 'HEAD') {
                    ref = execSync('git rev-parse HEAD', {
                        cwd: repoRoot,
                        encoding: 'utf8'
                    }).trim();
                }
            } catch (error) {
                vscode.window.showErrorMessage('Could not determine git branch or commit');
                return;
            }

            // Construct GitLab URL
            let gitlabUrl: string;
            if (startLine === endLine) {
                gitlabUrl = `${gitlabBaseUrl}/-/blob/${ref}/${relativePath}#L${startLine}`;
            } else {
                gitlabUrl = `${gitlabBaseUrl}/-/blob/${ref}/${relativePath}#L${startLine}-${endLine}`;
            }

            // Copy to clipboard
            await vscode.env.clipboard.writeText(gitlabUrl);

            // Show success message
            vscode.window.showInformationMessage(`GitLab link copied to clipboard!`, 'Open Link').then(selection => {
                if (selection === 'Open Link') {
                    vscode.env.openExternal(vscode.Uri.parse(gitlabUrl));
                }
            });

        } catch (error) {
            vscode.window.showErrorMessage(`Error generating GitLab link: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
