# GitLab Link Generator

Generate a GitLab URL for the currently selected code lines.

## Objective

Create a shareable GitLab URL that points to the exact file and line numbers of the currently selected code in the editor. This allows users to quickly share code references with their team.

## Requirements

1. Get the current file path relative to the git repository root
2. Determine the selected line numbers (start and end)
3. Extract the GitLab remote URL from git config
4. Use the current git branch (or commit SHA if detached HEAD)
5. Construct a properly formatted GitLab URL
6. Handle edge cases gracefully (no selection, not in git repo, etc.)

## Output Format

The command should output a clickable GitLab URL in this format:
```
https://gitlab.com/group/project/-/blob/branch-name/path/to/file.ext#L10-20
```

If only one line is selected:
```
https://gitlab.com/group/project/-/blob/branch-name/path/to/file.ext#L10
```

## Instructions

When this command is invoked:

1. **Get file information:**
   - Retrieve the absolute path of the current file
   - Get the git repository root using `git rev-parse --show-toplevel`
   - Calculate the relative path from repo root to current file

2. **Get line numbers:**
   - Extract the start and end line numbers of the current selection
   - If no selection, use the current cursor line number

3. **Get git information:**
   - Get the remote URL: `git config --get remote.origin.url`
   - Clean up the URL (remove .git suffix, convert SSH to HTTPS format if needed)
   - Get current branch: `git rev-parse --abbrev-ref HEAD`
   - If detached HEAD, use commit SHA: `git rev-parse HEAD`

4. **Construct the GitLab URL:**
   - Format: `{gitlab_base_url}/-/blob/{branch}/{relative_file_path}#L{start}-{end}`
   - For single line: `{gitlab_base_url}/-/blob/{branch}/{relative_file_path}#L{line}`

5. **Handle edge cases:**
   - If not in a git repository, show error message
   - If no GitLab remote found, show error message
   - If file is not tracked by git, show warning but attempt to generate URL

6. **Display the result:**
   - Print the GitLab URL
   - Optionally, copy it to the clipboard if possible

## Example

For a file at `src/utils/helper.ts` with lines 45-52 selected on branch `main` in repo `https://gitlab.com/myteam/myproject`:

```
https://gitlab.com/myteam/myproject/-/blob/main/src/utils/helper.ts#L45-52
```
