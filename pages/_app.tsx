import Layout from '@/layouts/layout'
// import '@/styles/globals.css'
import '@/styles/reset.scss'
import '@/styles/app.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
