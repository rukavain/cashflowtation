// pages/auth/callback.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../lib/supabase";

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { user, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
      } else {
        console.log("Authenticated user:", user);
        // Redirect to the dashboard or another page
        router.push("/dashboard");
      }
    };

    handleAuth();
  }, [router]);

  return <div>Loading...</div>;
};

export default Callback;
