import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {ApolloProvider} from '@apollo/client/react';
import { client } from './client/client.js';
import { AuthContextProvider } from './context/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FilterContextProvider } from './context/FilterContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ApolloProvider client={client}>
        <FilterContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </FilterContextProvider>
      </ApolloProvider>
    </LocalizationProvider>
  </StrictMode>,
)
