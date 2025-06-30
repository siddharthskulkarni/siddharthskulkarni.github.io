# Siddharth Kulkarni's Personal Website

A personal website built with React, Vite, and Tailwind CSS featuring essays on technology, mathematics, and personal reflections.

## Features

- **Dark/Light Theme**: Toggle between dark and light themes
- **Essay Management**: Individual markdown files for easy content management
- **Math Support**: LaTeX math expressions with KaTeX rendering
- **Responsive Design**: Mobile-friendly interface
- **Search & Filter**: Find essays by type, tags, or search terms

## Essay Organization

Essays are stored as individual markdown files in the `src/essays/` directory. Each essay includes:

- **Frontmatter**: YAML metadata (title, excerpt, date, type, tags)
- **Content**: Markdown content with support for math expressions

### Adding New Essays

1. **Using the script** (recommended):
   ```bash
   node scripts/create-essay.js my-new-essay
   ```

2. **Manual creation**:
   - Create a new `.md` file in `src/essays/`
   - Add frontmatter metadata
   - Write your content in markdown

### Essay Frontmatter Format

```yaml
---
title: "Your Essay Title"
excerpt: "Brief description of your essay"
date: "YYYY-MM-DD"
type: "technical|personal"
tags: ["tag1", "tag2", "tag3"]
---
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Tech Stack

- **React 19**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **React Router**: Client-side routing
- **React Markdown**: Markdown rendering
- **KaTeX**: Math expression rendering
- **Gray Matter**: Frontmatter parsing

## Project Structure

```
src/
├── components/     # Reusable React components
├── contexts/       # React contexts (theme)
├── essays/         # Individual essay markdown files
├── pages/          # Page components
├── utils/          # Utility functions
└── assets/         # Static assets
```

## Deployment

The site is deployed to GitHub Pages. The `deploy` script builds the project and pushes it to the `gh-pages` branch.
