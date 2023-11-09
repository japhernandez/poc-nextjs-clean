import '@/application/styles/globals.css'

import type {AppProps} from 'next/app'
import ReactModal from "react-modal";
import {QueryClient, QueryClientProvider} from "react-query";

ReactModal.setAppElement('#__next');

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </>
    );
}
