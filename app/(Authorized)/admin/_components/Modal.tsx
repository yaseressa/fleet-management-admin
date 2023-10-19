import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "./ui/dialog";
import { BsFillShieldLockFill } from "react-icons/bs";

const Modal = ({ title, message, ButtonIcon, buttonText, children }) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="flex justify-between cursor-pointer w-full">
          <h1>{buttonText}</h1>
          <ButtonIcon className="text-xl" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-rock text-primary">{title}</DialogTitle>
          <DialogDescription className="font-rock pt-4 flex flex-col justify-center items-center">
            <h3 className="font-bold text-lg ">
              <BsFillShieldLockFill className="text-secondary text-3xl" />
            </h3>
            <p className="py-5 text-lg">{message}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="font-rock">
          <div className="flex gap-5 justify-end items-center text-sm">
            {children}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
