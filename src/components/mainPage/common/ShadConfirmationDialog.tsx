import React, { useState } from "react";
import {
  AlertDialog,
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

type Props = {
  children: React.ReactNode;
  onConfirm: (...args: any[]) => Promise<void>;
  confirmArgs?: any[];
  dialogTitle?: string;
  dialogDescription?: string;
  isOpen?: boolean;
};

const ShadConfirmationDialog = ({
  children,
  onConfirm,
  confirmArgs = [],
  dialogTitle = "Ste si istý, že chcete vykonat túto akciu?",
  dialogDescription = "",
  isOpen = false,
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
              </AlertDialogHeader>{" "}
              <div className="m-auto flex flex-row items-center justify-center">
                <AlertDialogFooter className="sm:m-auto sm:flex sm:w-full sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                  <AlertDialogCancel
                    onClick={() => setOpen(false)}
                    disabled={isLoading}
                    className="mt-0 border-[1px] border-gray-500 text-black"
                  >
                    Zrušiť
                  </AlertDialogCancel>
                  <Button onClick={handleConfirm} disabled={isLoading}>
                    Potvrdiť
                  </Button>
                </AlertDialogFooter>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ShadConfirmationDialog;
