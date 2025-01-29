"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // use "next/navigation" for Next.js 13+
import Link from "next/link";
import supabase from "../../../../lib/supabase"; // For supabase client
import { signInWithEmail } from "../../../../lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // For holding the authenticated user
  const [isMounted, setIsMounted] = useState(false); // State to check if component is mounted
  const router = useRouter();

  // Ensures that the code runs on the client after mounting
  useEffect(() => {
    setIsMounted(true); // Mark component as mounted
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Don't run this on the server-side

    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        router.push("/dashboard"); // Redirect to the dashboard if user is logged in
      }
    };

    checkUser();
  }, [isMounted, router]);

  // Handle email login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const { user, error } = await signInWithEmail(email, password);
    if (error) {
      setError(error.message);
    } else {
      setUser(user);
      router.push("/dashboard"); // Redirect to the dashboard after successful login
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setError(error.message);
    } else if (user) {
      setUser(user);
      router.push("/dashboard"); // Redirect to the dashboard after successful login
    }
  };

  // Handle GitHub login
  const handleGitHubLogin = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      setError(error.message);
    } else if (user) {
      setUser(user);
      router.push("/dashboard"); // Redirect to the dashboard after successful login
    }
  };

  if (!isMounted) return null; // Prevent rendering the component until mounted on the client

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
