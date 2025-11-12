'use client';

import { ButtonPrimary, Layout, PrimaryText, SecondaryInputField } from '@/components';
import SecondaryText from '@/components/reusables/SecondaryText';
import { useAppDispatch } from '@/hooks';
import { useAuth } from '@/hooks/useAuth';
import { usePostMutation } from '@/store/services/commonApi';
import { login } from '@/store/slices/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function SigninPage() {
	const dispatch = useAppDispatch();
	const { isLoggedIn } = useAuth();
	const [trigger, result] = usePostMutation();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	// Custom messages for each field
	const fieldErrors: { [key: string]: string } = {
		email: 'Please enter your email address',
		password: 'Please enter a password',
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await trigger({
			path: 'user/login',
			body: formData,
		});
	};

	useEffect(() => {
		if (!result.isLoading && result.isSuccess) {
			toast.success('Login successful');
			dispatch(login({ token: result?.data?.token }));
		}
		if (!result.isLoading && result.isError) {
			toast.error((result as any)?.error?.data?.message || 'Login failed. Please try again.');
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
			<div className='flex justify-center p-5 items-center'>
				<form
					onSubmit={handleSubmit}
					className='w-full max-w-xl bg-white p-8 border-2'>
					<h2 className='text-2xl font-bold mb-6 text-center'>New Account</h2>
					<div className='grid grid-cols-1 gap-y-2'>
						<SecondaryInputField
							label='Email Address'
							name='email'
							value={formData.email}
							onChange={handleChange}
							error={errors.email}
							onBlur={handleBlur}
						/>
						<SecondaryInputField
							label='Password'
							name='password'
							type='password'
							value={formData.password}
							onChange={handleChange}
							error={errors.password}
							onBlur={handleBlur}
						/>
					</div>
					<Link href='/'>
						<SecondaryText className='border-b pb-1 w-max'>Forgot you password ?</SecondaryText>
					</Link>
					<div className='mt-6 flex justify-center'>
						<ButtonPrimary
							type='submit'
							isLoading={result.isLoading}>
							{result.isLoading ? 'Login...' : 'Sign In'}
						</ButtonPrimary>
					</div>
				</form>
			</div>
			<ToastContainer />
		</Layout>
	);
}
