"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+
import Link from "next/link";
import supabase from "../../../lib/supabase";
import { getExpenses } from "../../../lib/expenses";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Fetch the current user
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        router.push("/login"); // Redirect to login if no user is found
      } else {
        setUser(user); // Set the user if found
      }
    };

    fetchUser();
  }, [router]);

  // Fetch expenses when the user is authenticated
  useEffect(() => {
    if (user) {
      const fetchExpenses = async () => {
        const { data, error } = await getExpenses(user.id);
        if (error) {
          console.error("Error fetching expenses:", error);
        } else {
          setExpenses(data);
          setTotalSpent(data.reduce((sum, expense) => sum + expense.price, 0)); // Calculate total spent
        }
      };

      fetchExpenses();
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>; // or a spinner while checking authentication
  }

  return (
    <main className="flex mx-6 my-2 flex-col justify-evenly items-center gap">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-4 justify-center items-center">
          <img className="h-10" src="/hamburger.png" alt="" />
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
            <h1 className="text-5xl">${totalSpent}</h1>
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
        {expenses.map((expense) => (
          <a
            key={expense.id}
            className="w-full flex justify-between items-center shadow-lg bg-gray-250 rounded-xl p-3"
          >
            <div className=" flex justify-center items-center gap-4">
              <div className="p-3 rounded-md bg-gray-300 border border-gray-400">
                <img className="h-8" src={expense.image} alt="" />
              </div>
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
        ))}
      </div>
      <div className="sticky bottom-4 right-4 self-end">
        <Link
          href={"/dashboard/add"}
          className=" bg-gray-300 border-2 border-gray-600 rounded-full p-4 flex"
        >
          <img className="h-8" src="/add.png" alt="" />
        </Link>
      </div>
    </main>
  );
}
