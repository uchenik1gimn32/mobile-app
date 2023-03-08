import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



html {
  scroll-behavior: smooth;
}

body {
  font-size:14px;
  font-family: "Nunito-Regular", "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  color: black;

}

#root {
  height: 100vh;
}


h1 {
  text-align: left;
    color: #151b2b;
    font-size: 26px;
}
h2{
  font-size: 21px;
}
h3{
font-size: 17px;
}

input[type='number'] {
  -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[readonly] {
  background-color:#f6f6f6;
}


`;
