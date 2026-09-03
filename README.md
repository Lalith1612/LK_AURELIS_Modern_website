Deployment Link (https://lk-aurelis-1612.vercel.app/)

LK AURELIS

The road, redefined.

LK AURELIS is a cinematic, premium automotive concept website created
for a fictional electric grand tourer brand. The experience is built
around a dark-luxury visual language: sculptural automotive imagery,
restrained typography, cinematic motion, an interactive vehicle
configurator, and a Digital Concierge.

Concept / Portfolio Project

AURELIS is a fictional automotive concept. The vehicle specifications,
pricing, branding, and product experience are part of this creative
project and do not represent a real production vehicle or commercial
offering.

Overview

The LK AURELIS website is designed to feel less like a conventional
automotive landing page and more like a digital luxury showroom.

The visual direction follows three principles:

Luxury first

Technology second

Cinematic, but restrained

The experience covers the vehicle story, design, specifications,
charging, range, configuration, AI assistance, PDF generation, and
enquiry journey.

First Light --- Cinematic Opening

The website opens with a 5.2-second cinematic sequence:

Near-black studio environment

Architectural vehicle silhouette emerges

Softbox lighting sweeps across the vehicle

LK AURELIS · 2026 appears

AURELIS and The road, redefined. emerge

The cinematic vehicle transitions into the main Hero vehicle

Typography and vehicle settle into the actual Hero layout

The sequence supports:

Skip Intro

Escape to bypass

Mouse and trackpad interaction without accidental dismissal

Reduced-motion accessibility behavior

The active cinematic implementation lives in the main Hero component.

Vehicle Concept

Specification                       Concept Figure

Starting Price                       $185,000
Power                          620 kW / 831 hp
WLTP Range                              720 km
0--100 km/h                              3.4 s
Top Speed                             260 km/h
Electrical Architecture                   800V
DC Fast Charging            18 min --- 10--80%
AC Charging                              22 kW

These are fictional concept specifications.

Interactive Configurator

AURELIS includes a five-stage vehicle configurator with dynamic pricing:

Exterior

Wheels

Interior

Details

Summary

Wheels

Option                Price

Aero 21                +$0
Performance 22     +$6,500
Forged 22          +$9,500

Interior

Option             Price

Noir                +$0
Ivory           +$4,500
Performance     +$8,500

Details

Option           Price

Signature         +$0
Nightfall     +$3,500
Executive     +$7,500

The base configuration starts at $185,000.

The configurator includes:

Dynamic pricing

Configuration persistence

Configuration IDs

Shareable configuration URLs

Summary generation

PDF generation

Enquiry flow

Pricing data is maintained in:

src/data/configuratorData.js

Digital Concierge

The website includes a server-side AI Digital Concierge for
conversational product assistance.

It supports:

Product questions

Vehicle specifications

Configuration guidance

Conversational context

Action/deep links

Streaming responses

The API endpoint is:

/api/concierge

AI credentials remain server-side and are never exposed in the client
bundle.

Environment Variables

Use a local .env file for credentials and never commit it.

Example:

GEMINI_API_KEY=your_api_key_here

Only placeholders should appear in committed example files.

Technology Stack

React

Vite

JavaScript / JSX

CSS

GSAP

ScrollTrigger

Server-side Gemini integration

Server-Sent Events (SSE)

PDF generation

html2canvas

Vercel

GitHub

Project Structure

LK_AURELIS_WEBSITE/
├── public/
│   └── assets/
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── Hero.jsx
│   │   └── ...
│   ├── data/
│   │   └── configuratorData.js
│   ├── App.jsx
│   ├── styles.css
│   └── ...
├── api/
│   └── concierge/
├── .gitignore
├── package.json
├── vite.config.js
└── README.md

Getting Started

Prerequisites

Node.js

npm

Git

Clone

git clone https://github.com/Lalith1612/LK_AURELIS_WEBSITE.git
cd LK_AURELIS_WEBSITE

Install

npm install

Configure Environment

Create a local .env file for required server-side credentials.

GEMINI_API_KEY=your_api_key_here

Never commit real credentials.

Development

npm run dev

Production Build

npm run build

The production output is generated in:

dist/

Local Production Preview

npx vite preview --port 4173

Deployment

The project is deployed through Vercel from the GitHub repository.

The production build command is:

node node_modules/vite/bin/vite.js build

This command is intentional: the project previously encountered Linux
executable-permission issues when node_modules artifacts were tracked
by Git. node_modules/ is now excluded from version control.

Recommended workflow:

Local changes
     ↓
git diff --check
     ↓
npm run build
     ↓
git commit
     ↓
git push origin main
     ↓
Vercel deployment

Asset Handling

The First Light silhouette is imported through Vite:

import silhouetteImg from '../assets/images/aurelis-ext-front.jpg'

This allows Vite to fingerprint and bundle the asset into production.

Avoid hard-coded source paths such as:

/src/assets/...

for assets that need to be bundled by Vite.

The main Hero vehicle is served from:

public/assets/aurelis-hero.jpg

Accessibility

The cinematic opening respects the user's motion preference.

When:

window.matchMedia('(prefers-reduced-motion: reduce)').matches

returns true, the cinematic introduction is bypassed.

This is intentional accessibility behavior.

When testing First Light, make sure the operating system and browser are
not configured to request reduced motion.

Design Direction

AURELIS intentionally avoids generic technology or SaaS aesthetics.

Core Visual Language

Dark architectural studio environments

Graphite and satin metallic surfaces

Thin horizontal lighting

Sculptural automotive forms

Architectural wheels

Glass canopy

Subtle LK branding

Warm/cool cinematic contrast

Editorial typography

Generous negative space

The guiding principle is:

Luxury first --- technology second --- cinematic but restrained.

Engineering Notes

Keep node_modules/ out of Git.

Keep dist/ out of Git.

Keep .env and local environment files out of Git.

Use Vite imports for assets inside src/.

Keep API credentials server-side.

Run a production build before deployment.

Avoid duplicating major interactive experiences.

Useful checks:

git status
git diff --check
npm run build

First Light Implementation

The active cinematic implementation is in:

src/components/Hero.jsx

Supporting styles are in:

src/styles.css

The production silhouette source asset is:

src/assets/images/aurelis-ext-front.jpg

The main Hero vehicle asset is:

public/assets/aurelis-hero.jpg

An older standalone CinematicOpening.jsx component may remain in the
filesystem/history, but it is not the active First Light implementation.

Project Philosophy

AURELIS is built around one idea:

A premium digital automotive experience should feel like entering
the vehicle, not reading about it.

Every interaction is intended to reinforce the character of the vehicle:

quiet confidence, precision, atmosphere, and motion.

Status

Project: LK AURELIS
Type: Fictional premium EV grand tourer concept website
Stage: Interactive website / portfolio concept
Deployment: Vercel
Primary stack: React + Vite + GSAP
AI: Server-side Digital Concierge

License

This is a personal creative/portfolio concept.

The AURELIS name, fictional vehicle specifications, visual identity,
product concepts, and associated creative assets are intended for this
project and should not be interpreted as representing a real automotive
manufacturer or production vehicle.

Unless otherwise stated, source code and original project assets are not
licensed for commercial redistribution.

Author

Lalith Kumar

Built as an exploration of premium automotive web design, cinematic
interaction, AI-assisted product experiences, and modern frontend
engineering.
