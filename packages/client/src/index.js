import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from "./theme";
import {ColorModeScript} from '@chakra-ui/react';
import {HashRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HashRouter>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                <App/>
            </ChakraProvider>
        </HashRouter>
    </React.StrictMode>
);
