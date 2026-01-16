'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, useActionState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


import MaterialInfos from './_Infos';
import MaterialPictures from './_Pictures';
import { createMaterial } from '@/actions/material-create';

const schema = yup.object().shape({
  availability_date: yup.string().required('La date de disponibilité est requise'),
  category: yup.string().required('La catégorie est requise'),
  subcategory: yup.string().required('La sous-catégorie est requise'),
  brand: yup.string().required('La marque est requise'),
  model: yup.string().required('Le modèle est requis'),
  year: yup.number()
      .typeError('L\'année est requise')
      .required('L\'année est requise')
      .min(1900, 'L\'année doit être supérieure à 1900')
      .max(new Date().getFullYear() + 1, 'L\'année ne peut pas être dans le futur'),
  status: yup.string().required('Le statut est requis'),
  postal_code: yup.string()
      .required('Le code postal est requis'),
  city: yup.string().required('La ville est requise'),
  price: yup.number()
      .typeError('Le prix unitaire HT doit être un nombre valide')
      .required('Le prix unitaire HT est requis')
      .min(0, 'Le prix unitaire HT doit être positif'),
  quantity: yup.number()
      .typeError('La quantité est requise')
      .required('La quantité est requise')
      .min(1, 'La quantité doit être au moins de 1'),
  infos: yup.string().default(''),
  pictures: yup.array().default([])
});

const STEPS = [
  { key: 'infos', label: 'Informations' },
  { key: 'pictures', label: 'Photos' }
];

interface Props {
  defaultValues: any;
}

export default function MaterialForm({ defaultValues }: Props) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [state, formAction] = useActionState(createMaterial, null);
  const [isTransitioning, startTransition] = useTransition();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onChange'
  });

  const { handleSubmit, formState: { errors }, reset } = methods;

  // Réinitialiser le formulaire quand les defaultValues changent
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async ({ pictures, ...data }: any) => {
    try {
      const picturesToDelete = defaultValues.pictures
        .filter((defaultPicture: any) =>
          !pictures.find((picture: any) => picture.id === defaultPicture.id)
        )
        .map((picture: any) => ({
          ...picture,
          _deleted: true
        }));
      const picturesToCreate = pictures
        .filter((picture: any) => !picture.uuid);
      const newPictures = picturesToDelete.concat(picturesToCreate);

      const laundryData = { ...data, pictures: newPictures };
      startTransition(() => {
        formAction(laundryData);
      });

    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);

    }
  }

  const nextStep = useCallback(() => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <MaterialInfos />;
      case 1:
        return <MaterialPictures />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bouton retour */}
      <Link
        href={'/private/admin/materials'}
        className="mb-6 flex items-center cursor-pointer text-white/80 hover:text-white transition-colors duration-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour au matériel
      </Link>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            {defaultValues.id ? 'Modifier le matériel' : 'Nouveau matériel'}
          </h1>
          {(Object.keys(errors).length > 0 || state?.error) && (
            <div className="flex items-center bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-2">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-red-400 text-sm font-medium">
                {state?.error || `${Object.keys(errors).length} erreur${Object.keys(errors).length > 1 ? 's' : ''} détectée${Object.keys(errors).length > 1 ? 's' : ''}`}
              </span>
            </div>
          )}
        </div>

        <div className="flex border-b border-white/20 mb-8">
          {STEPS.map((step, index) => (
            <button
              key={step.key}
              type="button"
              onClick={() => setCurrentStep(index)}
              className={`cursor-pointer py-2 px-4 border-b-2 font-medium text-sm ${currentStep === index
                ? 'border-blue-500 text-white'
                : 'border-transparent text-white/60 hover:text-white hover:border-white/30'
                }`}
            >
              <span className="flex items-center">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs mr-2 ${currentStep === index ? 'bg-blue-500 text-white' : 'bg-white/20 text-white/60'
                  }`}>
                  {index + 1}
                </span>
                {step.label}
              </span>
            </button>
          ))}
        </div>

        <FormProvider {...methods}>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Affichage conditionnel des composants */}
            {renderStep()}
          </form>
        </FormProvider>

        {/* Boutons de navigation entre étapes - Hors du formulaire */}
        <div className="flex justify-between pt-6">
          {currentStep === 0 ? (
            <button
              type="button"
              onClick={() => router.push('/admin/laundries')}
              className="py-2 px-4 cursor-pointer rounded-lg font-medium bg-white/20 text-white hover:bg-white/30 transition-colors duration-200"
            >
              Annuler
            </button>
          ) : (
            <button
              type="button"
              onClick={prevStep}
              className="py-2 px-4 cursor-pointer rounded-lg font-medium bg-white/20 text-white hover:bg-white/30 transition-colors duration-200"
            >
              Précédent
            </button>
          )}

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="py-2 px-4 cursor-pointer rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Suivant
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isTransitioning}
              className="py-2 px-4 cursor-pointer rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isTransitioning ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 