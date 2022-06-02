import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './Redux/store';

import { App } from './Components/App';
import { SnackbarProvider } from 'notistack';
import { Slide } from '@mui/material';

import * as serviceWorker from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      TransitionComponent={Slide}
      hideIconVariant
      preventDuplicate
      transitionDuration={{ exit: 200, enter: 200 }}
      autoHideDuration={3500}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
