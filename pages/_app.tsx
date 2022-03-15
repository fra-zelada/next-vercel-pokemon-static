import type { AppProps } from 'next/app'

import { NextUIProvider } from '@nextui-org/react';

import '../styles/globals.css'
import { darkTheme } from '../themes';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // const getLayout = Component.getLayout || ((page ) => page)
  return (
    <NextUIProvider theme={ darkTheme }>
      <Component {...pageProps} />
    </NextUIProvider>
  )
  // return getLayout(<Component {...pageProps} />)
}

export default MyApp
