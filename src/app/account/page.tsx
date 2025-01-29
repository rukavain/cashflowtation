export default function Account() {
  return (
    <main className="flex flex-col justify-evenly items-center rounded-md p-5 h-svh mx-8">
      <div className="flex flex-col justify-center items-center">
        <img src="/app-logo.png" alt="" />
        <h1 className="font-thin text-gray-600 text-xl">
          Your wallet, organized.
        </h1>
      </div>
      <div className="flex justify-center items-center w-full max-w-xl flex-col gap-4">
        <button className=" bg-gray-950 text-white font-thin text-xl rounded-md p-4 w-full">
          Sign up
        </button>

        <h1 className="text-sm text-gray-600 font-thin">
          Already have an account?
        </h1>
        <button className=" border-2 border-gray-700 text-gray-950 font-thin text-xl rounded-md p-4 w-full max-w-md">
          Log in
        </button>
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
