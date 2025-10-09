# AI Technology Radar

A comprehensive Technology Radar application inspired by ThoughtWorks' Tech Radar, built with Astro, React, and shadcn/ui components.

## Features

- **4 Dimension Cards**: Display technologies across four categories:
  - Data Management
  - Languages
  - Infrastructure
  - Datastores

- **4 Rings System**: Each technology is categorized into one of four rings:
  - **Adopt**: Technologies with high confidence for production use
  - **Trial**: Technologies worth pursuing in projects that can handle the risk
  - **Assess**: Technologies worth exploring to understand their impact
  - **Hold**: Technologies not recommended for new projects

- **Change Indicators**: Visual indicators showing technology movement:
  - ↑ Moved up (green)
  - ↓ Moved down (red)
  - − No change (gray)

- **Collapsible Lists**: Each category card contains collapsible sections for each ring
- **Dynamic Routing**: Each technology entry has its own detailed page
- **Markdown Content**: Technology entries are managed as Markdown files with frontmatter

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   └── TechRadar.tsx    # Main radar component
│   ├── content/
│   │   ├── config.ts        # Content collection configuration
│   │   └── tech/            # Technology entry markdown files
│   │       ├── snowflake.md
│   │       ├── python.md
│   │       ├── kubernetes.md
│   │       └── ...
│   ├── data/
│   │   └── tech-radar.json  # Configuration for categories, rings, and entries
│   ├── pages/
│   │   ├── index.astro      # Main radar overview page
│   │   └── tech/
│   │       └── [...slug].astro  # Dynamic route for tech entries
│   ├── styles/
│   │   └── global.css       # Global styles with Tailwind
│   └── lib/
│       └── utils.ts         # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:4321`

## Adding New Technology Entries

### 1. Add Entry to Configuration

Edit `src/data/tech-radar.json` and add your entry to the `entries` array:

```json
{
  "id": "your-tech-id",
  "name": "Your Technology Name",
  "category": "data-management|languages|infrastructure|datastores",
  "ring": "adopt|trial|assess|hold",
  "changeIndicator": "up|down|same",
  "link": "/tech/your-tech-id"
}
```

### 2. Create Markdown File

Create a new file in `src/content/tech/your-tech-id.md`:

```markdown
---
name: "Your Technology Name"
category: "data-management"
ring: "adopt"
changeIndicator: "up"
description: "Brief description of the technology"
publishedDate: "2025-10-09"
---

# Your Technology Name

## Overview

Detailed overview of the technology...

## Why Adopt?

- Reason 1
- Reason 2
- Reason 3

## Use Cases

List of use cases...

## Recommendations

Your recommendations...
```

## Configuration

### Categories

Edit the `categories` array in `src/data/tech-radar.json` to modify or add categories.

### Rings

Edit the `rings` array in `src/data/tech-radar.json` to modify ring definitions. Each ring has:
- `id`: Unique identifier
- `name`: Display name
- `description`: Ring description
- `color`: Color theme (emerald, blue, amber, red)

## Building for Production

```bash
npm run build
```

The built site will be in the `dist/` directory.

## Technology Stack

- **Astro**: Static site framework
- **React**: UI component framework
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first CSS
- **shadcn/ui**: High-quality UI components
- **Radix UI**: Headless UI primitives

## Design Principles

1. **Clarity**: Information is organized clearly across four main categories
2. **Accessibility**: Collapsible sections prevent information overload
3. **Visual Hierarchy**: Color-coded rings and change indicators
4. **Navigation**: Easy navigation between overview and detailed pages
5. **Maintainability**: Markdown-based content for easy updates

## License

MIT

## Acknowledgments

Inspired by [ThoughtWorks Technology Radar](https://www.thoughtworks.com/radar)
