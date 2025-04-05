# Broccoli and Co Registration Frontend

This is a frontend registration app for users to register using the `/fake-auth` api.

## Commands

Run in development mode:
`npm run dev`

Run tests (vitest):
`npm run test`

Run linting:
`npm run lint`

Build for production:
`npm run build`

Preview production build:
`npm run serve`

## Project structure

- index.html: application entrypoint
- src/: core react frontend code
  - components
    - request-invite: components for the request invite dialog and form
    - ui: reusable ui components. Radix + tailwind for styling. shadcn components are added here.
  - lib: utility functions
  - routes: frontend routes. TanStack router is used for routing
  - service: api calls

## Browser support

### JS

eslint-plugin-compat is used to check that the js can run on most modern browsers

### Stying

Tailwind supports

- Chrome 111 (released March 2023)
- Safari 16.4 (released March 2023)
- Firefox 128 (released July 2024)
