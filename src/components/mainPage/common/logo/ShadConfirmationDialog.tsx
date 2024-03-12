import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";

// Update the Props type to include onConfirm
type Props = {
  children: React.ReactNode;
  onConfirm: (...args: any[]) => Promise<void>; // The async function to be called on confirm
  confirmArgs?: any[]; // Arguments to be passed to the onConfirm function
  dialogTitle?: string; // Optional title for the dialog
  dialogDescription?: string; // Optional description for the dialog
};

const ShadConfirmationDialog = ({
  children,
  onConfirm,
  confirmArgs = [],
  dialogTitle = "Ste si istý, že chcete vykonat túto akciu?",
  dialogDescription = "",
}: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm(...confirmArgs);
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent className="rounded-sm">
          {isLoading ? (
            <ClipLoader
              color={"#298294"}
              loading={isLoading}
              cssOverride={{
                display: "block",
                margin: "0 auto",
              }}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">
                  {dialogTitle}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {dialogDescription}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="m-auto flex w-full flex-row gap-4 sm:items-center sm:justify-center">
                <AlertDialogCancel
                  onClick={() => setOpen(false)}
                  disabled={isLoading}
                  className="border-[1px] border-gray-500 text-black"
                >
                  Zrušiť
                </AlertDialogCancel>
                <Button onClick={handleConfirm} disabled={isLoading}>
                  Potvrdiť
                </Button>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ShadConfirmationDialog;
