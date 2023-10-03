import Head from "next/head";
import "./globals.css";

export const metadata = {
	title: "Pronounciology",
	description: "",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<link rel="icon" href={"../app/favicon.ico"} />
			</Head>
			<body className="">{children}</body>
		</html>
	);
}
