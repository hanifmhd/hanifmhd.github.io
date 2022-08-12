import { createGlobalStyle } from 'styled-components'
import InterRegular from '../assets/fonts/Inter-Regular.ttf'
import AvenirBook from '../assets/fonts/Avenir-Book.ttf'
import AvenirHeavy from '../assets/fonts/Avenir-Heavy.ttf'
import AvenirMedium from '../assets/fonts/Avenir-Medium.ttf'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  #app {
    display: flex;
    flex-direction: column;
    background-color: white;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4 {
    margin: 0;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Avenir-Heavy';
    src: url(${AvenirHeavy}) format('truetype');
  }

  @font-face {
    font-family: 'Avenir-Book';
    src: url(${AvenirBook}) format('truetype');
  }

  @font-face {
    font-family: 'Avenir-Medium';
    src: url(${AvenirMedium}) format('truetype');
  }

`

export default GlobalStyle
