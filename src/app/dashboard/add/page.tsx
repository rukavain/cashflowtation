"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { addExpense } from "../../../../lib/expenses";
import supabase from "../../../../lib/supabase";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js"; // Import User type
import Image from "next/image";
export default function Add() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [user, setUser] = useState<User | null>(null); // Correct type definition
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // Display loading state while fetching user

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/account"); // Redirect to login if no user is found
      } else {
        setUser(data.user); // Set the user if found
      }
    }

    fetchUser(); // Call the function
  }, [router]);
  if (user) {
    console.log("user console logged");
  }
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
      setLoading(false); // Set loading to false after fetching user
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.log("Error or no user found", error);
        router.push("/login"); // Redirect to login if no user is found
      } else {
        console.log("Authenticated user:", user); // Check the user details
        setUser(user); // Set the user if found
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(); // Fetch authenticated user

    if (error || !user) {
      console.error("Error fetching user:", error);
      return;
    }

    const expense = {
      name,
      description,
      category,
      price: parseFloat(price), // Convert price to a float
      user_id: user.id, // Use the correct user ID here
    };

    const { data, error: addExpenseError } = await addExpense(expense);
    if (addExpenseError) {
      console.error("Error adding expense:", addExpenseError);
    } else {
      console.log("Expense added:", data);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="m-6 flex flex-col justify-center items-center gap-8"
      >
        <div className="self-start flex justify-center items-center gap-4">
          <Link
            href={"/dashboard"}
            className="border-2 border-gray-300 min-w-max p-2 rounded-xl"
          >
            <Image
              src="/back-icon.png"
              alt="description"
              width={30}
              height={20}
            />
          </Link>
          <h1 className="font-bold text-xl">Add Expense</h1>
        </div>
        <div className="border-b-2 border-black flex flex-col justify-start items-center w-full px-10">
          <h1 className="text-gray-400 self-start mb-10 font-bold">Amount</h1>
          <div className="flex justify-between items-center w-full pb-8">
            {" "}
            <div className="flex gap-2 font-bold">
              <h1 className="text-3xl ">₱</h1>
              <input
                type="number"
                placeholder="150.00"
                className="text-5xl max-w-44"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <h1>PHP</h1>
          </div>
        </div>
        <div className="flex flex-1  justify-between items-center w-full">
          <h1 className="text-gray-600 font-bold">Expense Category</h1>
          <input
            className="w-full font-bold p-4 border border-gray-400 shadow-md rounded-xl"
            type="text"
            placeholder="Food"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 justify-start items-start w-full">
          <h1 className="text-gray-600 font-bold">Name</h1>
          <input
            className="w-full font-bold p-4 border border-gray-400 shadow-md rounded-xl"
            type="text"
            placeholder="Hangout with friends"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 justify-start items-start w-full">
          <h1 className="text-gray-600 font-bold">Description</h1>
          <input
            className="w-full font-bold p-4 border border-gray-400 shadow-md rounded-xl"
            type="text"
            placeholder="Meeting and snacks with Viktor"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className=" bg-gray-900  text-white font-thin text-xl rounded-md p-4 w-full max-w-md"
        >
          Add Expense
        </button>
      </form>
    </>
  );
}
