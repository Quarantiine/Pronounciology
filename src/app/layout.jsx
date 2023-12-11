import "./globals.css";

export const metadata = {
	title: "Pronounciology",
	description: "Pronounciology",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link type="image/png" rel="icon" href={"../images/speech_logo.png"} />
			</head>
			<body className="">{children}</body>
		</html>
	);
}
