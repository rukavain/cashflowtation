"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabase from "../../../lib/supabase";
import { User } from "@supabase/supabase-js"; // Import User type

export default function Home() {
  const [user, setUser] = useState<User | null>(null); // Define correct type
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user); // Now TypeScript knows user can be set correctly
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <button onClick={() => router.push("/dashboard")}>Go to app</button>
      ) : (
        <Link href={"/account"}>Proceed with the app</Link>
      )}
    </div>
  );
}
