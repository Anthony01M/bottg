import type { Metadata } from "next";
import localFont from "next/font/local";
import { TelegramSync } from "@/components/TelegramSync";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-context";
import { MobileNav } from "@/components/MobileNav";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<TelegramSync>
					<ThemeProvider>
						<LanguageProvider>
							<div className="min-h-screen">
								<div className={`${geistSans.variable} ${geistMono.variable} antialiased pb-24`}>{children}</div>
								<MobileNav />
							</div>
						</LanguageProvider>
					</ThemeProvider>
				</TelegramSync>
			</body>
		</html>
	);
}