import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Image from "next/image";
import background from "../../public/background.jpg";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const user = await response.json();
    if (user.code) {
      localStorage.setItem("data", JSON.stringify(user.data));
      router.push("/dashboard");
    } else {
      toast(user.message);
    }
  }
  return (
    <div className="flex">
      <ToastContainer />
 
      <div className="lg:w-1/3 s:w-full w-full bg-white">
        <div className="flex flex-col items-center justify-center h-[49.8rem]">
        <div className="text-2xl font-bold ">
        <h1>Login</h1>
      </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-[25rem]"
          >
            <Input
              type="email"
              name="email"
              className="m-4 "
              placeholder="Email"
            />
            <Input
              type="password"
              name="password"
              className="m-4"
              placeholder="Password"
            />
            <Button type="submit" className="m-4 w-[25rem]">
              Login
            </Button>
          </form>
          <div>
            <span>Doesn&apos;t have an Account?</span>
            <Link href={"/"}>Sign Up</Link>
          </div>
        </div>
      </div>
      <div>
        <div className="lg:block sm:hidden hidden">
          <Image
            src={background}
            alt="background"
            className=" h-[49.9rem]"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
