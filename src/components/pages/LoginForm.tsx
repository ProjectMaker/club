'use client';

import { useActionState, useTransition } from 'react'
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Text from '../ui/Text';
import { login } from '@/actions/auth-login'

// Schéma de validation Yup
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('L\'email est requis')
    .email('L\'email doit être valide'),
  password: yup
    .string()
    .required('Le mot de passe est requis'),
});

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onSuccess,
  onError,
  className = ''
}) => {
  const [state, formAction, isPending] = useActionState(login, null);
  const [isTransitioning, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur', // Validation lors de la perte de focus
  });

  const onFormSubmit = handleSubmit(async (data) => {
    // Créer une FormData à partir des données validées
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    
    // Utiliser startTransition pour appeler l'action
    startTransition(() => {
      formAction(formData);
    });
  });

  const loading = isPending || isTransitioning;
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 w-full max-w-md">
      <div className="text-3xl font-bold text-white text-center mb-6">Se connecter</div>
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {state.error}
        </div>
      )}
      <form onSubmit={onFormSubmit} className="space-y-6">

        <Text
          {...register('email')}
          label="Email"
          placeholder="Votre email"
          error={errors.email?.message}
          required
        />
        <Text
          {...register('password')}
          label="Password"
          placeholder="Votre password"
          error={errors.password?.message}
          type="password"
          required
        />
        <div className="flex justify-end">
          <Link 
            href="/reset-password" 
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <button
          type="submit"
          disabled={isTransitioning}
          className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-colors cursor-pointer ${
            isTransitioning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {isTransitioning ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-400">
        Pas encore de compte?{' '}
        <Link href="/signup" className="font-semibold leading-6 text-blue-400 hover:text-blue-300">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  );
};

export default LoginForm; 