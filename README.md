# LK AURELIS

### The road, redefined.

> A cinematic digital experience for a fictional next-generation electric grand tourer.

LK AURELIS is a premium automotive website concept built around the idea of an electric grand tourer that combines sculptural design, long-distance performance, advanced technology, and an immersive digital experience.

The project is intentionally presented as a **fictional automotive concept** and is not an actual production vehicle.

---

## Live Website

**Production:** [https://lk-aurelis.vercel.app/](https://lk-aurelis-1612.vercel.app/)

---

## First Light

The AURELIS experience begins with **First Light** — a cinematic introduction designed to establish the character of the vehicle before the main website appears.

The visitor enters a dark architectural environment where the vehicle gradually emerges through light, shadow, silhouette, and typography.

```text
Near Darkness
      ↓
Vehicle Silhouette
      ↓
Light Sweep
      ↓
LK AURELIS · 2026
      ↓
AURELIS
      ↓
The road, redefined.
      ↓
Vehicle Reveal
      ↓
Hero Content
      ↓
Full Website
```

Rather than displaying a separate intro and then abruptly loading the homepage, First Light continuously morphs into the actual Hero experience.

### Cinematic Sequence

* Near-black opening
* Architectural vehicle silhouette
* Progressive lighting reveal
* AURELIS typography emergence
* Vehicle and typography movement
* Transition into the primary Hero composition
* Navigation and supporting content settle naturally
* Main website experience begins

The experience also respects the user's system-level reduced-motion preference.

---

# Design Philosophy

The core design principle is:

> **Luxury first — technology second — cinematic but restrained.**

AURELIS deliberately avoids the typical futuristic technology aesthetic of excessive neon, gradients, glowing interfaces, and generic SaaS-style layouts.

Instead, the visual language focuses on:

* Dark architectural environments
* Graphite and satin metallic surfaces
* Thin horizontal lighting
* Sculptural vehicle forms
* Large negative space
* Restrained typography
* Warm and cool cinematic lighting
* Architectural wheel designs
* Glass canopy surfaces
* Subtle LK branding
* Slow, intentional motion

The objective is to make the website feel closer to a **private automotive studio, luxury showroom, or automotive design film** than a conventional product website.

---

# Concept Vehicle

## LK AURELIS

A fictional electric grand tourer designed around effortless long-distance travel, performance, technology, and sculptural simplicity.

| Specification           |           Concept Figure |
| ----------------------- | -----------------------: |
| Starting Price          |             **$185,000** |
| Power                   |      **620 kW / 831 hp** |
| Range                   |          **720 km WLTP** |
| 0–100 km/h              |          **3.4 seconds** |
| Top Speed               |             **260 km/h** |
| Electrical Architecture |                 **800V** |
| DC Charging             | **10–80% in 18 minutes** |
| AC Charging             |                **22 kW** |

> **Note:** All vehicle specifications, pricing, range, performance figures, and charging figures are fictional concept figures created for this project.

---

# Website Experience

The website is structured as a digital automotive journey rather than a traditional product landing page.

```text
FIRST LIGHT
     ↓
HERO
     ↓
DESIGN
     ↓
PERFORMANCE
     ↓
RANGE & CHARGING
     ↓
INTERIOR
     ↓
TECHNOLOGY
     ↓
CRAFT
     ↓
CONFIGURATOR
     ↓
DIGITAL CONCIERGE
     ↓
ENQUIRY
```

Each part of the experience has a specific purpose:

### Identity

The Hero and First Light establish the visual identity of AURELIS.

### Desire

Design, proportions, materials, performance, and cinematic imagery create emotional engagement.

### Confidence

Technology, range, charging, and specifications provide product context.

### Personalisation

The configurator allows visitors to create their own AURELIS specification.

### Assistance

The Digital Concierge provides an interactive AI-powered product experience.

### Conversion

The enquiry flow provides a natural next step for visitors interested in the concept.

---

# Interactive Configurator

AURELIS includes a complete interactive vehicle configurator.

The experience is organized into five stages:

```text
01 — Exterior
02 — Wheels
03 — Interior
04 — Details
05 — Summary
```

## Exterior

The exterior stage establishes the vehicle's visual configuration and presentation.

---

## Wheels

Three wheel configurations are available.

| Wheel Configuration |    Price |
| ------------------- | -------: |
| Aero 21"            | Included |
| Performance 22"     |  +$6,500 |
| Forged 22"          |  +$9,500 |

---

## Interior

Three interior themes are available.

| Interior    |    Price |
| ----------- | -------: |
| Noir        | Included |
| Ivory       |  +$4,500 |
| Performance |  +$8,500 |

---

## Details

Three detail packages are available.

| Package   |    Price |
| --------- | -------: |
| Signature | Included |
| Nightfall |  +$3,500 |
| Executive |  +$7,500 |

---

## Configuration Summary

The final stage dynamically calculates the selected specification and total price.

The configurator supports:

* Dynamic pricing
* Configuration IDs
* Local storage persistence
* Shareable configuration URLs
* Configuration summaries
* PDF generation
* Enquiry flow

Configurator pricing data is centralized in:

```text
src/data/configuratorData.js
```

---

# Digital Concierge

The **Digital Concierge** is an AI-powered virtual product specialist built specifically around the AURELIS experience.

Instead of functioning as a generic chatbot, the Concierge is designed to understand the vehicle, its specifications, configuration system, and website experience.

It can assist with:

* Vehicle specifications
* Performance
* Range
* Charging
* Configuration
* Interior choices
* Design details
* Pricing
* Website navigation
* Configuration actions
* Relevant deep links

The Concierge maintains conversational context during a session and can provide action-oriented responses.

---

# AI Architecture

The Digital Concierge uses a server-side Gemini integration through:

```text
/api/concierge
```

The API key is not exposed to the browser.

```text
┌──────────────┐
│    Browser   │
└──────┬───────┘
       │
       ▼
┌────────────────────┐
│  /api/concierge    │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Server-side Gemini │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│   SSE Streaming    │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Digital Concierge  │
└────────────────────┘
```

### Characteristics

* Server-side API integration
* Streaming responses
* Conversational context
* Action/deep-link support
* No client-side API key exposure
* No persistent conversation storage

---

# Technology Stack

### Frontend

* React
* Vite
* JavaScript
* JSX
* CSS

### Animation

* GSAP
* ScrollTrigger

### Artificial Intelligence

* Google Gemini
* Server-side API integration
* Server-Sent Events (SSE)

### Deployment

* Vercel

### Development

* Node.js
* npm
* Git
* GitHub

---

# Project Structure

```text
LK_AURELIS_WEBSITE/
│
├── public/
│   └── assets/
│       └── ...
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── ...
│   │
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── CinematicOpening.jsx
│   │   └── ...
│   │
│   ├── data/
│   │   └── configuratorData.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── api/
│   └── concierge/
│       └── ...
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

---

## Clone the Repository

```bash
git clone https://github.com/Lalith1612/LK_AURELIS_WEBSITE.git
cd LK_AURELIS_WEBSITE
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

The Digital Concierge requires a Gemini API key.

Create a local environment file:

```text
.env
```

Add:

```env
GEMINI_API_KEY=your_api_key_here
```

### Security

**Never commit a real API key to GitHub.**

The repository should contain only placeholder values in example environment files.

For example:

```env
GEMINI_API_KEY=your_api_key_here
```

Your actual `.env` file should remain local and must be excluded from Git.

---

# Development

Start the development server:

```bash
npm run dev
```

Vite will start the local development environment and provide the local URL in the terminal.

---

# Production Build

Build the production version:

```bash
npm run build
```

The production output is generated inside:

```text
dist/
```

The project is configured to build successfully in the Vercel environment.

---

# Deployment

The website is deployed through Vercel.

```text
GitHub
   │
   ▼
main branch
   │
   ▼
Vercel
   │
   ▼
Production Build
   │
   ▼
LK AURELIS
```

Production deployments should be verified after changes involving:

* Hero experience
* First Light
* Animation timelines
* Asset paths
* API routes
* Environment variables
* Configurator logic

---

# Accessibility

Accessibility is considered throughout the cinematic experience.

## Reduced Motion

First Light respects the user's system-level:

```text
prefers-reduced-motion: reduce
```

preference.

When reduced motion is enabled, the cinematic introduction is bypassed so the visitor can access the main website without the extended animation sequence.

## Skip Controls

Visitors can also bypass First Light manually using:

* **Skip Intro**
* **Escape**

The skip transition is intentionally graceful rather than an immediate hard cut.

---

# Responsive Design

The website is designed to adapt across:

* Desktop
* Laptop
* Tablet
* Mobile

The responsive experience covers:

* Hero composition
* Vehicle imagery
* Typography
* Navigation
* Content sections
* Configurator
* Digital Concierge
* Interactive controls

The goal is to preserve the visual character of the AURELIS experience across different screen sizes rather than simply scaling down the desktop interface.

---

# Performance

The project uses large automotive imagery and cinematic animation, making asset handling and runtime performance important considerations.

Key implementation considerations include:

* Optimized asset delivery
* Production asset hashing
* Responsive image sizing
* Controlled animation timelines
* GPU-friendly transforms
* Avoiding unnecessary DOM duplication
* Lazy loading where appropriate
* Production build verification

Generated dependencies such as `node_modules` are intentionally excluded from the repository.

---

# First Light Implementation

The active production implementation of First Light lives inside:

```text
src/components/Hero.jsx
```

The cinematic experience uses layered elements including:

```text
.hero-section
.hero-cinematic-backdrop
.hero-car-reveal
.hero-cinematic-softbox
.hero-cinematic-progress
```

The experience is integrated directly into the Hero rather than functioning as an independent page.

This creates a continuous transition:

```text
First Light ───────────────────────► Hero
                   continuous morph
```

rather than:

```text
Intro ──► Page transition ──► Hero
```

This distinction is central to the intended experience.

---

# Vehicle Reveal

First Light uses a dedicated architectural silhouette asset during the initial vehicle reveal.

The silhouette is progressively revealed before transitioning into the canonical silver AURELIS hero vehicle imagery.

This prevents the final hero vehicle from appearing prematurely during the opening moments.

The production Vite build includes the required silhouette asset as part of the generated asset bundle.

---

# Configuration Persistence

The configurator uses browser local storage to preserve the visitor's selections.

A visitor can:

1. Configure the vehicle
2. Navigate through the website
3. Return to the configurator
4. Continue with the selected specification

Configuration IDs and shareable configuration URLs are also supported.

---

# Engineering Notes

## Single Configurator

The project intentionally uses **one primary vehicle configurator**.

The configurator follows:

```text
Exterior
   ↓
Wheels
   ↓
Interior
   ↓
Details
   ↓
Summary
```

A second independent configurator is not required.

---

## Centralized Pricing

Configurator pricing is maintained centrally instead of being scattered across individual UI components.

Primary data source:

```text
src/data/configuratorData.js
```

This makes future pricing changes easier to maintain and reduces the possibility of inconsistent totals.

---

## Cinematic Architecture

The current production First Light implementation is located in:

```text
src/components/Hero.jsx
```

A standalone component also exists:

```text
src/components/CinematicOpening.jsx
```

The standalone component is currently not mounted by the application.

The implementation inside `Hero.jsx` should therefore be treated as the active production source of truth for First Light.

---

# Repository Hygiene

The repository excludes generated, local, and sensitive files.

Important ignored paths include:

```text
node_modules/
dist/
.env
.env.local
.env.*.local
*.log
```

Dependencies should be installed using:

```bash
npm install
```

rather than committed into the repository.

This is particularly important for Linux-based deployment environments such as Vercel.

---

# Visual Language

The AURELIS visual system is built around a restrained luxury aesthetic.

## Materials

```text
Graphite
Satin Metal
Brushed Aluminium
Dark Glass
Carbon
Soft Black
```

## Lighting

```text
Architectural
Directional
Low-key
Warm / Cool contrast
Thin horizontal highlights
Soft reflections
```

## Typography

Typography is clean, editorial, and intentionally restrained.

The interface avoids excessive:

* Gradient text
* Neon effects
* Glow effects
* Rounded SaaS cards
* Generic dashboard components
* Excessive glassmorphism
* Unnecessary visual noise

The intended hierarchy is:

```text
Luxury
   ↓
Design
   ↓
Emotion
   ↓
Technology
```

---

# Experience Principles

The website follows several principles throughout its implementation.

### 01 — Form Before Data

The vehicle should be experienced visually before the visitor is presented with large amounts of technical information.

### 02 — Motion With Purpose

Animation should communicate transition, material, scale, or hierarchy.

Motion should never exist simply because an element can be animated.

### 03 — Technology Without Noise

Advanced technology is part of the AURELIS identity, but it should remain understated.

### 04 — One Continuous Experience

Sections should feel connected rather than behaving like unrelated pages.

### 05 — Luxury Through Restraint

The design relies on composition, typography, lighting, negative space, and material rather than excessive effects.

---

# Concept Disclaimer

**LK AURELIS is a fictional automotive concept and digital design project.**

The following are conceptual and created exclusively for this project:

* LK AURELIS branding
* Vehicle design
* Vehicle specifications
* Pricing
* Performance figures
* Range figures
* Charging figures
* Product claims
* Digital product experience

LK AURELIS should not be interpreted as an existing production vehicle or commercially available automotive product.

---

# Project Status

| Feature                        | Status        |
| ------------------------------ | ------------- |
| Cinematic First Light          | ✅ Implemented |
| Responsive Website             | ✅ Implemented |
| Vehicle Experience             | ✅ Implemented |
| Interactive Configurator       | ✅ Implemented |
| Dynamic Pricing                | ✅ Implemented |
| Configuration Persistence      | ✅ Implemented |
| Shareable Configurations       | ✅ Implemented |
| Configuration ID               | ✅ Implemented |
| PDF Generation                 | ✅ Implemented |
| Enquiry Flow                   | ✅ Implemented |
| Digital Concierge              | ✅ Implemented |
| Server-side Gemini Integration | ✅ Implemented |
| Streaming Responses            | ✅ Implemented |
| Reduced Motion Support         | ✅ Implemented |
| Vercel Deployment              | ✅ Implemented |

---

# Future Possibilities

Potential future improvements include:

* Expanded vehicle configuration options
* More detailed interior exploration
* Advanced 3D vehicle interaction
* Enhanced charging visualizations
* Additional Digital Concierge actions
* More cinematic transitions
* Mobile-specific interaction refinements
* Further image optimization
* Advanced vehicle material customization
* Performance profiling across lower-end devices

These are potential future directions rather than requirements for the current implementation.

---

# Philosophy

AURELIS is built around a simple idea:

> **An electric vehicle should not have to look like a piece of technology.**

The digital experience therefore treats the vehicle as a piece of design first.

Technology is present throughout the experience, but it remains deliberately understated.

The objective is not to overwhelm the visitor with information.

The objective is to make them want to keep looking.

---

# Author

## Lalith Kumar

Researcher · Developer · AI & Machine Learning

LK AURELIS is a personal automotive web experience and design/engineering project exploring the intersection of:

* Automotive design
* Frontend engineering
* Interaction design
* Motion design
* Artificial intelligence
* Generative experiences
* Premium digital product design

---

# License

This project is intended primarily as a personal portfolio and concept project.

The LK AURELIS brand, vehicle concept, visual identity, imagery, specifications, and fictional product information should not be represented as an official automotive product or commercial vehicle.

---

<div align="center">

## LK AURELIS

### The road, redefined.

**Luxury first. Technology second.**

</div>
