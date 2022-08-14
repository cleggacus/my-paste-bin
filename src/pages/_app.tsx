import 'styles/globals/index.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'components/ThemeProvider'
import { getClientTheme, ThemeName } from 'utils/themer'
import { loggerLink } from "@trpc/client/links/loggerLink"
import { httpBatchLink } from "@trpc/client/links/httpBatchLink"
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { NextPage } from 'next/types'
import { withTRPC } from '@trpc/next'
import getConfig from 'next/config'
import { AppRouter } from 'server/routers/app'

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [clientTheme, setClientTheme] = useState<ThemeName>();

  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    setClientTheme(getClientTheme());
  }, []);

  if(clientTheme)
    return <ThemeProvider theme={clientTheme}>
      { 
        getLayout(<Component {...pageProps} />) 
      }
    </ThemeProvider>

  return <></>
}

const { APP_URL } = getConfig().publicRuntimeConfig;

export default withTRPC<AppRouter>({
  config ({ ctx }) {
    return {
      links: [
        loggerLink(),
        httpBatchLink({
          url: `${APP_URL}/api/trpc`
        })
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          }
        }
      },
      headers() {
        if(ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr": "1"
          }
        }

        return {};
      }
    };
  },
  ssr: true,
  responseMeta({ ctx, clientErrors }) {
    if (clientErrors.length) {
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      };
    }

    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    return {
      headers: {
        'cache-control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
      }
    };
  },
})(MyApp);