
# Educational Institute Features Directory

This directory is reserved for optional extensions and modular features. 

## The Feature Contract

1. **Isolation**: Features must live in their own subdirectory.
2. **Independence**: A feature must not depend on other features. 
3. **Core Integrity**: Never modify files inside the `/core` directory.
4. **Registration**: Features are activated only via `src/featureRegistry.ts`.
5. **Clean Exit**: Removing a feature's folder and its registry entry must leave the application in a fully functional, identical state to its original core version.

## Available Extension Slots

- **Public Routes**: Injected into `App.tsx` router.
- **Admin Dashboard Tabs**: Injected into the Sidebar and Content panels.
- **Home Page Sections**: Injected after the standard home content.
- **Footer Links**: Injected into a dedicated "Extra Resources" column.

## Development Workflow

1. Create `/features/my-new-feature/`.
2. Build components and logic within that folder.
3. Export an object adhering to the `Feature` interface.
4. Add your feature object to the array in `featureRegistry.ts`.
