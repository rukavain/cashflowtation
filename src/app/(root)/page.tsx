"use client";

import Image from "next/image";
import Link from "next/link";
import supabase from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = supabase.auth.getUser();
  const router = useRouter();

  return (
    <div>
      {user ? (
        <button onClick={() => router.push("/dashboard")}>go to app</button>
      ) : (
        <Link href={"/account"}>Proceed with the app</Link>
      )}
    </div>
  );
}
