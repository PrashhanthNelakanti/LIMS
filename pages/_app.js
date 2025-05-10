import '../styles/globals.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import allReducers from '../components/reducer'
import Layout from '../components/Layout'

// Configure Redux Persist
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, allReducers)

// Create store and persistor once
const store = createStore(persistedReducer)
const persistor = persistStore(store)

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
    )
}

export default MyApp
