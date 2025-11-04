# Agent Guidelines for ParlayPal

## Build/Lint/Test Commands

### Monorepo Commands (from root)
- `pnpm build` - Build all apps
- `pnpm check-types` - Type check all apps
- `pnpm dev` - Start all dev servers
- `pnpm dev:web` - Start web dev server
- `pnpm dev:native` - Start native dev server

### Server App (apps/server)
- `pnpm test` - Run all tests with Japa
- `pnpm lint` - Lint with ESLint (AdonisJS config)
- `pnpm typecheck` - TypeScript type checking
- `pnpm format` - Format with Prettier

### Web App (apps/web)
- `pnpm build` - Next.js production build

### Native App (apps/native)
- `pnpm dev` - Start Expo dev server

## Code Style Guidelines

### TypeScript Configuration
- Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`
- Target ESNext, module ESNext
- Isolated modules, no unchecked indexed access

### Formatting
- 2-space indentation
- LF line endings, UTF-8 charset
- Trim trailing whitespace, insert final newlines

### Imports
- Server: Use `#` aliases (e.g., `#models/*`, `#controllers/*`)
- Web: Use `@/` alias for src directory
- Native: Standard relative imports

### Naming Conventions
- Variables/functions: camelCase
- Components/classes: PascalCase
- Files: kebab-case for components, camelCase for utilities

### Error Handling
- Follow AdonisJS patterns for server-side error handling
- Use try/catch blocks appropriately
- Leverage framework-specific error boundaries

### Additional Rules
- No comments unless explicitly requested
- Follow existing patterns in each app directory
- Use TypeScript interfaces/types for complex objects
- Prefer functional components in React apps