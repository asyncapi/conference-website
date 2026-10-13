// Next.js compiles global stylesheets at build time but ships no ambient
// declaration for them, so TypeScript cannot resolve side-effect CSS imports.
declare module '*.css';
