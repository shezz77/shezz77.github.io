# Spec: Interactive Office Portfolio

## Objective

Replace the portfolio landing experience with an interactive office for Shehzad Aslam. Visitors enter through a labelled office door, explore a zoomable office, and open grounded details for achievements, capabilities, leadership, and selected work.

## Tech Stack

React 19 with Vite. No new dependencies.

## Commands

- Build: `npm run build`
- Develop: `npm run dev -- --host 127.0.0.1`

## Project Structure

- `src/App.jsx`: scene state and app orchestration
- `src/components/OfficeDoor.jsx`: entrance interaction
- `src/components/OfficeRoom.jsx`: visual office and selectable content
- `src/components/DetailDialog.jsx`: accessible detail view
- `src/data.js`: resume-derived portfolio content
- `src/index.css`: responsive visual system

## Testing Strategy

The project has no automated test runner. Verify the production build and exercise the door, room objects, projects, zoom controls, Escape key, and back navigation in a real browser.

## Boundaries

- Always: preserve unrelated work, use resume facts, retain keyboard-accessible controls.
- Ask first: add dependencies or alter deployment/build configuration.
- Never: invent client results, remove unrelated portfolio content, or expose private data beyond the supplied resume.

## Success Criteria

- The entrance clearly identifies Shehzad Aslam and his position.
- A visitor can enter the office by mouse or keyboard.
- The office includes zoom, selectable achievements/skills/leadership items, and project cards.
- Selecting an object opens a readable detail dialog with resume-grounded content.
- The result is responsive and builds successfully.
