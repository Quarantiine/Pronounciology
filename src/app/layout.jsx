import Head from "next/head";
import "./globals.css";

export const metadata = {
	title: "Pronounciology",
	description: "Pronounciology",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<link type="image/png" rel="icon" href={"../images/speech_logo.png"} />
			</Head>
			<body className="">{children}</body>
		</html>
	);
}
