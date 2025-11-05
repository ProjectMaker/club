'use client'

import { useActionState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Link from 'next/link'
import { resetPassword } from '@/actions/auth-reset-password'
import Text from '@/components/ui/Text'

const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required('L\'email est requis')
    .email('L\'email doit être valide'),
})

interface ResetPasswordFormData {
  email: string
}

const ResetPasswordForm: React.FC = () => {
  const [state, formAction] = useActionState(resetPassword, null)
  const [isTransitioning, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onBlur',
  })

  const onFormSubmit = handleSubmit(async (data) => {
    startTransition(() => {
      formAction(data);
    });
  })

  if (state?.success) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 w-full max-w-3xl mx-auto mt-10 p-12">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* Icône de succès avec animation */}
          <div className="relative">
            <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
            <div className="relative bg-green-500 rounded-full p-6">
              <svg 
                className="w-12 h-12 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>

          {/* Titre et message */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">Email envoyé !</h2>
            <div className="max-w-lg mx-auto">
              <p className="text-lg text-white/80 leading-relaxed">
                Si cette adresse email existe dans notre système, vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
              </p>
              <p className="text-sm text-white/60 mt-4">
                Vérifiez votre boîte de réception et votre dossier spam.
              </p>
            </div>
          </div>

          {/* Bouton de retour */}
          <Link 
            href="/login" 
            className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Retour à la connexion
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 w-full max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Réinitialiser le mot de passe</h1>
      
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {state.error}
        </div>
      )}

      <form onSubmit={onFormSubmit} className="space-y-6">
        <Text
          {...register('email')}
          label="Email"
          placeholder="Votre adresse email"
          error={errors.email?.message}
          required
        />

        <button
          type="submit"
          disabled={isTransitioning}
          className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-colors cursor-pointer ${
            isTransitioning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {isTransitioning ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Vous vous souvenez de votre mot de passe ?{' '}
        <Link href="/login" className="font-semibold leading-6 text-blue-400 hover:text-blue-300">
          Se connecter
        </Link>
      </p>
    </div>
  )
}

export default ResetPasswordForm