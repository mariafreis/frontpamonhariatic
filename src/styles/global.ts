import { createGlobalStyle } from "styled-components";
import imgbackgroud from "../assets/background.png";

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-shadow: 0px;
}


html{
    @media (max-width: 1080px){
        font-size: 93.75%;
    }
    
    @media (max-width: 720px){
        font-size: 87.5%;
    }
}

body{
    background:#dac435  url(${imgbackgroud}) no-repeat 85%  ;
    
    -wekit-font-smoothing: antialiased;
}

body, input, textarea, select, button {
    font: 400 1rem "Roboto", sans-serif;
}

#root{
    max-width: inherit;
    margin: 0px auto;
    padding: 0rem 0rem;
}

button{
    cursor: pointer;
}

a{
    color: inherit;
    text-decoration: none;
}
`;
