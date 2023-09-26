import React, { useRef, useState, useEffect, Suspense } from 'react'

/* NPM-Packages */
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import {
  connect,
  //  useDispatch,
  useSelector
} from 'react-redux'
import './App.css'

/* Auth Action file */
// import { getDummyData } from './Actions/auth'

/* react-intl provider */
import { I18Provider, LOCALES } from './i18n'

/* react-intl property to show messages */
// import { FormattedMessage } from 'react-intl'

// Components
// import Login from './Views/auth/login'
// const Routes = React.lazy(() => import('./routes'))
import RoutesFile from './routes'
export const history = createBrowserHistory()
function App () {
  // const dispatch = useDispatch()
  const [data, setData] = useState([])
  const getData = useSelector(state => state.auth.data)
  const previousProps = useRef({ getData }).current
  // const getDataAPI = () => {
  //   dispatch(getDummyData())
  // }
  useEffect(() => {
    if (previousProps.getData !== getData) {
      if (getData !== null) {
        setData(getData)
      }
    }
    return () => {
      previousProps.getData = getData
    }
  }, [getData])
  console.log(data)
  return (
    <>
      <I18Provider locale={LOCALES.ENGLISH} >
       <BrowserRouter history={history}>
         <Suspense fallback={''}>
          <RoutesFile />
         </Suspense>
       </BrowserRouter>
      </I18Provider>
      {/* Toastify notiifcations */}
    </>
  )
}

export default connect()(App)
