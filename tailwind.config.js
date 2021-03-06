const colors = require("tailwindcss/colors");
const { inset } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    './pages/**/*.tsx',
    './src/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    spacing: {
      px: "1px",
      0: "0",
      0.25: "0.25rem",
      0.5: "0.5rem",
      0.75: "0.75rem",
      1: "1rem",
      1.25: "1.25rem",
      1.5: "1.5rem",
      2: "2rem",
      2.5: "2.5rem",
      3: "3rem",
      3.5: "3.5rem",
      4: "4rem",
      5: "5rem",
      6: "6rem",
      7: "7rem",
      8: "8rem",
      9: "9rem",
      10: "10rem",
      11: "11rem",
      12: "12rem",
      14: "14rem",
      16: "16rem",
      20: "20rem",
      24: "24rem",
      28: "28rem",
      32: "32rem",
      36: "36rem",
      40: "40rem",
      44: "44rem",
    },
    sizes: {
      px: "1px",
      0: "0",
      0.25: "0.25rem",
      0.5: "0.5rem",
      0.75: "0.75rem",
      1: "1rem",
      1.25: "1.25rem",
      1.5: "1.5rem",
      2: "2rem",
      2.5: "2.5rem",
      3: "3rem",
      3.5: "3.5rem",
      4: "4rem",
      5: "5rem",
      6: "6rem",
      7: "7rem",
      8: "8rem",
      9: "9rem",
      10: "10rem",
      11: "11rem",
      12: "12rem",
      14: "14rem",
      16: "16rem",
      20: "20rem",
      24: "24rem",
      28: "28rem",
      32: "32rem",
      36: "36rem",
      40: "40rem",
      44: "44rem",
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      dark: "#222222",
      form: "#A5A1A1",
      fade: "#EFEDD8",
    }),
    colors: {
      primary: {
        base: "#9A9779",
        hover: "#807D64",
        fade: "#EFEDD8",
        neutral: "#F1F0EA",
      },
      royal: {
        base: "#455379",
        fade: "#CFD8EE",
        neutral: "#EBEDF3",
      },
      blood: {
        base: "#7C3305",
        fade: "#EFDACC",
        neutral: "#F3EEEC",
      },
      neutral: {
        0: "#222222",
        1: "#676363",
        2: "#A5A1A1",
        3: "#CACAC9",
        4: "#E9E9E9",
      },
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      title: ["Trajan Pro", "serif"],
      heading: ["Optima", "serif"],
      body: ["Gill Sans", "sans-serif"],
    },
    extend: {
        left: {
            timelineDesktop: "50%",
            timelineMobile: "10%"
        },
      inset: {
        mobile: "68px",
        desktop: "118px",
      },
      zIndex: {
        "-1": "-1",
        "-5": "-5",
        "-10": "-10",
      },
      boxShadow: {
        container:
          "0px -7px 15px -3px rgba(0, 0, 0, 0.1), 0px -4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
