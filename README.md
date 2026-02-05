<div align="center">
  <h1>Landscape UI Gallery</h1>
  <p>Neumorphic landscape UI with interactive controls and a selectable image gallery.</p>
  <p>
    <a href="https://astro.build"><img alt="Astro" src="https://img.shields.io/badge/Astro-5.17.1-FF5D01?logo=astro&logoColor=white"></a>
    <a href="https://react.dev"><img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white"></a>
    <a href="https://bun.sh"><img alt="Bun" src="https://img.shields.io/badge/Bun-1.x-000000?logo=bun&logoColor=white"></a>
    <img alt="Status" src="https://img.shields.io/badge/Status-Active-2ea44f">
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#features">Features</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#scripts">Scripts</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#customization">Customization</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## Features

- Real-photo landscape scene with mode-based visual filters
- Top bar multi-toggle modes (color, glow, overlays)
- Scene reset, display mode, and zoom slider
- Gallery with horizontal slider + show/hide
- Toast notifications for interaction feedback

## Tech Stack

- Astro 5
- React 18 (client components)
- Lucide icons
- Bun (package manager and scripts)

## Getting Started

### Prerequisites

- Bun installed (recommended)
- Node.js 18+ (if you prefer npm)

### Install

```sh
bun install
```

### Run locally

```sh
bun run dev
```

Open `http://localhost:4321`.

## Scripts

| Command            | Action                                   |
| :----------------- | :--------------------------------------- |
| `bun run dev`      | Start local dev server                   |
| `bun run build`    | Build production site to `./dist/`       |
| `bun run preview`  | Preview the production build             |
| `bun run astro --` | Run Astro CLI commands (e.g. `--help`)   |

## Project Structure

```text
/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── ...
├── astro.config.mjs
└── package.json
```

## Customization

- Update gallery images in `src/components/App.tsx`
- Adjust UI behavior in `src/components/TopBar.tsx` and `src/components/BottomBar.tsx`
- Change styling in `src/styles/global.css`

## Deployment

Build the static site and deploy the `dist/` folder.

```sh
bun run build
```

## License

MIT (update if different)
# astro-images-dashboard
