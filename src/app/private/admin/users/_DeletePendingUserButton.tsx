'use client'

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePendingUser } from '@/actions/user-delete';
import { User } from '@/models';

type DeletePendingUserButtonProps = {
  user: User;
};

type DeletePendingUserModalProps = {
  user: User;
  onClose: () => void;
};

const getUserLabel = (user: User) => {
  const fullName = [user.firstname, user.lastname].filter(Boolean).join(' ');

  if (fullName) {
    return fullName;
  }

  return user.email || 'cet utilisateur';
};

const DeletePendingUserModal = ({ user, onClose }: DeletePendingUserModalProps) => {
  const queryClient = useQueryClient();
  const userLabel = getUserLabel(user);
  const mutation = useMutation({
    mutationFn: () => deletePendingUser({ userId: user.id }),
    onSuccess: (result) => {
      if (!result?.success) {
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['count-users'] });
      onClose();
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !mutation.isPending) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mutation.isPending, onClose]);

  if (typeof document === 'undefined') {
    return null;
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-pending-user-title"
        className="w-full max-w-md rounded-xl border border-white/20 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-sm"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/30 bg-red-500/20">
          <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833-.23 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 id="delete-pending-user-title" className="mb-2 text-lg font-semibold text-white">
          Confirmer la suppression
        </h3>
        <p className="mb-6 text-white/80">
          Êtes-vous sûr de vouloir supprimer l&apos;utilisateur en attente{' '}
          <span className="font-semibold text-white">&quot;{userLabel}&quot;</span> ?
          <br />
          Cette action est irréversible.
        </p>
        {mutation.data?.error && (
          <p className="mb-4 rounded-lg border border-red-400/30 bg-red-500/20 px-4 py-2 text-sm text-red-100">
            {mutation.data.error}
          </p>
        )}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={mutation.isPending}
            className="cursor-pointer rounded-lg border border-white/20 bg-white/10 px-6 py-2 font-medium text-white/90 transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={mutation.isPending}
            className="cursor-pointer rounded-lg border border-red-500/30 bg-red-600/80 px-6 py-2 font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {mutation.isPending ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default function DeletePendingUserButton({ user }: DeletePendingUserButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (user.is_approved) {
    return null;
  }

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <DeletePendingUserModal user={user} onClose={handleClose} />}
      <button
        type="button"
        onClick={handleOpen}
        aria-label={`Supprimer l'utilisateur en attente ${getUserLabel(user)}`}
        className="cursor-pointer text-sm font-medium text-red-400 transition-colors hover:text-red-300"
      >
        Supprimer
      </button>
    </>
  );
}
