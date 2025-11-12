'use client';

import { ButtonPrimary, Layout, SecondaryInputField, Toast } from '@/components';
import { useAppDispatch } from '@/hooks';
import { usePostMutation } from '@/store/services/commonApi';
import { login } from '@/store/slices/authSlice';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
const countries = [
	{ label: 'Canada', value: 'canada' },
	{ label: 'USA', value: 'usa' },
];
export default function SignupPage() {
	const dispatch = useAppDispatch();
	const [trigger, result] = usePostMutation();
	const { isLoggedIn } = useAuth();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		password: '',
		// confirmPassword: '',
		// country: 'canada',
		// firstName: '',
		// lastName: '',
		// address: '',
		// buzzerNumber: '',
		// companyName: '',
		// suburbCity: '',
		// province: '',
		// postalCode: '',
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	// Custom messages for each field
	const fieldErrors: { [key: string]: string } = {
		name: 'Please enter your name',
		email: 'Please enter your email address',
		password: 'Please enter a password',
		// confirmPassword: 'Please confirm your password',
		// country: 'Please select your country',
		// firstName: 'First name is required',
		// lastName: 'Last name is required',
		// address: 'Address is required',
		// buzzerNumber: 'Buzzer number is required',
		// companyName: 'Company name is required',
		// suburbCity: 'Please enter your city',
		// province: 'Please select a province',
		// postalCode: 'Postal code is required',
		phone: 'Phone number is required',
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (errors[e.target.name]) {
			validateField(e.target.name, e.target.value);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
		validateField(e.target.name, e.target.value);
	};

	const validateField = (name: string, value: string) => {
		let message = '';
		if (!value.trim()) {
			message = fieldErrors[name] || `${name} is required`;
		} else if (name === 'confirmPassword' && value !== formData.password) {
			message = 'Passwords do not match';
		}
		setErrors(prev => ({ ...prev, [name]: message }));
	};

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};
		Object.keys(formData).forEach(key => {
			if (!formData[key as keyof typeof formData].trim()) {
				newErrors[key] = fieldErrors[key] || `${key} is required`;
			}
		});
		// if (
		// 	formData.confirmPassword.trim() &&
		// 	formData.confirmPassword !== formData.password
		// ) {
		// 	newErrors.confirmPassword = 'Passwords do not match';
		// }
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// if (validateForm()) {

		await trigger({
			path: 'user/register',
			body: formData,
		});
	};
	// effect : toast
	useEffect(() => {
		if (result.isLoading) return;
		if (result.isSuccess) {
			toast.success('Sign up successfull');
			dispatch(login({ token: result?.data?.token }));
		}
		if (result.isError) {
			toast.error((result as any)?.error?.data?.message || 'Sign up failed. Please try again.');
		}
	}, [result]);

	const router = useRouter();

	useEffect(() => {
		if (isLoggedIn) {
			router.replace('/');
		}
	}, [isLoggedIn]);

	return (
		<Layout>
			<ToastContainer />
			<div className='flex justify-center py-5'>
				<form
					onSubmit={handleSubmit}
					className='w-full max-w-5xl bg-white p-8 rounded-md'>
					<h2 className='text-2xl font-bold mb-6 text-center'>New Account</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
						<SecondaryInputField
							label='Name'
							name='name'
							value={formData.name}
							onChange={handleChange}
							error={errors.name}
							onBlur={handleBlur}
							required
						/>
						<SecondaryInputField
							label='Phone Number'
							name='phone'
							value={formData.phone}
							onChange={handleChange}
							error={errors.phone}
							onBlur={handleBlur}
							required
						/>
						<SecondaryInputField
							label='Email Address'
							name='email'
							value={formData.email}
							onChange={handleChange}
							error={errors.email}
							onBlur={handleBlur}
							required
						/>
						<SecondaryInputField
							label='Password'
							name='password'
							type='password'
							value={formData.password}
							onChange={handleChange}
							error={errors.password}
							onBlur={handleBlur}
							required
						/>
						{/* <SecondaryInputField
							label='Confirm Password'
							name='confirmPassword'
							type='password'
							value={formData.confirmPassword}
							onChange={handleChange}
							error={errors.confirmPassword}
							onBlur={handleBlur}
							required
						/> */}
						{/* <SecondaryInputField
							label='Country'
							name='country'
							value={formData.country}
							onChange={handleChange}
							options={countries}
							error={errors.country}
							onBlur={handleBlur}
							required
						/> */}
						{/* <SecondaryInputField
							label='First Name'
							name='firstName'
							value={formData.firstName}
							onChange={handleChange}
							error={errors.firstName}
							onBlur={handleBlur}
							required
						/>
						<SecondaryInputField
							label='Last Name'
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
							error={errors.lastName}
							onBlur={handleBlur}
							required
						/> */}
						{/* <div className='flex flex-col w-full'>
							<SecondaryInputField
								label='Address'
								name='address'
								value={formData.address}
								onChange={handleChange}
								error={errors.address}
								onBlur={handleBlur}
								required
							/>
						</div>
						<SecondaryInputField
							label='Buzzer Number'
							name='buzzerNumber'
							value={formData.buzzerNumber}
							onChange={handleChange}
							error={errors.buzzerNumber}
							onBlur={handleBlur}
						/>
						<SecondaryInputField
							label='Company Name'
							name='companyName'
							value={formData.companyName}
							onChange={handleChange}
							error={errors.companyName}
							onBlur={handleBlur}
						/>
						<SecondaryInputField
							label='Suburb/City'
							name='suburbCity'
							value={formData.suburbCity}
							onChange={handleChange}
							error={errors.suburbCity}
							onBlur={handleBlur}
							required
						/>
						<SecondaryInputField
							label='Province'
							name='province'
							value={formData.province}
							onChange={handleChange}
							onBlur={handleBlur}
							options={[
								'Alberta',
								'British Columbia',
								'Ontario',
								'Quebec',
								'Manitoba',
							]}
							error={errors.province}
							required
						/>
						<SecondaryInputField
							label='Postal Code'
							name='postalCode'
							value={formData.postalCode}
							onChange={handleChange}
							error={errors.postalCode}
							onBlur={handleBlur}
							required
						/> */}
					</div>
					<div className='mt-6 flex justify-center'>
						<ButtonPrimary
							type='submit'
							isLoading={result.isLoading}>
							{result.isLoading ? 'Signing Up...' : 'CREATE ACCOUNT'}
						</ButtonPrimary>
					</div>
				</form>
			</div>
		</Layout>
	);
}
