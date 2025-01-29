"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js 13+ usage
import Link from "next/link";
import supabase from "../../../../lib/supabase"; // For supabase client
import { signUpWithEmail, signInWithProvider } from "../../../../lib/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push("/dashboard"); // Redirect to the dashboard if user is logged in
      }
    };

    checkUser();
  }, [router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { user, error } = await signUpWithEmail(email, password);
    if (error) {
      setError(error.message);
    } else {
      console.log("Registered:", user);
    }
    if (user) {
      // If logged in, redirect to dashboard
      router.push("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    const { user, error } = await signInWithProvider("google");
    if (error) {
      setError(error.message);
    } else {
      console.log("Logged in with Google:", user);
      router.push("/dashboard");
    }
  };

  const handleGitHubLogin = async () => {
    const { user, error } = await signInWithProvider("github");
    if (error) {
      setError(error.message);
    } else {
      console.log("Logged in with GitHub:", user);
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex flex-col justify-between items-center rounded-md p-5 h-svh mx-4">
      <div className="self-start">
        <Link
          href={"/account"}
          className="border-2 border-gray-300 min-w-max p-2 rounded-xl flex"
        >
          <img className="h-6" src="/back-icon.png" alt="" />
        </Link>
      </div>
      <h1 className="text-4xl font-semibold text-left">
        Hello! Register to get started
      </h1>
      <div className="gap-5 flex flex-col justify-center items-center w-full ">
        <form
          onSubmit={handleRegister}
          className="flex-1 w-full gap-3 flex flex-col"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 rounded-md bg-gray-300 w-full py-4 px-3"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 rounded-md bg-gray-300 w-full py-4 px-3"
            placeholder="Password"
            required
          />
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
              <img
                className="h-10 flex justify-center items-center"
                src="/google-icon.png"
                alt="Google Login"
              />
            </button>
            <button
              onClick={handleGitHubLogin}
              className="flex-1 border border-gray-400 rounded-md p-2 flex justify-center items-center h-full"
            >
              <img className="h-10" src="/github-icon.png" alt="GitHub Login" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm">
          Already have an account? <span className="font-bold"> Login now</span>
        </p>
      </div>
    </main>
  );
}
