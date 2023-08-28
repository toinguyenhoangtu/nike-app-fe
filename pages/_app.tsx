import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header/Header'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>

  )
}
