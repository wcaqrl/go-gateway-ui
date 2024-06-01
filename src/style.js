import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        --theme: #1890ff;
        --dominant: #FBB634;
        --copigment: #E28D32;
        --accent: #A14D22;
    }
    .show {
        display: block !important;
    }
    .hide {
        display: none !important;
    }
`;



