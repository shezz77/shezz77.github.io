# Implementation Plan: Interactive Office Portfolio

## Approach

Use a lightweight two-scene React experience: a hallway with an office door, followed by a stylized office whose wall objects and project cards open a single reusable detail dialog. Keep content separate from visual components so the resume facts remain auditable.

## Dependencies

`data.js` supplies the room and project data. `OfficeDoor` and `OfficeRoom` render independent scenes. `DetailDialog` consumes the currently selected item from `App`.

## Risk Controls

- Use native buttons for every interactive object.
- Keep the room as CSS illustration rather than a heavyweight canvas or 3D dependency.
- Test the keyboard and mobile flows in the browser after the production build.

## Checkpoints

1. Resume-derived data and the entrance render correctly.
2. Office objects, project cards, and dialog details function correctly.
3. Browser validation confirms responsive layout and no runtime errors.
