import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '@/store/provider/ReduxProvider';


export const metadata: Metadata = {
  title: {
    default: "Blank Basic",
    template: "Blank Basic | %s",
  },
  description: "Your trusted source for customizable blank clothing",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Blank Basic",
    description: "Your trusted source for customizable blank clothing",
    // url: "https://subsdrop.com",
    siteName: "Blank Basic",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Blank Basic",
    title: "Blank Basic",
    description: "Your trusted source for customizable blank clothing",
    images: ["/og-image.png"],
  },
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`text-primaryText`}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
