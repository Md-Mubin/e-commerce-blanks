import React from 'react';
import { ColorSidebar } from '../ColorSidebar';
import { brandsData, colorsData, sizesData } from '@/lib/menuData';
type SidebarDesktopProps = {
	onApplyFilters: (filters: Record<string, string[] | { min?: number; max?: number }>) => void;
};
const SidebarDesktop =  ({ onApplyFilters }: SidebarDesktopProps) => {
	return (
		
			<ColorSidebar  onApplyFilters={onApplyFilters}>
				<ColorSidebar.MenuHeading>REFINE BY</ColorSidebar.MenuHeading>

				<ColorSidebar.SelectedFilters />

				{/* <ColorSidebar.MenuItems title='COLOUR' data={colorsData} /> */}
				<ColorSidebar.MenuItems
					title='SIZE'
					data={sizesData}
					defaultOpen={false}
				/>
				{/* <ColorSidebar.MenuItems
					title='BRAND'
					data={brandsData}
					defaultOpen={false}
				/> */}
				<ColorSidebar.PriceFilter />
			</ColorSidebar>
		
	);
};

export default SidebarDesktop;
