import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("login", data);
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json);
      }

      navigate("/todo");
      console.log("login success", res);
    } catch (error) {
      console.log("login error", error);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Register
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label className="sr-only">Full Name</label>
              <input
                type="fullName"
                name="fullName"
                placeholder="Full Name"
                className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                autoComplete="fullName"
                {...register("fullName")}
              />
            </div>
          </div>

          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label className="sr-only">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                autoComplete="email"
                {...register("email")}
              />
            </div>
          </div>

          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label className="sr-only">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                autoComplete="email"
                {...register("password")}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-wait"
            >
              SIGN IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
