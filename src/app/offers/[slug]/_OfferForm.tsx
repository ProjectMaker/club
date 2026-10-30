'use client';

import Link from 'next/link';
import { useActionState, useMemo, useRef, useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { createOfferRequest } from '@/actions/offer-request-create';
import { DEPARTMENTS } from '@/utils/constants';
import type { FormField, OfferForm as OfferFormConfig } from '../_data';

// Coordonnées communes à toutes les offres, demandées à la dernière étape.
// Pour un membre connecté, celles déjà connues dans son profil sont seulement affichées.
const CONTACT_FIELDS: FormField[] = [
  { name: 'firstname', type: 'text', label: 'Prénom', required: true, half: true, autoComplete: 'given-name' },
  { name: 'lastname', type: 'text', label: 'Nom', required: true, half: true, autoComplete: 'family-name' },
  { name: 'email', type: 'email', label: 'Email', required: true, half: true, autoComplete: 'email' },
  { name: 'phone_number', type: 'tel', label: 'Téléphone', required: true, half: true, autoComplete: 'tel' },
  { name: 'contact_preference', type: 'choices', label: 'Je préfère être contacté par', options: ['Téléphone', 'Email'], defaultValue: 'Téléphone' },
]

const VALIDATION_STEP = 'Validation'

const fieldSchema = (field: FormField) => {
  if (field.type === 'multiple') {
    const schema = yup.array(yup.string().required()).default([])
    return field.required ? schema.min(1, 'Choisissez au moins une option') : schema
  }
  let schema = yup.string().trim().default('')
  if (field.type === 'email') {
    schema = schema.email('Email invalide')
  }
  if (field.required) {
    const isChoice = ['select', 'department', 'choices'].includes(field.type)
    schema = schema.required(isChoice ? 'Choisissez une option' : 'Ce champ est requis')
  }
  return schema
}

// Le schéma dépend de l'offre : son type est donc générique
const buildSchema = (fields: FormField[]): yup.ObjectSchema<Record<string, any>> => yup.object({
  ...Object.fromEntries(fields.map(field => [field.name, fieldSchema(field)])),
  consent: yup.boolean().oneOf([true], 'Votre accord est nécessaire pour être mis en relation').required(),
})

const formatValue = (field: FormField, value: any) => {
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  return value && field.unit ? `${value} ${field.unit}` : value
}

const optionValue = (option: NonNullable<FormField['options']>[number]) => typeof option === 'string' ? option : option.value

const inputClasses = 'w-full bg-white text-gray-700 rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent'

const Label = ({ htmlFor, children, required }: { htmlFor?: string, children: React.ReactNode, required?: boolean }) => (
  <label htmlFor={htmlFor} className="block text-white text-sm font-semibold mb-2">
    {children}
    {required && <span className="text-red-300 ml-1">*</span>}
  </label>
)

const FieldError = ({ message }: { message?: string }) => (
  message ? <p className="text-red-300 text-xs mt-1">{message}</p> : null
)

// Groupe de boutons à choix unique (ou multiple), affichés comme des puces
const Choices = ({ options, value, onChange, multiple = false, label }: {
  options: NonNullable<FormField['options']>
  value: string | string[]
  onChange: (value: any) => void
  multiple?: boolean
  label: string
}) => {
  const isSelected = (option: string) => multiple ? (value as string[]).includes(option) : value === option
  const toggle = (option: string) => {
    if (!multiple) {
      return onChange(option)
    }
    const values = value as string[]
    onChange(values.includes(option) ? values.filter(item => item !== option) : [...values, option])
  }
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map(option => {
        const value = optionValue(option)
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isSelected(value)}
            onClick={() => toggle(value)}
            className={`flex-1 min-w-fit cursor-pointer flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium border-2 transition-all duration-150 ${isSelected(value)
              ? 'bg-blue-600 text-white border-white shadow-lg shadow-blue-950/40 ring-2 ring-blue-300/60'
              : 'bg-white/95 text-blue-900 border-transparent hover:border-blue-300 hover:bg-white'
              }`}
          >
            {isSelected(value) ? (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : typeof option !== 'string' && option.icon}
            {value}
          </button>
        )
      })}
    </div>
  )
}

const Field = ({ field, control, register, error }: {
  field: FormField
  control: any
  register: any
  error?: string
}) => {
  const id = `field-${field.name}`
  const isGroup = ['choices', 'multiple'].includes(field.type)
  let input: React.ReactNode
  switch (field.type) {
    case 'choices':
    case 'multiple':
      input = (
        <Controller name={field.name} control={control} render={({ field: { value, onChange } }) => (
          <Choices label={field.label} options={field.options || []} multiple={field.type === 'multiple'} value={value} onChange={onChange} />
        )} />
      )
      break
    case 'select':
    case 'department':
      input = (
        <select id={id} {...register(field.name)} className={inputClasses}>
          <option value="">{field.placeholder || 'Sélectionnez une option'}</option>
          {(field.type === 'department' ? DEPARTMENTS : (field.options || []).map(optionValue)).map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )
      break
    case 'textarea':
      input = <textarea id={id} rows={4} {...register(field.name)} placeholder={field.placeholder} className={inputClasses} />
      break
    default:
      input = (
        <input
          id={id}
          type={field.type}
          {...(field.type === 'number' ? { min: 0, inputMode: 'numeric' } : {})}
          autoComplete={field.autoComplete}
          {...register(field.name)}
          placeholder={field.placeholder}
          className={inputClasses}
        />
      )
  }
  return (
    <div className={field.half ? '' : 'sm:col-span-2'}>
      <Label htmlFor={isGroup ? undefined : id} required={field.required}>{field.label}</Label>
      {input}
      <FieldError message={error} />
    </div>
  )
}

export type Contact = Record<'firstname' | 'lastname' | 'email' | 'phone_number', string>

interface Props {
  offer: string
  form: OfferFormConfig
  // Coordonnées du membre connecté, null pour un visiteur
  contact: Contact | null
}

export default function OfferForm({ offer, form, contact }: Props) {
  const knownFields = useMemo(() => CONTACT_FIELDS.filter(field => contact?.[field.name as keyof Contact]), [contact])
  const contactFields = useMemo(() => CONTACT_FIELDS.filter(field => !knownFields.includes(field)), [knownFields])
  const steps = form.steps
  const lastStep = steps.length - 1
  const stepFields = (index: number) => index === lastStep ? [...steps[index].fields, ...contactFields] : steps[index].fields
  const fields = useMemo(() => [...steps.flatMap(step => step.fields), ...contactFields], [steps, contactFields])
  const schema = useMemo(() => buildSchema(fields), [fields])
  const honeypot = useRef<HTMLInputElement>(null)

  const [currentStep, setCurrentStep] = useState(0)
  const [state, formAction] = useActionState(createOfferRequest, null)
  const [isPending, startTransition] = useTransition()
  const { register, control, trigger, handleSubmit, getValues, formState: { errors } } = useForm<Record<string, any>>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...Object.fromEntries(fields.map(field => [field.name, field.type === 'multiple' ? [] : field.defaultValue || ''])),
      consent: false,
    },
  })

  const stepLabels = [...steps.map(step => step.label), VALIDATION_STEP]
  const isValidationStep = currentStep === steps.length

  const nextStep = async () => {
    if (await trigger(stepFields(currentStep).map(field => field.name))) {
      setCurrentStep(step => step + 1)
    }
  }

  // Chaque réponse est enregistrée avec l'intitulé de sa question, pour rester lisible si le formulaire évolue
  const toAnswers = (values: Record<string, any>) => [
    ...fields.map(field => ({ field, value: values[field.name] })),
    ...knownFields.map(field => ({ field, value: contact?.[field.name as keyof Contact] })),
  ]

  const onSubmit = (values: Record<string, any>) => {
    const answers = toAnswers(values).map(({ field, value }) => ({ name: field.name, label: field.label, value }))
    startTransition(() => {
      formAction({ offer, answers, website: honeypot.current?.value })
    })
  }

  if (state?.success) {
    return (
      <section className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center">
        <span className="mx-auto mb-4 w-14 h-14 rounded-full bg-green-500/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h2 className="text-2xl font-bold text-white mb-2">Demande envoyée</h2>
        <p className="text-white/80">{form.success}</p>
      </section>
    )
  }

  const values = getValues()

  return (
    <section className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
      <h2 className="text-2xl font-bold text-white mb-1">{form.title}</h2>
      <p className="text-white/80 text-sm mb-6">{form.intro}</p>

      {/* Étapes */}
      <ol className="flex items-start mb-6">
        {stepLabels.map((label, index) => (
          <li key={label} className="flex-1 flex flex-col items-center relative">
            {index > 0 && (
              <span className={`absolute top-4 right-1/2 w-full h-0.5 ${index <= currentStep ? 'bg-blue-400' : 'bg-white/30'}`} aria-hidden="true" />
            )}
            <span
              aria-current={index === currentStep ? 'step' : undefined}
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${index <= currentStep
                ? 'bg-blue-500 border-blue-300 text-white'
                : 'bg-blue-950/60 border-white/40 text-white/70'
                }`}
            >
              {index + 1}
            </span>
            <span className={`mt-2 text-xs text-center ${index === currentStep ? 'text-white font-semibold' : 'text-white/60'}`}>{label}</span>
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Champ piège invisible : seuls les robots le remplissent */}
        <input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

        {!isValidationStep && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
            {steps[currentStep].fields.map(field => (
              <Field
                key={field.name}
                field={field}
                control={control}
                register={register}
                error={errors[field.name]?.message?.toString()}
              />
            ))}
          </div>
        )}

        {currentStep === lastStep && (
          <fieldset className="border-t border-white/15 pt-5">
            <legend className="sr-only">Vos coordonnées</legend>
            <h3 className="text-lg font-semibold text-white mb-4">Vos coordonnées</h3>
            {knownFields.length > 0 && (
              <div className="bg-white/5 rounded-xl border border-white/15 p-4 mb-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  {knownFields.map(field => (
                    <div key={field.name}>
                      <dt className="text-white/60">{field.label}</dt>
                      <dd className="text-white font-medium break-words">{contact?.[field.name as keyof Contact]}</dd>
                    </div>
                  ))}
                </dl>
                <Link href="/private/profile" className="text-sm font-semibold text-blue-200 hover:text-white whitespace-nowrap">
                  Modifier mon profil
                </Link>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
              {contactFields.map(field => (
                <Field
                  key={field.name}
                  field={field}
                  control={control}
                  register={register}
                  error={errors[field.name]?.message?.toString()}
                />
              ))}
            </div>
          </fieldset>
        )}

        {isValidationStep && (
          <>
            <dl className="bg-white/5 rounded-xl border border-white/15 p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {toAnswers(values).map(({ field, value }) => (
                <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <dt className="text-white/60">{field.label}</dt>
                  <dd className="text-white font-medium whitespace-pre-line break-words">{formatValue(field, value) || '—'}</dd>
                </div>
              ))}
            </dl>
            <div>
              <label className="flex items-start gap-3 text-white/90 text-sm cursor-pointer">
                <input type="checkbox" {...register('consent')} className="mt-0.5 w-4 h-4 accent-blue-500" />
                <span>J&apos;accepte que Club Laverie étudie ma demande et me mette en relation avec ses partenaires.</span>
              </label>
              <FieldError message={errors.consent?.message?.toString()} />
            </div>
            {state?.error && (
              <p role="alert" className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-2 text-red-200 text-sm">
                {state.error}
              </p>
            )}
          </>
        )}

        <div className="flex justify-between items-center pt-2">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(step => step - 1)}
              className="py-2.5 px-4 cursor-pointer rounded-lg font-medium bg-white/20 text-white hover:bg-white/30 transition-colors duration-200"
            >
              Précédent
            </button>
          ) : <span />}
          {/* Clés distinctes : sans elles React réutilise le bouton, qui devient « submit » pendant le clic et envoie le formulaire */}
          {!isValidationStep ? (
            <button
              key="next"
              type="button"
              onClick={nextStep}
              className="py-2.5 px-5 cursor-pointer rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 flex items-center gap-2 transition-colors duration-200"
            >
              Étape suivante
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          ) : (
            <button
              key="submit"
              type="submit"
              disabled={isPending}
              className="py-2.5 px-5 cursor-pointer rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-wait transition-colors duration-200"
            >
              {isPending ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
