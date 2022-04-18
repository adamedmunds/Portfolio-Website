import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './Redux/store';

import { App } from './Components/App';
import { SnackbarProvider } from 'notistack';
import { Fade } from '@mui/material';

import * as serviceWorker from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      TransitionComponent={Fade}
      hideIconVariant
      preventDuplicate
      transitionDuration={{ exit: 200, enter: 200 }}
      autoHideDuration={8000}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
