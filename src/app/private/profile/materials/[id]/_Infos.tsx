'use client';

import { useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { parseDate } from '@internationalized/date';

import { calculateMaterialPrices } from '@/utils/functions';
import { MATERIAL_SUBCATEGORIES, MATERIAL_BRANDS, MATERIAL_CATEGORIES } from '@/utils/constants';
import Select from '@/components/ui/Select';
import Text from '@/components/ui/Text';
import DatePicker from '@/components/ui/DatePicker';

export default function MaterialInfos() {
  const { register, formState: { errors }, control, watch, setValue } = useFormContext();
  const quantity = watch('quantity');
  const price = watch('price');
  const category = watch('category');

  const subcategories = useMemo(() => {
    return category
      ? MATERIAL_SUBCATEGORIES.filter(item => item.category === category).map(({ name, label }) => ({ value: name, label }))
      : []
  }, [category])

  const prices = useMemo(() => {
    return calculateMaterialPrices({ price, quantity })
  }, [price, quantity])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">Informations du matériel</h2>

      {/* Nom */}

      <div>
        <Controller
          name="availability_date"
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value ? parseDate(field.value) : null}
              label="Date de disponibilité"
              onChange={(value) => {
                field.onChange(value?.toString() || '')
              }}
              required
            />
          )}
        />
        {errors.availability_date && (
          <p className="mt-1 text-sm text-red-600">{errors.availability_date?.message?.toString()}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                id="category"
                value={field.value || ''}
                onChange={(value) => {
                  field.onChange(value)
                  setValue('subcategory', '', { shouldValidate: true })
                }}
                required
                label="Catégorie"
                size="sm"
                options={MATERIAL_CATEGORIES.map(({ name, label }) => ({ value: name, label }))}
                error={errors.category?.message?.toString()}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="subcategory"
            control={control}
            render={({ field }) => (
              <Select
                id="subcategory"
                value={field.value || ''}
                onChange={(value) => field.onChange(value)}
                required
                label="Sous catégorie"
                size="sm"
                options={subcategories}
                error={errors.subcategory?.message?.toString()}
              />
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <Select
                id="brand"
                value={field.value || ''}
                onChange={(value) => field.onChange(value)}
                required
                label="Marque"
                size="sm"
                options={MATERIAL_BRANDS.map(({ name, label }) => ({ value: name, label }))}
                error={errors.brand?.message?.toString()}
              />
            )}
          />
        </div>

        <div>
          <Text
            {...register('model')}
            type="text"
            id="model"
            name="model"
            label="Modèle"
            required
            size="sm"
            placeholder="Saisir le modèle"
            error={errors.model?.message?.toString()}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Text
            {...register('year', { valueAsNumber: true })}
            id="year"
            name="year"
            label="Année"
            required
            size="sm"
            placeholder="Saisir l'année"
            error={errors.year?.message?.toString()}
          />
        </div>

        <div>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                id="status"
                value={field.value || ''}
                onChange={(value) => field.onChange(value)}
                required
                label="Statut"
                size="sm"
                options={[
                  { value: 'available', label: 'Disponible' },
                  { value: 'reserved', label: 'Réservé' },
                  { value: 'sold', label: 'Vendu' }
                ]}
                error={errors.status?.message?.toString()}
              />
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Text
            {...register('postal_code')}
            type="text"
            id="postal_code"
            name="postal_code"
            label="Code postal"
            required
            size="sm"
            placeholder="Ex: 75001"
            error={errors.postal_code?.message?.toString()}
          />
        </div>

        <div>
          <Text
            {...register('city')}
            type="text"
            id="city"
            name="city"
            label="Ville"
            size="sm"
            required
            placeholder="Saisir la ville"
            error={errors.city?.message?.toString()}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Text
            {...register('price', { valueAsNumber: true })}
            type="text"
            label="Prix unitaire HT (€)"
            size="sm"
            required
            placeholder="0"
            error={errors.price?.message?.toString()}
          />
        </div>

        <div>
          <Text
            {...register('quantity', { valueAsNumber: true })}
            type="text"
            label="Quantité"
            size="sm"
            required
            placeholder="1"
            error={errors.quantity?.message?.toString()}
          />
        </div>
      </div>

      {/* Prix total HT (calculé automatiquement) */}
      <div>
        <Text
          type="text"
          value={prices.total.toString()}
          label="Prix total HT (€) - Calculé automatiquement"
          size="sm"
          disabled
        />
      </div>

      {/* Service club-laverie HT */}
      <div>
        <Text
          type="text"
          size="sm"
          label="Service club-laverie HT (€) - À la charge de l'acheteur"
          value={prices.com.toString()}
          disabled
        />
      </div>

      {/* Prix de vente HT (calculé automatiquement) */}
      <div>
        <Text
          type="text"
          value={prices.sales.toString()}
          label="Prix de vente HT (€) - Frais inclus - Calculé automatiquement"
          size="sm"
          disabled
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm text-white font-semibold text-gray-700 mb-2">
          Description - Décrivez l'état général du matériel et ses caractéristiques
        </label>
        <textarea
          {...register('infos')}
          rows={8}
          placeholder="Décrivez l'état général du matériel et ses caractéristiques..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-vertical"
        />
        {errors.infos && (
          <p className="mt-1 text-sm text-red-600">{errors.description?.message?.toString()}</p>
        )}
      </div>
    </div>
  )
}