import Link from "next/link";
import Image from "next/image";
export default function Account() {
  return (
    <main className="flex flex-col justify-evenly items-center rounded-md p-5 h-svh mx-8">
      <div className="flex flex-col justify-center items-center">
        <Image src="/app-logo.png" alt="description" width={500} height={300} />
        <h1 className="font-thin text-gray-600 text-xl">
          Your wallet, organized.
        </h1>
      </div>
      <div className="flex justify-center items-center w-full max-w-xl flex-col gap-4">
        <Link
          href={"/account/register"}
          className=" bg-gray-950 text-white text-center font-thin text-xl rounded-md p-4 w-full"
        >
          Sign up
        </Link>

        <h1 className="text-sm text-gray-600 font-thin">
          Already have an account?
        </h1>
        <Link
          href={"/account/login"}
          className="text-gray-950 border text-center border-gray-500 font-thin text-xl rounded-md p-4 w-full"
        >
          Log in
        </Link>
      </div>
      <div>
        <p className="text-sm text-center text-gray-600">
          By using this app, you agree to Cashflowtations Terms of Use and
          Privacy Policy.
        </p>
      </div>
    </main>
  );
}
