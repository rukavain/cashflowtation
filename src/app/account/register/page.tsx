export default function Register() {
  return (
    <main className="flex flex-col justify-between items-center border-2 rounded-md p-5 h-svh mx-4">
      <div className="self-start">
        <div className="border-2 border-gray-300 min-w-max p-2 rounded-xl">
          <img className="h-6" src="/back-icon.png" alt="" />
        </div>
      </div>
      <h1 className="text-4xl font-semibold text-left">
        Hello! Register to get started
      </h1>
      <div className="gap-5 flex flex-col justify-center items-center w-full ">
        <div className="flex-1 w-full gap-3 flex flex-col">
          <input
            type="text"
            className="border border-gray-400 rounded-md bg-gray-300 w-full py-4 px-3"
            placeholder="Username"
          />
          <input
            type="email"
            className="border border-gray-400 rounded-md bg-gray-300 w-full py-4 px-3"
            placeholder="Email"
          />
          <input
            type="password"
            className="border border-gray-400 rounded-md bg-gray-300 w-full py-4 px-3"
            placeholder="Password"
          />
          <input
            type="password"
            className="border border-gray-400 rounded-md bg-gray-300 w-full py-4 px-3"
            placeholder="Confirm password"
          />
          <h1 className="self-end text-sm text-gray-600">Forgot password?</h1>
          <button className=" bg-gray-900  text-white font-thin text-xl rounded-md p-4 w-full max-w-md">
            Log in
          </button>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-6">
          <div className="w-full flex justify-center items-center gap-2">
            <div className="border-t flex-1 border-gray-500"></div>
            <h1 className="text-sm  font-semibold text-gray-600">
              Or Login with
            </h1>
            <div className="border-t flex-1 border-gray-500"></div>
          </div>
          <div className="w-full flex gap-4 justify-center items-center">
            <div className="flex-1 border border-gray-400 rounded-md p-2 flex justify-center items-center">
              <img
                className="h-10 flex justify-center items-center"
                src="/google-icon.png"
                alt=""
              />
            </div>
            <div className="flex-1 border border-gray-400 rounded-md p-2 flex justify-center items-center h-full">
              <img className="h-10 " src="/github-icon.png" alt="" />
            </div>
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
