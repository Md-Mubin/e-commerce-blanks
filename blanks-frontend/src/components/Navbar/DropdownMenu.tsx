import { DropdownItem } from './index';

const DropdownMenu = ({ items }: { items: any[] }) => {
	return (
		<>
			{items.map((item, index) => (
				<DropdownItem key={index} item={item} />
			))}
		</>
	);
};

export default DropdownMenu;
