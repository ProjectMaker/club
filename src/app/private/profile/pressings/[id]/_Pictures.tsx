'use client';

import { PlusIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface PictureFile {
    fileName: string;
    contentType: string;
    data_url: string;
}

export default function LaundryPictures() {
    const { control, formState: { errors } } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'pictures'
    });

    const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
        console.log(acceptedFiles)
        if (rejectedFiles.length > 0) {
            const errorMessages = rejectedFiles.map(file => {
                if (file.errors[0]?.code === 'file-invalid-type') {
                    return `${file.file.name}: Type de fichier non supporté`;
                }
                return `${file.file.name}: Erreur inconnue`;
            });
            // Vous pouvez gérer les erreurs comme vous le souhaitez
            console.error(errorMessages.join(', '));
            return;
        }

        // Ajouter les nouveaux fichiers avec conversion en base64
        await Promise.all(
            acceptedFiles.map(async (file) => {
                const dataUrl = await new Promise<string>(resolve => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        return resolve(reader.result?.toString() || '');
                    };
                });

                const pictureFile: PictureFile = {
                    fileName: file.name,
                    contentType: file.type,
                    data_url: dataUrl
                };
                append(pictureFile);
            })
        );
    }, [append]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        }
    });

    const removeFile = (index: number) => {
        const currentField = fields[index];
        if (currentField) {
            remove(index);
        }
    };

    return (
        <div className="w-full">
            {/* Zone de drop */}
            <div
                {...getRootProps()}
                className={`
                        relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                        ${isDragActive
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-white/20 hover:border-white/30'
                    }
                    `}
            >
                <input {...getInputProps()} />
                <PhotoIcon className="mx-auto h-12 w-12 text-white/60" />
                <div className="mt-4 text-white">
                    <p className="text-sm font-medium">
                        {isDragActive ? (
                            'Déposez les images ici...'
                        ) : (
                            'Glissez-déposez vos images ici, ou cliquez pour sélectionner'
                        )}
                    </p>
                    <p className="text-xs mt-1 text-white/60">
                        PNG, JPG, GIF, WEBP
                    </p>
                </div>
            </div>
            {errors.pictures && (
                <p className="mt-1 text-sm text-red-300">{errors.pictures?.message?.toString()}</p>
            )}
            {/* Prévisualisation des images */}
            {fields.length > 0 && (
                <div className="mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {fields.map((field: any, index) => (
                            <div key={field.id} className="relative group">
                                <div className="aspect-square rounded-lg overflow-hidden bg-white/10">
                                    <img
                                        src={field.data_url}
                                        alt={`Prévisualisation ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Bouton de suppression */}
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute -top-2 -right-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <XMarkIcon className="h-4 w-4" />
                                </button>

                                {/* Indicateur de photo principale */}
                                {index === 0 && (
                                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                                        Photo principale
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Bouton d'ajout de photo */}
                        <div
                            {...getRootProps()}
                            className="h-48 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:border-white/30 transition-colors bg-white/5"
                        >
                            <div className="text-center">
                                <PlusIcon className="mx-auto h-8 w-8 text-white/60 mb-2" />
                                <p className="text-sm text-white/60">Ajouter une photo</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Conseils */}
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mt-6">
                <h4 className="text-blue-300 font-medium mb-2">Conseils pour de bonnes photos</h4>
                <ul className="text-sm text-blue-200 space-y-1">
                    <li>• Prenez des photos de l'extérieur et de l'intérieur</li>
                    <li>• Montrez les équipements et machines</li>
                    <li>• Assurez-vous que les photos soient bien éclairées</li>
                    <li>• La première photo sera utilisée comme photo principale</li>
                </ul>
            </div>
        </div>
    );
} 