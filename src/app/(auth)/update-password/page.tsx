'use client'

import { useActionState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { updatePassword } from '@/actions/auth-update-password'
import Text from '@/components/ui/Text'

const updatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Le mot de passe est requis')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: yup
    .string()
    .required('La confirmation est requise')
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
})

interface UpdatePasswordFormData {
  password: string
  confirmPassword: string
}

const UpdatePasswordForm: React.FC = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [state, formAction] = useActionState(updatePassword, null)
  const [isTransitioning, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: yupResolver(updatePasswordSchema),
    mode: 'onBlur',
  })

  if (!token) {
    return (
      <div className="flex flex-col gap-4 max-w-md mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold">Lien invalide</p>
          <p className="text-sm mt-2">
            Le lien de réinitialisation est invalide ou manquant. Veuillez redemander une réinitialisation.
          </p>
        </div>
      </div>
    )
  }

  const onFormSubmit = handleSubmit(async (data) => {
    startTransition(() => {
      formAction({ password: data.password, confirmPassword: data.confirmPassword, token: token as string });
    });
  })

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 w-full max-w-3xl mx-auto mt-10 p-12">
      <h1 className="text-2xl font-bold text-center mb-4">Définir un nouveau mot de passe</h1>
      
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {state.error}
        </div>
      )}

      <form onSubmit={onFormSubmit} className="space-y-6">
        <Text
          {...register('password')}
          label="Nouveau mot de passe"
          placeholder="Votre nouveau mot de passe"
          error={errors.password?.message}
          type="password"
          required
        />

        <Text
          {...register('confirmPassword')}
          label="Confirmer le mot de passe"
          placeholder="Confirmez votre nouveau mot de passe"
          error={errors.confirmPassword?.message}
          type="password"
          required
        />

        <button
          type="submit"
          disabled={isTransitioning}
          className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-colors ${
            isTransitioning
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {isTransitioning ? 'Mise à jour en cours...' : 'Mettre à jour le mot de passe'}
        </button>
      </form>
    </div>
  )
}

export default UpdatePasswordForm