'use client'

import { useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Text from '@/components/ui/Text';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Select from '@/components/ui/Select';
import { signup } from '@/actions/auth-signup';
import { User } from '@/models';
import { createUser } from '@/actions/user-create';

const userSchema = yup.object().shape({
	id: yup.string().required('L\'id est requis'),
	lastname: yup.string().required('Le nom est requis'),
	firstname: yup.string().required('Le prénom est requis'),
	phone_number: yup.string().required('Le téléphone est requis'),
	email: yup.string().required("L'email est requis").email("L'email doit être une adresse email valide"),
	is_approved: yup.boolean().required('Le statut est requis'),
	laundries_owner: yup.string().required(),
	laundries_number: yup.number().transform((value) => {
		if (value === '' || value === null || value === undefined) return undefined;
		const num = Number(value);
		return isNaN(num) ? undefined : num;
	}).when('laundries_owner', {
		is: 'yes',
		then: schema => schema.min(1, 'Veuillez indiquer le nombre de laveries').required('Ce champ est requis si vous possédez des laveries'),
		otherwise: schema => schema.notRequired(),
	}),
});

type UserFormData = {
	id: string;
	is_approved: string;
	lastname: string;
	firstname: string;
	phone_number: string;
	email: string;
	laundries_owner: string;
	laundries_number: number | undefined;
};

const UserForm = ({ defaultValues }: { defaultValues: User }) => {
	const [isTransitioning, startTransition] = useTransition();
	const queryClient = useQueryClient();
	const { register, handleSubmit, watch, formState: { errors }, control } = useForm<UserFormData>({
		resolver: yupResolver(userSchema) as any,
		defaultValues: {
			id: defaultValues.id,
			lastname: defaultValues.lastname || '',
			firstname: defaultValues.firstname || '',
			phone_number: defaultValues.phone_number || '',
			email: defaultValues.email || '',
			laundries_owner: defaultValues.laundries_owner ? 'yes' : 'no',
			is_approved: defaultValues.is_approved ? 'true' : 'false',
			laundries_number: defaultValues.laundries_number || 0,
		}
	});

	const ownsLaundries = watch('laundries_owner');

	const mutation = useMutation({
		mutationFn: async (data: UserFormData) => {
			return await createUser(null, {...data, is_approved: data.is_approved === 'true'});
		},
		onSuccess: (result) => {
			if (result?.success) {
				// Invalider toutes les queries liées aux utilisateurs pour forcer le rafraîchissement
				queryClient.invalidateQueries({ queryKey: ['users'] });
				queryClient.invalidateQueries({ queryKey: ['count-users'] });
			}
		},
	});

	const onSubmit = async (data: UserFormData) => {
		startTransition(() => {
			mutation.mutate(data);
		});
	};

	const state = mutation.data;

	return (
		<div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 w-full max-w-3xl">
			{state?.error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
					{state?.error as string}
				</div>
			)}
			{
				state?.success && (
					<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
						Modification effectuée avec succès.
					</div>
				)
			}
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Text
						{...register('lastname')}
						label="Nom"
						id="lastName"
						error={errors.lastname?.message}
						required
					/>
					<Text
						{...register('firstname')}
						label="Prénom"
						id="firstname"
						error={errors.firstname?.message}
						required
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Text
						{...register('phone_number')}
						label="Téléphone"
						error={errors.phone_number?.message}
						required
					/>
					<Text
						{...register('email')}
						label="Email"
						error={errors.email?.message}
						required
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Controller
						name="is_approved"
						control={control}
						render={({ field }) => (
							<Select
								id="is_approved"
								value={field.value}
								onChange={(value) => field.onChange(value)}
								required
								label="Validé"
								size="sm"
								options={[
									{ value: 'true', label: 'Oui' },
									{ value: 'false', label: 'Non' }
								]}
								error={errors.is_approved?.message?.toString()}
							/>
						)}
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-white/80 mb-2">Posséde des laveries ?</label>
					<div className="flex items-center space-x-4">
						<label className="flex items-center cursor-pointer">
							<input {...register('laundries_owner')} type="radio" value="yes" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 bg-transparent" />
							<span className="ml-2 text-sm text-white/80">Oui</span>
						</label>
						<label className="flex items-center cursor-pointer">
							<input {...register('laundries_owner')} type="radio" value="no" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 bg-transparent" />
							<span className="ml-2 text-sm text-white/80">Non</span>
						</label>
					</div>
				</div>

				{ownsLaundries === 'yes' && (
					<div>
						<Text
							{...register('laundries_number', { valueAsNumber: true })}
							label="Combien"
							id="laundriesCount"
							type="text"
							placeholder="0"
							error={errors.laundries_number?.message}
							required
						/>
					</div>
				)}

				<div className="flex justify-end pt-4 space-x-3">
					<Link href="/private/admin" className="px-6 py-2 rounded-lg text-sm font-medium text-white/80 bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors">
						Annuler
					</Link>
					<button type="submit" disabled={isTransitioning} className="px-6 py-2 cursor-pointer rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
						{isTransitioning ? 'Inscription en cours...' : 'Valider'}
					</button>
				</div>
			</form>
		</div>
		
	);
}

export default UserForm;

