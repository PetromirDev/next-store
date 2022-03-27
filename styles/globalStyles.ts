import { createGlobalStyle } from 'styled-components';
// Types
import { ThemeType } from '../types/User';
 
const GlobalStyle = createGlobalStyle<{theme: ThemeType}>`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: "Roboto", sans-serif;
        font-size: 1em;
        background-color: ${props => props.theme.bgPrimary};
    }

    input {
        font-size: 1em;
        background-color: #fff;
        border: 1px solid #DDDDDD;
        font-weight: 300;
        placeholder-color: rgba(0, 0, 0, 0.38);
        color: rgba(0, 0, 0, 0.6);
    }

    input:focus {
        outline:none;
    }

    a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }

    button {
        border: none;
    }

    svg{
        cursor: pointer;
    }

    button, a {
        cursor: pointer;
    }

    input, button, select {
        border-radius: 5px;
        font-family: "Roboto", sans-serif;
    }

    * {
        margin: 0;
        box-sizing: border-box;
    }

    @media (max-width: 1440px) {
        html, body {
            font-size: .95em;   
        }
    }

    .pointer {cursor: pointer;}

    .bg-primary {background-color: ${props => props.theme.bgPrimary};}

    .bg-secondary {background-color: ${props => props.theme.bgSecondary};}

    .text-primary {color: ${props => props.theme.textPrimary};}

    .text-secondary {color: ${props => props.theme.textSecondary};}

    .text-tertiary {color: ${props => props.theme.textTertiary};}

    .border-primary {border-color: ${props => props.theme.borderPrimary};}

    .border-secondary {border-color: ${props => props.theme.borderSecondary};}

    .text-highlighted {color: ${props => props.theme.highlighted};}

    .bg-highlighted {background-color: ${props => props.theme.highlighted};}
`;
 
export default GlobalStyle;