'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function LaundryMaterials() {
    const { watch, setValue, formState: { errors } } = useFormContext();
    const [newMaterial, setNewMaterial] = useState('');
    
    const materials = watch('materials') || [];

    const addMaterial = () => {
        if (newMaterial.trim() && !materials.includes(newMaterial.trim())) {
            setValue('materials', [...materials, newMaterial.trim()]);
            setNewMaterial('');
        }
    };

    const removeMaterial = (index: number) => {
        const updatedMaterials = materials.filter((_: any, i: number) => i !== index);
        setValue('materials', updatedMaterials);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addMaterial();
        }
    };
    console.log(materials)
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-6">Matériaux disponibles</h2>
            
            {/* Ajout de matériel */}
            <div>
                <label htmlFor="newMaterial" className="block text-sm font-medium text-white mb-2">
                    Ajouter un matériel
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        id="newMaterial"
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: Lave-linge industriel Miele"
                    />
                    <button
                        type="button"
                        onClick={addMaterial}
                        disabled={!newMaterial.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-white/20 disabled:cursor-not-allowed flex items-center"
                    >
                        <PlusIcon className="h-5 w-5" />
                    </button>
                </div>
                <p className="mt-1 text-sm text-white/60">
                    Appuyez sur Entrée ou cliquez sur + pour ajouter le matériel
                </p>
            </div>

            {/* Liste des matériaux */}
            <div>
                <h3 className="text-lg font-medium text-white mb-4">
                    Matériaux ajoutés ({materials.length})
                </h3>
                
                {materials.length === 0 ? (
                    <div className="text-center py-8 text-white/60">
                        <p>Aucun matériel ajouté pour le moment.</p>
                        <p className="text-sm mt-2">Ajoutez des matériaux pour décrire les équipements disponibles dans la laverie.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {materials.map((material: { name: string }, index: number) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-white/10 border border-white/20 rounded-md"
                            >
                                <span className="text-white flex-1">{material.name}.</span>
                                <button
                                    type="button"
                                    onClick={() => removeMaterial(index)}
                                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                    title="Supprimer ce matériel"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Suggestions de matériaux */}
            <div>
                <h3 className="text-lg font-medium text-white mb-4">Suggestions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                        'Lave-linge industriel',
                        'Sèche-linge industriel',
                        'Essoreuse',
                        'Table de pliage',
                        'Chariot à linge',
                        'Système de paiement',
                        'Distributeur de lessive',
                        'Caisse enregistreuse',
                        'Système de surveillance'
                    ].map((suggestion) => (
                        <button
                            key={suggestion}
                            type="button"
                            onClick={() => {
                                if (!materials.includes(suggestion)) {
                                    setValue('materials', [...materials, {name: suggestion}]);
                                }
                            }}
                            disabled={materials.includes(suggestion)}
                            className="cursor-pointer px-3 py-2 text-sm bg-white/10 text-white/80 rounded-md hover:bg-white/20 transition-colors disabled:bg-white/5 disabled:text-white/30 disabled:cursor-not-allowed"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>

            {/* Erreur */}
            {errors.materials && (
                <p className="text-sm text-red-600">{errors.materials?.message?.toString()}</p>
            )}
        </div>
    );
} 