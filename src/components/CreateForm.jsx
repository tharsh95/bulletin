import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

const CreateForm = () => {
  const router = useRouter();
  const handleCreate = async (e) => {
    e.preventDefault();
    const { id } = JSON.parse(localStorage.getItem("data"));
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");
    try {
      const res = await fetch("/api/bulletin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, id }),
      });
      const data = await res.json();
      if (data.code) {
        router.push("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-[100%]">
      <h1 className="text-2xl font-bold">Create Bulletin</h1>
      <form onSubmit={handleCreate} className="grid gap-4 py-8">
        <div className>
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input id="title" name="title" required />
        </div>
        <div className="">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            name="description"
            placeholder="Type your message here."
            required
          />
        </div>
        <Button type="submit">Create Bulletin</Button>
      </form>
    </div>
  );
};

export default CreateForm;
