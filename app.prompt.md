# Project: Minimal Portfolio Website with Essays

## Overview
I want to create a minimalistic, clean personal portfolio website using modern web technologies (React-based). The site should feature a homepage, an essays section with filtering, and support for math equations in the essays.

## MVP Features

### 1. Home Page
- Displays name and a short bio.
- Shows a list/grid of latest work or projects (ideally 3-6 items).

### 2. Essays Section
- Dedicated page or tab to display essays (technical and non-technical).
- Support for filtering:
  - By tag (e.g., “math”, “finance”, “fiction”, “personal”, etc.)
  - By type (technical vs non-technical)
- Each essay should have:
  - Title
  - Date
  - Tags
  - Content body (with support for LaTeX/math rendering, code blocks, and rich text)

### 3. Essay Viewer
- Clean reading layout.
- Ability to render mathematical equations (LaTeX/MathJax or KaTeX).
- Syntax highlighting for code snippets.

## UI Preferences
- Clean, minimalistic, text-focused.
- Responsive design.
- Elegant typography and spacing using Verdana as the font.
- Soft color palette with dark/light mode toggle (optional).

## Tech Stack

### Frontend
- **React** (preferred: Next.js or Vite + React)
- **TailwindCSS** for styling (or styled-components if preferred)
- **Markdown + MDX** for essay content (Git-based)
- **KaTeX or MathJax** for rendering math
- **React Router or Next.js routing** for pages

### Backend (optional for MVP)
- Simple file-based content (Markdown/MDX) to start.

## Example References
- Clean UI like [paulgraham.com](https://paulgraham.com/)
- Modern minimalism like [rauchg.com](https://rauchg.com/)

## Output Requirements
- Responsive React app with routing.
- Markdown/MDX rendering for essays.
- Math rendering support.
- Easily maintainable folder structure.
