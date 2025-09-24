# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML website for ART Projekt s.r.o., a Slovak construction company. The website showcases their architectural and construction services with a modern, professional design.

## Project Structure

```
PS BUILDING/
├── index.html          # Main HTML file - single page application
├── style.css           # Complete CSS styling with responsive design
├── script.js           # JavaScript for interactive features
├── logo.png            # Company logo
└── sources/            # Image assets directory
    ├── 092_kopia.jpg   # Hero background image
    ├── DSC09498.jpg    # Project gallery image
    ├── P1010068.jpg    # Testimonial author image
    ├── P1010082.jpg    # Project gallery image
    ├── P1010122.jpg    # Project gallery image
    ├── compacta_24.jpg # Hero background image
    └── samoamix_klasik.jpg # About section image
```

## Development Commands

This is a static website with no build process. To develop:

1. **Local Development**: Open `index.html` directly in a web browser or use a local server
2. **Live Server**: Use any HTTP server (e.g., Python's `python -m http.server` or Node's `npx serve`)
3. **No Build/Lint/Test Commands**: This project uses vanilla HTML, CSS, and JavaScript

## Architecture & Key Features

### HTML Structure (`index.html`)
- Single-page application with semantic HTML5 structure
- Sections: Hero, About, Services, Gallery, Footer
- Responsive navigation with hamburger menu
- Contact information and business details integrated

### CSS Architecture (`style.css`)
- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Custom animations and transitions
- Utility classes and component-based styling
- Breakpoints: 768px (mobile), 480px (small mobile)

### JavaScript Features (`script.js`)
- Mobile navigation toggle
- Smooth scrolling navigation
- Hero image cycling (5-second intervals)
- Scroll progress indicator
- Services carousel with navigation controls
- Intersection Observer for scroll animations
- Counter animations for statistics
- Form validation for newsletter signup

## Key Components

### Navigation System
- Dual navbar system: transparent overlay and fixed navbar
- Smooth transitions based on scroll position
- Hamburger menu for mobile devices

### Hero Section
- Rotating background images
- Statistics display with animated counters
- Customer testimonial with rating system
- Call-to-action buttons

### Services Carousel
- Horizontal scrolling card layout
- Navigation controls (prev/next buttons)
- Responsive design (3 cards desktop, 1 card mobile)

### Gallery Grid
- 4-column grid layout (desktop)
- Single column on mobile
- Hover effects and image overlays

## Styling Conventions

- **Colors**: Primary orange (#c8652b), black (#000), white (#fff)
- **Typography**: Inter font family from Google Fonts
- **Naming**: BEM-like methodology for CSS classes
- **Responsive**: Mobile-first approach with progressive enhancement

## Contact Information

The website includes contact details for:
- Ing. Peter Horváth (+421 905 516 135)
- Ing. Tomáš Kalivoda (+421 905 335 892)  
- Ing. arch. Zuzana Horváthová (+421 908 544 987)
- Email: artprojekt@artprojekt.sk

## Content Language

All content is in Slovak language, targeting the Slovak construction market.