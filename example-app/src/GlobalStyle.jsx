import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}
	
	h1,h2,h3,h4 {
		margin-top: 0;
	}
	
	body {
		margin: 0;
		padding: 0;
		background-color: #000;
		color: #e3e3e3;
		font-family: sans-serif;
	}
`

export {
  GlobalStyle,
};
