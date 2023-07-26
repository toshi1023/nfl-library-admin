import Layout from '@/layouts/layout'
// import '@/styles/globals.css'
import '@/styles/reset.scss'
import '@/styles/app.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
