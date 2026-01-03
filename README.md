# 🎮 Game Developer Portfolio

A professional, visually striking portfolio website for game developers built with **Astro + Svelte**. Features a dark cyberpunk-inspired design with neon accents, perfect for showcasing your games, achievements, and CV.

![Portfolio Preview](./public/images/preview.png)

## ✨ Features

- **Games Showcase** - Blog-like entries for all your games with images, tags, and links
- **Achievements Section** - Highlight your game jam wins and milestones
- **Professional CV Page** - Printable CV with skills, experience, and education
- **Responsive Design** - Looks great on desktop, tablet, and mobile
- **GitHub Pages Ready** - Easy deployment with included workflow
- **Fast & SEO Friendly** - Astro's static site generation for optimal performance
- **Dark Cyberpunk Theme** - Distinctive neon aesthetic that stands out

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone or download the project
cd gamedev-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## 📁 Project Structure

```
gamedev-portfolio/
├── src/
│   ├── components/       # Svelte components
│   │   ├── Navigation.svelte
│   │   ├── Hero.svelte
│   │   ├── GameCard.svelte
│   │   ├── AchievementCard.svelte
│   │   └── Footer.svelte
│   ├── content/          # Markdown content
│   │   ├── games/        # Game entries
│   │   └── achievements/ # Achievement entries
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   │   ├── index.astro
│   │   ├── cv.astro
│   │   └── games/[slug].astro
│   └── styles/           # Global styles
├── public/               # Static assets
│   └── images/
├── .github/workflows/    # GitHub Actions
└── astro.config.mjs      # Astro configuration
```

## 📝 Adding Content

### Adding a New Game

Create a new `.md` file in `src/content/games/`:

```markdown
---
title: "Your Game Title"
description: "A brief description of your game"
date: "2024-01"
tags: ["Unity", "C#", "2D"]
image: "/images/games/your-game.png"
playUrl: "https://itch.io/your-game"
sourceUrl: "https://github.com/you/your-game"
jam: "Game Jam Name"  # Optional
featured: true        # Optional
---

## About This Game

Write detailed information about your game here...
```

### Adding an Achievement

Create a new `.md` file in `src/content/achievements/`:

```markdown
---
title: "1st Place - Category"
event: "Game Jam 2024"
date: "2024-01"
description: "Brief description of the achievement"
type: "winner"  # or "honorable mention", "finalist", etc.
icon: "trophy"  # trophy, medal, star, or award
url: "https://link-to-results"
---
```

## 🎨 Customization

### Personal Information

1. **Hero Section**: Edit `src/components/Hero.svelte` to update your stats and terminal display
2. **About Section**: Modify the about content in `src/pages/index.astro`
3. **CV Page**: Update `src/pages/cv.astro` with your experience and education
4. **Footer**: Edit `src/components/Footer.svelte` with your social links

### Colors & Theme

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --accent-primary: #00ff88;    /* Main accent color */
  --accent-secondary: #ff3366;  /* Secondary accent */
  --accent-tertiary: #00d4ff;   /* Tertiary accent */
  --accent-yellow: #ffcc00;     /* Winner/highlight color */
  /* ... */
}
```

### Adding Images

Place images in `public/images/`:
- Game screenshots: `public/images/games/`
- Profile photo: `public/images/profile.jpg`

## 🚢 Deployment to GitHub Pages

### Setup

1. Update `astro.config.mjs`:
   ```js
   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/your-repo-name',
     // ...
   });
   ```

2. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: GitHub Actions

The included workflow will automatically build and deploy your site on every push to `main`.

## 🛠️ Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Credits

Built with:
- [Astro](https://astro.build/)
- [Svelte](https://svelte.dev/)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- [Outfit Font](https://fonts.google.com/specimen/Outfit)
