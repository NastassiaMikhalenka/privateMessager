import {ChakraProvider} from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from "./theme";
import {ColorModeScript} from '@chakra-ui/react';
import {HashRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App/>
        </ChakraProvider>
    </React.StrictMode>
    </HashRouter>
);
