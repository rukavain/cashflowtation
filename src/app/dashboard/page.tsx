"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+
import Link from "next/link";
import supabase from "../../../lib/supabase";
import Image from "next/image";
import { User } from "@supabase/supabase-js"; // Import User type
import { signOut } from "../../../lib/auth";

interface Expense {
  price: number;
  name: string;
  description: string;
  category: string;
  id: number;
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[] | null>(null); // Explicitly typing state
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null); // Correct type definition
  const router = useRouter();

  // Fetch the current user
  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/account/login"); // Redirect to login if no user is found
      } else {
        setUser(data.user); // Set the user if found
      }
    }

    fetchUser();
  }, [router]);

  useEffect(() => {
    async function fetchExpenses() {
      if (!user) return; // Ensure that user is defined before making the API call

      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id); // Pass user.id correctly

      if (error) {
        console.error("Error fetching expenses:", error);
      } else {
        setExpenses(data);
        setTotalSpent(
          data.reduce((sum: number, expense: Expense) => sum + expense.price, 0)
        );
      }
    }

    fetchExpenses();
  }, [user]); // Only run when user is available

  if (!user) {
    return <p>Loading...</p>; // or a spinner while checking authentication
  }

  return (
    <main className="flex mx-6 my-4 flex-col justify-evenly items-center gap">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-4 justify-center items-center">
          <Image
            src="/hamburger.png"
            alt="description"
            width={40}
            height={30}
          />

          <h1 className="font-bold text-xl">Dashboard</h1>
        </div>
        <div className="text-right font-bold text-xs">
          <h1>{user ? user.email : "Guest"}</h1>
        </div>
      </div>
      <div className="w-full my-12">
        <h1 className="py-4 font-bold text-gray-600">Total spent</h1>
        <div className="flex justify-between items-center py-12 bg-black text-white w-full rounded-3xl px-6">
          <div className="flex gap-4 font-bold justify-start items-center">
            <h1 className="text-3xl">₱</h1>
            <h1 className="text-5xl">{totalSpent}</h1>
          </div>
          <h1 className="font-bold text-md text-gray-500">PHP</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center flex-1 w-full ">
        <div className="flex justify-between items-center w-full mb-8">
          <h1 className="font-bold text-lg">All expenses</h1>
          <button className="py-2 px-4 bg-gray-300 rounded-xl font-bold text-gray-400">
            View all
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {expenses ? (
          expenses.map((expense) => (
            <a
              key={expense.id}
              className="w-full flex justify-between items-center shadow-lg bg-gray-250 rounded-xl p-3"
            >
              <div className=" flex justify-center items-center gap-4">
                <div>
                  <h1 className="font-bold">{expense.name}</h1>
                  <h1 className="text-xs font-semibold text-gray-500">
                    {expense.description}
                  </h1>
                </div>
              </div>
              <div>
                <h1 className="font-bold">
                  <span>₱</span>
                  {expense.price}
                </h1>
              </div>
            </a>
          ))
        ) : (
          <p>No expenses found.</p>
        )}
      </div>
      <div className="sticky bottom-4 right-4 self-end">
        <Link
          href={"/dashboard/add"}
          className=" bg-gray-300 border-2 border-gray-600 rounded-full p-4 flex"
        >
          <Image src="/add.png" alt="description" width={30} height={20} />
        </Link>
      </div>
      <form onSubmit={signOut}>
        <button type="submit">Log out</button>
      </form>
    </main>
  );
}
