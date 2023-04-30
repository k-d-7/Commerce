import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { Provider } from "react-redux";
import store from "@/redux";
import Navbar from "@/components/navbar";
import supabase from "../../config/db";

export default function App({
    Component,
    pageProps,
}: AppProps<{
    initialSession: Session;
}>) {
    // const [supabase] = useState(() => createBrowserSupabaseClient());

    return (
        <div>
            <Provider store={store}>
                <SessionContextProvider
                    supabaseClient={supabase}
                    initialSession={pageProps.initialSession}
                >
                    <Navbar />
                    <Component {...pageProps} />
                </SessionContextProvider>
            </Provider>
        </div>
    );
}
