// import { useState } from "react";
// import { Button } from "../components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../components/ui/dialog";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import { Textarea } from "./ui/textarea";
// import { useRouter } from "next/router";

// export function CreateDialog() {
//   const router = useRouter();
//   const handleCreate = async (e) => {
//     const { id } = JSON.parse(localStorage.getItem("data"));
//     const formData = new FormData(e.currentTarget);
//     const title = formData.get("title");
//     const description = formData.get("description");

//     await fetch("/api/bulletin/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, description, id }),
//     });
//   };
//   return (
//     <DialogContent className="sm:max-w-[425px]">
//       <DialogHeader>
//         <DialogTitle>Create Bulletin</DialogTitle>
//         <DialogDescription>Create your bulletin</DialogDescription>
//       </DialogHeader>
//       <form onSubmit={handleCreate} className="grid gap-4 py-4">
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="title" className="text-right">
//             Title
//           </Label>
//           <Input id="title" name="title" className="col-span-3" required />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="description" className="text-right">
//             Description
//           </Label>
//           <Textarea
//             name="description"
//             placeholder="Type your message here."
//             required
//           />
//         </div>
//         <DialogFooter>
//           <DialogTrigger asChild>
//             <Button type="submit">Save changes</Button>
//           </DialogTrigger>
//         </DialogFooter>
//       </form>
//     </DialogContent>
//   );
// }
