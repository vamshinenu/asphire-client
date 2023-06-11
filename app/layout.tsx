import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Asphire",
		template: "%s | asphire.co",
	},
	description: "The Future Of Job Agency",
	openGraph: {
		title: "Asphire",
		description:
			"The Future Of Job Agency",
		url: "https://asphire.co",
		siteName: "asphire.co",
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		shortcut: "/favicon.png",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable].join(" ")}>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				{children}
			</body>
		</html>
	);
}
