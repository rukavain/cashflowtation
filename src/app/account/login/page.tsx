"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // for nextjs 13+
import Link from "next/link";
import supabase from "../../../../lib/supabase"; // Import supabase client
import { signInWithEmail } from "../../../../lib/auth"; // Assuming this is your custom function

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false); // to ensure it's client-side

  const router = useRouter();

  // Handle user state and redirect if logged in
  useEffect(() => {
    setIsMounted(true); // Ensures this code only runs on the client

    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        // If the user is logged in, redirect to dashboard
        router.push("/dashboard");
      }
    };

    checkUser();
  }, [router]);

  if (!isMounted) return null; // Don't render on the server

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    const { user, error } = await signInWithEmail(email, password);

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard"); // Redirect to dashboard after login
    }
  };

  const handleGoogleLogin = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setError(error.message);
    } else if (user) {
      router.push("/dashboard"); // Redirect to dashboard after login
    }
  };

  const handleGitHubLogin = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      setError(error.message);
    } else if (user) {
      router.push("/dashboard"); // Redirect to dashboard after login
    }
  };

  return (
    <main className="flex flex-col justify-between items-center rounded-md p-5 h-svh mx-4">
      <div className="self-start">
        <Link
          href={"/account"}
          className="flex border-2 border-gray-300 min-w-max p-2 rounded-xl"
        >
          <img className="h-6" src="/back-icon.png" alt="" />
        </Link>
      </div>
      <h1 className="text-4xl font-semibold text-left">
        Welcome back! Glad to see you, Again
      </h1>
      <div className="gap-5 flex flex-col justify-center items-center w-full ">
        <form
          onSubmit={handleEmailLogin}
          className="flex-1 w-full gap-3 flex flex-col"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-400 rounded-md bg-gray-100 w-full py-4 px-3"
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-400 rounded-md bg-gray-100 w-full py-4 px-3"
            placeholder="Enter your password"
          />
          <h1 className="self-end text-sm text-gray-600">Forgot password?</h1>
          {error && <p>{error}</p>}
          <button
            type="submit"
            className="bg-gray-900 text-white font-thin text-xl rounded-md p-4 w-full max-w-md"
          >
            Log in
          </button>
        </form>
        <div className="flex flex-col w-full justify-center items-center gap-6">
          <div className="w-full flex justify-center items-center gap-2">
            <div className="border-t flex-1 border-gray-500"></div>
            <h1 className="text-sm font-semibold text-gray-600">
              Or Login with
            </h1>
            <div className="border-t flex-1 border-gray-500"></div>
          </div>
          <div className="w-full flex gap-4 justify-center items-center">
            <button
              onClick={handleGoogleLogin}
              className="flex-1 border border-gray-400 rounded-md p-2 flex justify-center items-center"
            >
              <img className="h-10" src="/google-icon.png" alt="Google" />
            </button>
            <button
              onClick={handleGitHubLogin}
              className="flex-1 border border-gray-400 rounded-md p-2 flex justify-center items-center h-full"
            >
              <img className="h-10" src="/github-icon.png" alt="GitHub" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm">
          Don't have an account? <span className="font-bold">Register now</span>
        </p>
      </div>
    </main>
  );
}
