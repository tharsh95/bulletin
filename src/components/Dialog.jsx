import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
// import { Label } from "@/components/ui/label"

export function DialogDemo({ title, description ,date}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className="break-all">{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter className={"text-gray-900 text-sm"}>{date}</DialogFooter>
    </DialogContent>
  );
}
