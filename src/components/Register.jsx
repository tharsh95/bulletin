import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Image from "next/image";
import background from "../../public/background.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const user = await response.json();

    if (response.ok && user.code) {
      router.push("/login");
    } else {
      toast(user.message );
    }
  }

  return (
    <div className="flex">
      <ToastContainer />

      <div className="lg:w-1/3 sm:w-full w-full bg-white">
        <div className="flex flex-col items-center justify-center h-[49.8rem]">
        <div className="text-2xl font-bold ">
        <h1>Register</h1>
      </div>
          <form
            onSubmit={handleSubmit}
            className="w-[25rem] flex flex-col items-center"
          >
            <Input
              type="email"
              name="email"
              className="m-4"
              placeholder="Email"
            />
            <Input type="name" name="name" className="m-4" placeholder="Name" />
            <Input
              type="password"
              name="password"
              className="m-4"
              placeholder="Password"
            />
            <Button type="submit" className="m-4 w-[25rem]">
              Sign Up
            </Button>
          </form>
          <div>
            <span>Already have an Account?</span>
            <Link href={"/login"}>Login</Link>
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

export default Register;
