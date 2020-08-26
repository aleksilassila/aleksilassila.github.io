const theme = {
    color: {
        black: "#000000",
        dark_gray: "#202020",
        gray: "#808080",
        light_gray: "#B0B0B0",
        white: "#FFFFFF",

        purple: "#971cd2",
    },

    text: "#231e3a",
    // text: "#d7d2ef",
    separators: "#00000033", // Will be set based on text color later
    backgroundGradient:
        // "linear-gradient(20deg, rgb(158 59 165), rgb(88 126 197))",
        "linear-gradient(20deg, hsl(296 47% 57% / 1) 0%, hsl(219 48% 50% / 1) 80%)",
    invertedIcons: false,
};

theme.separators = `${theme.text}33`;

export default theme;
