import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { auth0clientId, auth0Domain } from './constants/api.ts'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain} clientId={auth0clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
      <GoogleOAuthProvider
        clientId='76252509575-d70u475q6dliihkakfll1mdse5qgcekc.apps.googleusercontent.com' >
        <Provider store={store}>

          <App />

        </Provider>
      </GoogleOAuthProvider>
    </Auth0Provider>
  </React.StrictMode>
)
