import { Auth } from "@supabase/auth-ui-react";
import { createClient } from "@supabase/supabase-js";
import supabase from "../../../config/db";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import router from "next/router";

const Login = () => {
    const user = useUser();

    const session = useSession();
    const supabase = useSupabaseClient();

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session]);

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={['google', 'facebook', 'twitter']} />
            </main>
        </>
    );
};

export default Login;
