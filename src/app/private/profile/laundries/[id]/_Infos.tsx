'use client';

import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import Select from '@/components/ui/Select';
import Text from '@/components/ui/Text';

export default function LaundryInfos() {
    const { register, formState: { errors }, control } = useFormContext();

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-6">Informations de la laverie</h2>
            
            {/* Nom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <Text
                    {...register('name')}
                    type="text"
                    label="Nom du pressing"
                    required
                    size="sm"
                    placeholder="Saisir le nom du pressing"
                    error={errors.name?.message?.toString()}
                />
                </div>
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
                                { value: 'reserved', label: 'Réservée' },
                                { value: 'sold', label: 'Vendue' }
                            ]}
                            error={errors.status?.message?.toString()}
                        />
                    )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Text
                        {...register('postal_code')}
                        type="text"
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
                        label="Ville"
                        required
                        size="sm"
                        placeholder="Saisir la ville"
                        error={errors.city?.message?.toString()}
                    />
                </div>
            </div>

            
            {/* Surface, Loyer et Prix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <Text
                        {...register('surface', { valueAsNumber: true })}
                        type="text"
                        label="Surface (m²)"
                        required
                        size="sm"
                        placeholder="Ex: 150"
                        error={errors.surface?.message?.toString()}
                    />
                </div>

                <div>
                    <Text
                        {...register('rent', { valueAsNumber: true })}
                        type="text"
                        label="Loyer mensuel (€)"
                        required
                        size="sm"
                        placeholder="Ex: 2500"
                        error={errors.rent?.message?.toString()}
                    />
                </div>

                <div>
                    <Text
                        {...register('price', { valueAsNumber: true })}
                        name="price"
                        label="Prix de vente (€)"
                        required
                        size="sm"
                        placeholder="Ex: 85000"
                        error={errors.price?.message?.toString()}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                    Description <span className="text-red-400">*</span>
                </label>
                <textarea
                    {...register('description')}
                    id="description"
                    name="description"
                    rows={10}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez la laverie, ses équipements, ses particularités..."
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-300">{errors.description?.message?.toString()}</p>
                )}
            </div>
        </div>
    );
} 