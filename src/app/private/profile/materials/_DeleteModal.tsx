'use client'

import { createPortal } from 'react-dom'
import { useState, useEffect, useActionState, useTransition } from 'react'

import { Material } from "@/models"
import { deleteMaterial } from '@/actions/material-delete';


interface DeleteModalProps {
  material: Material
  onClose: () => void
}

export default function DeleteModal({ material, onClose }: DeleteModalProps) {
  const [mounted] = useState(true)
  const [state, formAction] = useActionState(deleteMaterial, null);
  const [isTransitioning, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      formAction({ materialId: material.id })
    })
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
}, []);

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl max-w-md w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-500/30 mb-4">
            <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833-.23 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Confirmer la suppression
          </h3>
          <p className="text-white/80 mb-6">
            Êtes-vous sûr de vouloir supprimer le matériel{' '}
            <span className="font-semibold text-white">"{material?.model || material?.name}"</span> ?
            <br />
            Cette action est irréversible.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onClose}
              disabled={isTransitioning}
              className="px-6 py-2 text-white/90 cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              onClick={handleDelete}
              disabled={isTransitioning}
              className="px-6 py-2 bg-red-600/80 cursor-pointer hover:bg-red-600 text-white border border-red-500/30 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isTransitioning ? 'Suppression...' : 'Supprimer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  if (!mounted) {
    return null
  }

  return createPortal(modalContent, document.body)
}