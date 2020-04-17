// ===============================================
export const colors = {
    // Neutral Colors
    white: '#FFF',
    light: '#EEF0F4',
    medium: '#757E91',
    dark: '#333844',
    black: '#000',

    // Colors
    gold: "#B69D60",
    red: "#EF476F",
    green: "#06D6A0"
};

// ===============================================
export const theme = {
    global: {
        // Breakpoints
        breakpoints: {
            xsmall: {
                value: 500
            },
            small: {
                value: 950
            },
            medium: {
                value: 1200
            },
            middle: {
                value: 1500
            },
            large: {
                value: 2000
            }
        },

        // Colors
        colors: colors,

        // Fonts
        font: {
            family: 'Cardenio Modern',
            size: '18px',
            height: '20px'
        },
    },
    box: {
        extend: "box-shadow: none;"
    }
};
