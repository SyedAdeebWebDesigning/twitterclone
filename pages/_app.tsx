import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps:{session, ...pageProps} }: any) {
	return (
		<>
			<SessionProvider session={session}>
				<Head>
					<title>Twitter Clone</title>
					<link rel="icon" href="/twitter.ico" />
				</Head>
				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
}

export default MyApp;
