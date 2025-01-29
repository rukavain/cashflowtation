import supabase from "./supabase";

// Sign up with email/password
export const signUpWithEmail = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { user, error };
};

// Sign in with email/password
export const signInWithEmail = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user, error };
};

// Sign in with OAuth provider (Google, GitHub, etc.)
export const signInWithProvider = async (provider) => {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider,
  });
  return { user, error };
};

// Sign out
export const signOut = async () => {
  await supabase.auth.signOut();
};
