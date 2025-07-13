# CLAUDE.md

必ず日本語で答えてください。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

This is a Next.js 13 TypeScript application for NFL roster management with the following structure:

### Core Architecture
- **Framework**: Next.js 13 with TypeScript
- **Styling**: SCSS modules + Material-UI components
- **Data Fetching**: Custom fetch functions with static generation
- **State Management**: React hooks (useState, useCallback)

### Directory Structure
- `/components/` - Reusable UI components (TeamTabs, PlayerCard, EditDialog, etc.)
- `/pages/` - Next.js pages with `/roster/` as main feature
- `/lib/` - Data fetching utilities (rosterFetch.ts)
- `/types/` - TypeScript interfaces for domain models and API responses
- `/styles/` - SCSS modules organized by pages/components/layouts
- `/data/` - Static JSON data (team.json)
- `/public/logos/` - NFL team logo assets

### Key Domain Models
- `IRosterDomain` - Complete roster data with player, team, position relationships
- `IEditRosterDomain` - Separate interface for roster editing operations
- `IPlayerDomain` - Player information including physical stats and draft data
- `ITeamDomain` - Team data with conference/area classifications

### Data Flow
- API calls use `fetchSearchedRoster()` from `/lib/rosterFetch.ts`
- Backend API expected at `http://localhost/api/players/info`
- Uses query parameters: season, team_id for filtering
- Static generation via `getStaticProps` for initial data

### Component Patterns
- Table-based desktop view with expandable rows
- Card-based mobile responsive design
- Edit dialog with form validation
- Team selection via tabs with conference toggle
- Radio buttons for offense/defense filtering

### Styling System
- Uses `@/` alias for absolute imports
- SCSS variables in `_variables.scss`
- Component-specific modules in `/styles/components/`
- Responsive breakpoints: 'sm' (table) and 'md' (cards)
- Material-UI integration with custom styling

### Current Development Focus
The application appears to be in active development of roster editing functionality, with incomplete edit dialog implementation and form validation systems.