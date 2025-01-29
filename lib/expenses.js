import supabase from "./supabase";

export const addExpense = async (expense) => {
  const { data, error } = await supabase
    .from("expenses") // Make sure the 'expenses' table exists in your database
    .insert([expense]);

  return { data, error };
};
// lib/expenses.js

export const getExpenses = async (userId) => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId); // Fetch expenses for the logged-in user

  return { data, error };
};
