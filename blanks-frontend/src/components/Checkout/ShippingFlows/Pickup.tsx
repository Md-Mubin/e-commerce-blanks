import { useAppSelector, useAppDispatch } from '@/hooks';
import React from 'react';

const inputCss = 'border border-borderBg p-2 bg-[white] w-full';

const Pickup = () => {
	const { pickupDate, pickupTime } = useAppSelector((state: any) => state.checkout);
	const dispatch = useAppDispatch();
	return (
		<div className='flex flex-col md:flex-row gap-4 mt-2'>
			<div>
				<label className='block text-sm mb-1'>Pickup Date</label>
				<input
					type='date'
					value={pickupDate}
					className={inputCss}
					onChange={e =>
						dispatch({
							type: 'checkout/updatePickupDate',
							payload: e.target.value,
						})
					}
				/>
			</div>
			<div>
				<label className='block text-sm mb-1'>Pickup Time</label>
				<input
					type='time'
					value={pickupTime}
					className={inputCss}
					onChange={e =>
						dispatch({
							type: 'checkout/updatePickupTime',
							payload: e.target.value,
						})
					}
				/>
			</div>
		</div>
	);
};

export default Pickup;
