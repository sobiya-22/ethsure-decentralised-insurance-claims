# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Tailwind CSS Setup

- Tailwind, PostCSS, and Autoprefixer are already listed as devDependencies in package.json.
- If you encounter errors running `npx tailwindcss init -p`, ensure your node_modules are up to date and try reinstalling dependencies.
- Tailwind directives (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`) have been added to `src/index.css`.
- If `tailwind.config.js` or `postcss.config.js` are missing, create them manually using the Tailwind docs as a reference.
