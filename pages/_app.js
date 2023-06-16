import { useState } from 'react'

//css
import 'styles/@globals.css'

//atoms
import { RecoilRoot } from 'recoil'

//modules
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

//components
import Layout from 'public/Layout'

//
export default function MyApp({ Component, pageProps }) {
  const [client] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  )
}
