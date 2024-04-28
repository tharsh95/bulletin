import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "./ui/button";

export function DropDown({ id }) {
  const data = JSON.parse(localStorage.getItem("data"));
  const loginId = data.id;
  const handleDelete = async (id) => {
    await fetch("/api/bulletin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, loginId }),
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button variant="outline">...</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <Link href={`/dashboard/${id}/edit`}>
            {" "}
            <button className="text-sm">Edit</button>
          </Link>
          <form onSubmit={() => handleDelete(id)}>
            <button className="text-sm">Delete</button>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
