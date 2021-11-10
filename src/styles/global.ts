import { createGlobalStyle } from "styled-components";
import imgbackgroud from "../assets/background.png";

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-shadow: border-box;
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
    background: #457b1b url(${imgbackgroud}) no-repeat 75% top ;
    
    -wekit-font-smoothing: antialiased;
}

body, input, textarea, select, button {
    font: 400 1rem "Roboto", sans-serif;
}

#root{
    max-width: 1350px;
    margin: 10px auto;
    padding: 3rem 2rem;
}

button{
    cursor: pointer;
}

a{
    color: inherit;
    text-decoration: none;
}
`;
