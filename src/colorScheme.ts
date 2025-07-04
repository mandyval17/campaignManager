/**
 * Color scheme object containing four main colors: primary, secondary, accent, and background.
 * Each color object has a main key and a range of 100 to 900 with increasing darkness.
 * @typedef {Object} ColorScheme
 * @property {Object} PRIMARY - primary color object
 * @property {Object} SECONDARY - secondary color object
 * @property {Object} ACCENT - accent color object
 * @property {Object} BACKGROUND - background color object
 * @property {Object} NEUTRAL - neutral color object
 */
export const COLOR_SCHEME = {
  /**
   * Primary color [FIRE BRICK]
   * @type {Object}
   */
  "PRIMARY": {
    "main": "#B31724", // fire_brick
    "100": "#240507",
    "200": "#48090f",
    "300": "#6c0e16",
    "400": "#90131d",
    "500": "#b31724",
    "600": "#e32636",
    "700": "#ea5d68",
    "800": "#f1939b",
    "900": "#f8c9cd"
  },
  /**
   * Secondary color [Raisin Black]
   * @type {Object}
   */
  "SECONDARY": {
    "main": "#2A1F20", // raisin_black
    "100": "#080606",
    "200": "#100c0c",
    "300": "#191213",
    "400": "#211819",
    "500": "#2a1f20",
    "600": "#5b4446",
    "700": "#8e696c",
    "800": "#b49a9c",
    "900": "#dacdce"
  },
  /**
   * Accent color [Mint Cream]
   * @type {Object}
   */
  "ACCENT": {
    "main": "#F7FCF6", // mint_cream
    "100": "#214b19",
    "200": "#439632",
    "300": "#73ca61",
    "400": "#b6e3ac",
    "500": "#f7fcf6",
    "600": "#fafdf9",
    "700": "#fbfdfa",
    "800": "#fcfefc",
    "900": "#fefefd"
  },
  /**
   * Background color [Baby Powder]
   * @type {Object}
   */
  "BACKGROUND": {
    "main": "#FDFDFB", // baby_powder
    "100": "#434322",
    "200": "#868644",
    "300": "#baba75",
    "400": "#dbdbb8",
    "500": "#fdfdfb",
    "600": "#fefefc",
    "700": "#fefefd",
    "800": "#fefefe",
    "900": "#fffffe"
  },
  /**
   * Neutral color [SILVER]
   * @type {Object}
   */
  "NEUTRAL": {
    "main": "#AEADAD", // silver
    "100": "#232222",
    "200": "#464545",
    "300": "#696767",
    "400": "#8c8a8a",
    "500": "#aeadad",
    "600": "#bebdbd",
    "700": "#cfcece",
    "800": "#dfdede",
    "900": "#efefef"
  }

}

export const COLORS = {
  BUTTONS: {
    // Neutral/Destructive Actions
    CANCEL: {
      BG: "#2A1F20", // Dark neutral (cancel/close)
      TEXT: "#F7FCF6",
    },
    DELETE: {
      BG: "#7A0E16", // Darker red (destructive)
      TEXT: "#F7FCF6",
    },
    REJECT: {
      BG: "#7A0E16", // Darker red (destructive)
      TEXT: "#F7FCF6",
    },

    // Primary Actions (aligned with logo)
    SUBMIT: {
      BG: "#9F1821", // Your logo color (primary action)
      TEXT: "#F7FCF6",
    },
    SAVE: {
      BG: "#9F1821", // Logo color (save)
      TEXT: "#F7FCF6",
    },
    ADD: {
      BG: "#543864", // Logo color (add)
      TEXT: "#F7FCF6",
    },

    // Positive Actions
    APPROVE: {
      BG: "#FFBB5C", // Green (positive action)
      TEXT: "#F7FCF6",
    },

    // File/Export Actions
    PDF: {
      BG: "#DA0037", // Lighter red variant (PDF = urgency)
      TEXT: "#F7FCF6",
    },
    EXCEL: {
      BG: "#217346", // Dark green (Excel association)
      TEXT: "#F7FCF6",
    },

    // Navigation
    BACK: {
      BG: "#2A1F20", // Dark neutral (navigation)
      TEXT: "#F7FCF6",
    },
    NEXT: {
      BG: "#9F1821", // Logo color (forward action)
      TEXT: "#F7FCF6",
    },
    PREV: {
      BG: "#2A1F20", // Dark neutral (backward action)
      TEXT: "#F7FCF6",
    },

    // Informational/Auxiliary Actions
    EDIT: {
      BG: "#2A5CAA", // Blue (editing = trust)
      TEXT: "#F7FCF6",
    },
    VIEW: {
      BG: "#6D4C41", // Muted brown (neutral/informational)
      TEXT: "#F7FCF6",
    },
    LINK: {
      BG: "#2A5CAA", // Blue (hyperlink association)
      TEXT: "#F7FCF6",
    },
    CLOSE: {
      BG: "#2A1F20", // Dark neutral
      TEXT: "#F7FCF6",
    },
  },
  BACKGROUND: {
    PRIMARY: "#9F1821", // Logo color
    SECONDARY: "#2A1F20", // Dark neutral
    ACCENT: "#F7FCF6", // Light accent
    NEUTRAL: "#AEADAD", // Gray
  },
  TEXT: {
    PRIMARY: "#9F1821", // Logo color
    SECONDARY: "#2A1F20", // Dark neutral
    ACCENT: "#F7FCF6", // Light text
    NEUTRAL: "#AEADAD", // Gray text
  },
  PIE_CHARTS: ["#ed7d31", "#ffc000", "#00b050", "#ff0000"],
};

export type TCOLORS = typeof COLORS
