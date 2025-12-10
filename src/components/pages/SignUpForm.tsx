'use client'

import { useActionState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import Text from '@/components/ui/Text';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signup } from '@/actions/auth-signup';

const signUpSchema = yup.object().shape({
	last_name: yup.string().required('Le nom est requis'),
	first_name: yup.string().required('Le prénom est requis'),
	phone_number: yup.string().required('Le téléphone est requis'),
	email: yup.string().required("L'email est requis").email("L'email doit être une adresse email valide"),
	password: yup.string().required('Le mot de passe est requis').min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
	password_confirmation: yup.string()
		.oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre')
		.required('La confirmation du mot de passe est requise')
});

interface SignUpFormData {
	last_name: string;
	first_name: string;
	phone_number: string;
	email: string;
	password: string;
	password_confirmation: string;
}

const SignUpForm = () => {
	const [state, formAction] = useActionState(signup, null);
  const [isTransitioning, startTransition] = useTransition();
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(signUpSchema),
		defaultValues: {
			last_name: '',
			first_name: '',
			phone_number: '',
			email: '',
			password: '',
			password_confirmation: ''
		}
	});

	const onSubmit = async (data: any) => {
		startTransition(() => {
			formAction(data);
		});
	};

	return (
		<div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 w-full max-w-3xl mx-auto mt-10">
			<div className="text-3xl font-bold text-white text-center mb-6">S&apos;inscrire gratuitement</div>
			<p className="text-xl text-white/80 mb-8 text-center">
				Rejoignez notre plateforme pour accéder aux meilleures opportunités d&apos;investissement dans les <span className="text-blue-300">laveries automatiques</span> et trouvez <span className="text-green-300">votre projet idéal.</span>
			</p>

			{state?.error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
					{state?.error as string}
				</div>
			)}
			{
				state?.success && (
					<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
						Votre inscription a été effectuée avec succès, votre compte est en cours de validation
						&nbsp;
						<Link
							href="/"
							className="inline-block mt-2 text-blue-700 underline hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
							tabIndex={0}
							aria-label="Retour à l&apos;accueil"
						>
							Retour à l&apos;accueil
						</Link>
					</div>
				)
			}
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Text
						{...register('last_name')}
						label="Nom"
						id="lastName"
						error={errors.last_name?.message}
						required
					/>
					<Text
						{...register('first_name')}
						label="Prénom"
						id="first_name"
						error={errors.first_name?.message}
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
					<Text
						{...register('password')}
						label="Mot de passe"
						type="password"
						error={errors.password?.message}
						required
					/>
					<Text
						{...register('password_confirmation')}
						label="Confirmer le mot de passe"
						type="password"
						error={errors.password_confirmation?.message}
						required
					/>
				</div>

				<div className="flex justify-end pt-4 space-x-3">
					<Link href="/" className="px-6 py-2 rounded-lg text-sm font-medium text-white/80 bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors">
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

export default SignUpForm;

