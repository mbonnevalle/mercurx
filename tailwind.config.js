const theme = require("./src/theme.json");

let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.fonts.font_size.scale);
let h6 = font_scale;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
if (theme.fonts.font_family.primary) {
  fontPrimary = theme.fonts.font_family.primary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;.]+/gi, "");
  fontPrimaryType = theme.fonts.font_family.primary_type;
}
if (theme.fonts.font_family.secondary) {
  fontSecondary = theme.fonts.font_family.secondary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;.]+/gi, "");
  fontSecondaryType = theme.fonts.font_family.secondary_type;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.html",
    "./src/partials/**/*.html",
    "./src/scripts/**/*.js",
  ],
  safelist: [{ pattern: /^swiper-/ }],

  theme: {
    screens: {
      xs: "480px",
      sm: "575px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        text: theme.colors.default.text_color.default,
        dark: theme.colors.default.text_color.dark,
        primary: theme.colors.default.theme_color.primary,
        secondary: theme.colors.default.theme_color.secondary,
        tertiary: theme.colors.default.theme_color.tertiary,
        body: theme.colors.default.theme_color.body,
        border: theme.colors.default.theme_color.border,
        "theme-light": theme.colors.default.theme_color.theme_light,
        shadow: theme.colors.default.theme_color.shadow,
      },
      fontSize: {
        sm: ["14px", 1.8],
        base: font_base + "px",
        "base-sm": font_base * 0.8 + "px",
        h1: h1 + "rem",
        "h1-sm": h1 * 0.9 + "rem",
        h2: h2 + "rem",
        "h2-sm": h2 * 0.9 + "rem",
        h3: h3 + "rem",
        "h3-sm": h3 * 0.9 + "rem",
        h4: h4 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
      },
      boxShadow: {
        inset: `inset 0 -10px 40px ${theme.colors.default.theme_color.shadow}`,
        "inset-sm": `inset 0 2px 6px ${theme.colors.default.theme_color.shadow}`,
      },
      backgroundImage: {
        "secondary-gradient":
          "linear-gradient(90deg, rgba(51, 70, 121, 0.3) 0%, rgba(16, 22, 54, 0.3) 100%)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({
      generateContainer: false,
      gridGutterWidth: "2rem",
      gridGutters: {
        0: "0rem",
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
        6: "4rem",
      },
    }),
  ],
};
