# Essays Directory

This directory contains all the essays for the website, organized as individual markdown files.

## File Structure

Each essay is stored as a separate markdown file with the following naming convention:
- `{essay-id}.md` where `essay-id` is a URL-friendly identifier

## File Format

Each markdown file should include:

1. **Frontmatter** (YAML metadata at the top of the file):
   ```yaml
   ---
   title: "Essay Title"
   excerpt: "Brief description of the essay"
   date: "YYYY-MM-DD"
   type: "technical|personal"
   tags: ["tag1", "tag2", "tag3"]
   ---
   ```

2. **Content**: The main essay content in markdown format

## Adding New Essays

To add a new essay:

1. Create a new markdown file in this directory
2. Use a descriptive filename (e.g., `my-new-essay.md`)
3. Add the required frontmatter metadata
4. Write your essay content in markdown format
5. The essay will automatically appear on the website

## Supported Markdown Features

- **Math**: LaTeX math expressions using `$...$` for inline and `$$...$$` for block math
- **Code**: Syntax highlighting for code blocks
- **Links**: Standard markdown links
- **Images**: Standard markdown image syntax
- **Lists**: Ordered and unordered lists
- **Blockquotes**: Standard markdown blockquotes