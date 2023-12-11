import Head from "next/head";
import "./globals.css";
import logo from "../../public/images/speech_logo.png";

export const metadata = {
	title: "Pronounciology",
	description: "Pronounciology",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<link type="image/png" rel="icon" href={logo} />
			</Head>
			<body className="">{children}</body>
		</html>
	);
}
