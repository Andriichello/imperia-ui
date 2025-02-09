import { daisyui } from '../tailwind.config.js' 

export class ThemeConfig {
    /** Local storage key name */
    public static storage = 'data-theme';
    /** HTML element attribute name */
    public static attribute = 'data-theme';

    /** List of available themes */
    public static list(): string[] {
        return daisyui.themes.map((theme) => {
            if (typeof theme === 'string') {
                return theme;
            } else if (typeof theme === 'object') {
                return Object.keys(theme);
            }
        }).flat();
    } 
    /** Dark theme name */
    public static dark(): string {
        return daisyui.darkTheme;
    }
    /** Default theme */
    public static default(): string {
        return this.list()[0];
    }
}

export class RestaurantConfig {
    /** Local storage key name */
    public static storage = 'selected-restaurant';
}