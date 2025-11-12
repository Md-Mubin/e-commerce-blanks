import { Metadata } from 'next';

type MetaDataProps = {
	title: string;
	description: string;
	path?: string; // ex: /about
	image?: string;
};

export function generateSEOMetaData({
	title,
	description,
	path = '/',
	image,
}: MetaDataProps): Metadata {
	const fullUrl = `https://blanks-front.vercel.app${path}`;
	return {
		title,
		description,
		openGraph: {
			images: image,
			type: 'website',
			locale: 'en-US',
			url: fullUrl,
			siteName: 'Basic Blanks',
		},
		metadataBase: new URL('https://blanks-front.vercel.app'),
	};
}
