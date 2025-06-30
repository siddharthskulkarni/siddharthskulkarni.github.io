#!/usr/bin/env node

/* eslint-env node */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const essaysDir = path.join(__dirname, '../src/essays');

function createEssay() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node create-essay.js <essay-id>');
    console.log('Example: node create-essay.js my-new-essay');
    process.exit(1);
  }

  const essayId = args[0];
  const filename = `${essayId}.md`;
  const filepath = path.join(essaysDir, filename);

  if (fs.existsSync(filepath)) {
    console.error(`Essay with ID "${essayId}" already exists!`);
    process.exit(1);
  }

  const today = new Date().toISOString().split('T')[0];
  
  const template = `---
title: "Your Essay Title"
excerpt: "Brief description of your essay"
date: "${today}"
type: "technical"
tags: ["tag1", "tag2"]
---

# Your Essay Title

Start writing your essay here...

## Section 1

Your content goes here.

## Section 2

More content...

## Conclusion

Wrap up your thoughts here.
`;

  fs.writeFileSync(filepath, template);
  console.log(`Created new essay: ${filename}`);
  console.log(`Edit the file at: ${filepath}`);
}

createEssay(); 