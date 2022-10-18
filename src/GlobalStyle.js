import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    font-family: 'Stylish', sans-serif;
    background-color: radial-gradient(circle at 10% 50%, #1c92d2 0%, #f2fcfe 80%);;
  }
  input{
    font-family: 'Stylish', sans-serif;
  }
`;

export default GlobalStyle;
