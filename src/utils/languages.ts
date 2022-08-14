const languages = [
  "plaintext",
  "html",
  "css",
  "java",
  "javascript",
  "typescript",
  "python",
  "rust",
  "c",
  "cpp",
  "csharp",
  "php",
  "swift",
  "kotlin",
] as const;

export type Language = typeof languages[number];

export default languages;
