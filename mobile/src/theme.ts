import 'styled-components/native';

export const theme = {
    colors: {
        background: '#EBF3FC',
        primary: '#4A9EE8',
        surface: '#FFFFFF',
        text: '#111827',
        textMuted: '#6B7280',
    },
    fontSizes: {
        heading: 24,
        body: 15,
        button: 16,
    },
};

export type Theme = typeof theme;

declare module 'styled-components/native' {
    export interface DefaultTheme extends Theme {}
}
