import Link from 'next/link';
import React from 'react';
type CardMainProps = {
	children: any;
	href?: any;
};
const CardMain = ({ children, href }: CardMainProps) => {
	return (
		<Link
			href={href}
			className='overflow-hidden flex flex-col w-full sm:max-w-[375px] bg-white/70 hover:scale-[1.01] transition-all duration-300 hover:shadow-xs'
		>
			{children}
		</Link>
	);
};

export default CardMain;

{
	/* <Link
	href={href}
	className='overflow-hidden flex flex-col w-full sm:max-w-[375px] bg-white/70'
>
	{children}
</Link> */
}
