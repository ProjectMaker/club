"use server";

import { revalidatePath } from "next/cache";

import { createServiceClient } from "@/lib/supabase-service";
import { checkIsAdmin } from "@/utils/auth";

type DeletePendingUserInput = {
  userId: string;
};

export async function deletePendingUser({ userId }: DeletePendingUserInput) {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    return {
      success: false,
      error: "Vous n'avez pas les droits pour supprimer un utilisateur.",
    };
  }

  if (!userId) {
    return { success: false, error: "L'utilisateur est introuvable." };
  }

  const supabase = await createServiceClient();
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, is_approved")
    .eq("id", userId)
    .single();

  if (userError || !user) {
    return { success: false, error: "L'utilisateur est introuvable." };
  }

  if (user.is_approved) {
    return {
      success: false,
      error: "Seuls les utilisateurs en attente peuvent être supprimés.",
    };
  }

  const deleteUserProfile = async () =>
    supabase.from("users").delete().eq("id", userId).eq("is_approved", false);

  const { error: deleteAuthError } =
    await supabase.auth.admin.deleteUser(userId);

  if (deleteAuthError) {
    const shouldRetryAfterProfileDelete = deleteAuthError.message
      .toLowerCase()
      .includes("database error");

    if (!shouldRetryAfterProfileDelete) {
      return { success: false, error: deleteAuthError.message };
    }

    const { error: deleteUserError } = await deleteUserProfile();

    if (deleteUserError) {
      return { success: false, error: deleteUserError.message };
    }

    const { error: retryDeleteAuthError } =
      await supabase.auth.admin.deleteUser(userId);

    if (retryDeleteAuthError) {
      return { success: false, error: retryDeleteAuthError.message };
    }
  } else {
    const { error: deleteUserError } = await deleteUserProfile();

    if (deleteUserError) {
      return { success: false, error: deleteUserError.message };
    }
  }

  revalidatePath("/private/admin/users", "page");

  return { success: true };
}
