'use client'

import { useState } from "react"

import { Pressing } from "@/models"
import DeleteModal from "./_DeleteModal"

export default function DeleteButton({ pressing }: { pressing: Pressing }) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      {openModal && <DeleteModal pressing={pressing} onClose={() => setOpenModal(false)} />}
      <button
        onClick={() => setOpenModal(true)}
        className="text-red-400 hover:text-red-300 text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {'Supprimer'}
      </button>
    </>
  )
}