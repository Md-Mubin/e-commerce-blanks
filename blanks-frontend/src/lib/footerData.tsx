'use client';
import { RiFacebookFill } from 'react-icons/ri';

import { SlSocialInstagram, SlSocialLinkedin } from 'react-icons/sl';
import { TfiTwitter } from 'react-icons/tfi';
import { MapPin, Phone, Mail } from 'lucide-react';
// Facebook, Instagram, Twitter, Linkedin

export const footerData = {
	companyInfo: {
		logo: '/logo.jpeg',
		address: 'Blankbasic 24 W 2nd Ave Vancouver, BC V5Y 1B3 1 604-424-9557',
	},
	sections: [
		{
			title: 'Navigate',
			links: [
				{ label: 'About Us', href: '/about-us' },
				{ label: 'Privacy Policy', href: '/privacy-policy' },
				{ label: 'Terms & Conditions', href: 'terms-conditions' },
			],
		},
	],
	categories: [
		{
			title: 'Categories',
			links: [
				{ label: 'T-Shirts', href: '/' },
				{ label: 'Sweatshirts & Hoodies', href: '/' },
				{ label: 'Polo Shirts', href: '/' },
				{ label: 'Shirts & Sweaters', href: '/' },
			],
		},
	],
	popularBarnds: [
		{
			title: 'Popular Brands',
			links: [
				{ label: 'Core 365', href: '/' },
				{ label: 'Harriton', href: '/' },
				{ label: 'Devon & Jones', href: '/' },
				{ label: 'Team 365', href: '/' },
			],
		},
	],
	contactInfo: [
		{
			type: 'address',
			value: 'House 88, 17/A\nBanani, Dhaka 1213',
			icon: MapPin,
		},
		{
			type: 'phone',
			value: '(+880) 1828-398-225',
			href: 'tel:+8801828398225',
			icon: Phone,
		},
		{
			type: 'email',
			value: 'info@thinkcrypt.io',
			href: 'mailto:info@thinkcrypt.io',
			icon: Mail,
		},
	],
	socialLinks: [
		{ name: 'Facebook', href: '#', icon: RiFacebookFill },
		{ name: 'Instagram', href: '#', icon: SlSocialInstagram },
		{ name: 'Twitter', href: '#', icon: TfiTwitter },
		{ name: 'LinkedIn', href: '#', icon: SlSocialLinkedin },
	],
	bottomLinks: [
		{ label: 'Privacy Policy', href: '/privacy-policy' },
		{ label: 'Terms of Service', href: '/terms-of-service' },
		// { label: "Cookie Policy", href: "/cookie-policy" }
	],
	copyright: '© 2025 MINT Homes. All rights reserved.',
};
