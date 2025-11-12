'use client';
import { useEffect, useState } from 'react';
import { Camera, Save, User, Mail } from 'lucide-react';
import { Flex } from '../reusables';
import { useGetSelfQuery, useUpdateSelfMutation } from '@/store/services/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

const ProfileInfo = () => {
	// console.log(id)
	const { data, isLoading } = useGetSelfQuery({});
	const [updateSelf] = useUpdateSelfMutation();
	const dispatch = useDispatch()

	// Edit mode state
	const [isEditing, setIsEditing] = useState(false);
	const [editForm, setEditForm] = useState({
		name: '',
		email: '',
		phone: '',
		image: '',
	});

	useEffect(() => {
		if (data) {
			setEditForm({
				name: data?.name || '',
				email: data?.email || '',
				phone: data?.phone || '',
				image: data?.image || '',
			});
		}
	}, [data]);

	const handleSave = async () => {
		const res = await updateSelf(editForm).unwrap();
		console.log('res', res);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditForm({ ...data });
		setIsEditing(false);
	};

	const handleImageChange = (event: any) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = e => {
				if (e.target) {
					setEditForm({ ...editForm, image: e.target.result as string });
				}
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className='bg-white rounded-sm shadow-sm p-8 mb-8'>
			<Flex className='flex lg:items-center justify-between mb-6 relative'>
				<h1 className='text-3xl font-bold text-gray-900'>Profile</h1>
				{!isEditing ? (
					<Flex className='absolute right-0 top-1 flex-col gap-4'>
						<button
							onClick={() => setIsEditing(true)}
							className='hover:bg-red400 bg-black hover:text-white duration-200 cursor-pointer text-secondaryColor px-6 py-2 rounded-sm font-medium'
						>
							Edit Profile
						</button>
						<button
							onClick={() => dispatch(logout())}
							className='hover:bg-red400 bg-black hover:text-white duration-200 cursor-pointer text-secondaryColor px-6 py-2 rounded-sm font-medium'
						>
							Log Out
						</button>
					</Flex>
				) : (
					<div className='flex space-x-3'>
						<button
							onClick={handleSave}
							className='bg-black hover:bg-red400 duration-200 text-secondaryColor hover:text-white px-6 py-2 rounded-sm font-medium  flex items-center cursor-pointer'
						>
							<Save className='w-4 h-4 mr-2' />
							Save
						</button>
						<button
							onClick={handleCancel}
							className='bg-transparent text-secondaryColor hover:bg-red400 duration-200 hover:text-white cursor-pointer px-6 py-2 rounded-sm font-medium '
						>
							Cancel
						</button>
					</div>
				)}
			</Flex>

			<Flex className='flex flex-col md:flex-row items-start lg:items-center md:items-start space-y-6 md:space-y-0 md:space-x-8'>
				{/* Profile Image */}
				<div className='relative'>
					<img
						src={isEditing ? editForm.image : data?.user?.image}
						alt='Profile'
						className='w-32 h-32 text-center rounded-full object-cover border-4 border-secondaryBorder'
					/>
					{isEditing && (
						<label className='absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer transition-colors'>
							<Camera className='w-4 h-4' />
							<input
								type='file'
								accept='image/*'
								onChange={handleImageChange}
								className='hidden'
							/>
						</label>
					)}
				</div>

				{/* Profile Info */}
				<Flex className='flex-col gap-5'>
					<div>
						<label className='block text-sm font-medium text-primaryColor mb-1'>
							<User className='w-4 h-4 inline mr-2' />
							Full Name
						</label>
						{isEditing ? (
							<input
								type='text'
								value={editForm.name}
								onChange={e =>
									setEditForm({ ...editForm, name: e.target.value })
								}
								className='w-full px-4 py-2 border border-secondaryBorder rounded-sm '
							/>
						) : (
							<p className='text-lg font-semibold text-secondaryColor'>
								{data?.name}
							</p>
						)}
					</div>

					<div>
						<label className='block text-sm font-medium text-primaryColor mb-1'>
							<Mail className='w-4 h-4 inline mr-2' />
							Email Address
						</label>
						{isEditing ? (
							<input
								type='email'
								value={editForm.email}
								onChange={e =>
									setEditForm({ ...editForm, email: e.target.value })
								}
								className='w-full px-4 py-2 border border-secondaryBorder rounded-sm'
							/>
						) : (
							<p className='text-md text-secondaryColor'>{data?.email}</p>
						)}
					</div>
				</Flex>
			</Flex>
		</div>
	);
};

export default ProfileInfo;
