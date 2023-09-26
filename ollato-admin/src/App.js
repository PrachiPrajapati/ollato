import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

/* NPM-Packages */
import './App.css'
import { Provider } from 'react-redux'
/* Store-File */
import configureStore from './Reducers/store'
/* Components */
import RoutesFile from './Routes'
import { SnackbarProvider } from 'react-notistack'
import Fade from '@material-ui/core/Fade'
function App () {
  return (
    <>
      <Provider store={configureStore()} >
      <SnackbarProvider maxSnack={2} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      iconVariant={{
        success: '✅',
        error: '✖️',
        warning: '⚠️',
        info: 'ℹ️'
      }}
      TransitionComponent={Fade}
     >
          <div className="App">
          <BrowserRouter history={history}>
            <Suspense fallback={''}>
              <RoutesFile />
            </Suspense>
            </BrowserRouter>
        {/* <SignUp /> */}
        </div>
      </SnackbarProvider >
      </Provider>
    </>
  )
}

export default App
