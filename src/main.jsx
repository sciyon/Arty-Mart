// Main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider  } from './backend/middleware/authContext.jsx';
import { ToastProvider } from './toastcontext.jsx';
import {Cloudinary} from "@cloudinary/url-gen";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // Corrected URI
  cache: new InMemoryCache(),
});

const cld = new Cloudinary({cloud: {cloudName: 'dyqbjfpka'}});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ToastProvider>
    <AuthProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
      </BrowserRouter>
    </AuthProvider>
  </ToastProvider>,
);
