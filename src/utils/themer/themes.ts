export type ThemeName = 'Light' | 'Dark';

export type ThemeValues = {
  "bg-1": string,
  "bg-2": string,
  "bg-3": string,

  "fg-1": string,
  "fg-2": string,

  "fg-err": string,

  "accent-bg-1": string,
  "accent-fg-1": string,

  "border-radius": string,
}

export type Themes = {
  [key in ThemeName]: ThemeValues
}

const themes: Themes = {
  Light: {
    "bg-1": "#ffffff",
    "bg-2": "#eeeeee",
    "bg-3": "#dddddd",

    "fg-1": "#000000",
    "fg-2": "#777777",

    "fg-err": "#ff0000",

    "accent-bg-1": "#1a73e8",
    "accent-fg-1": "#ffffff",

    "border-radius": "15px"
  },
  Dark: {
    "bg-1": "#000000",
    "bg-2": "#111111",
    "bg-3": "#222222",

    "fg-1": "#ffffff",
    "fg-2": "#aaaaaa",

    "fg-err": "#db5d5d",

    "accent-bg-1": "#85adef",
    "accent-fg-1": "#ffffff",

    "border-radius": "15px"
  },
}

export default themes;