import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditForm = ({ bulletin }) => {
  const router = useRouter();
  const { id } = router.query

  const handleCreate = async (e) => {
    e.preventDefault();
    const data =  JSON.parse(localStorage.getItem("data"));
    const loginId=data.id
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");
    try {
      const res = await fetch("/api/bulletin/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, id,loginId }),
      });
      const data = await res.json();
      if (data.code) {
        router.push("/dashboard");
      }
      else{
toast(data.message)
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-[100%]">
      <ToastContainer/>
      <h1 className="text-2xl font-bold">Edit Bulletin</h1>
      <form onSubmit={handleCreate} className="grid gap-4 py-8">
        <div className>
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            defaultValue={bulletin.title}
            required
          />
        </div>
        <div className="">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            name="description"
            defaultValue={bulletin.description}
            placeholder="Type your message here."
            required
          />
        </div>
        <Button type="submit">Edit Bulletin</Button>
      </form>
    </div>
  );
};

export default EditForm;
