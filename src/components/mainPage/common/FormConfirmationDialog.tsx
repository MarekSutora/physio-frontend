import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";

type FormConfirmationDialogProps = {
  onConfirm: (...args: any[]) => Promise<void>;
  confirmArgs?: any[];
  dialogTitle?: string;
  dialogDescription?: string;
  isOpen: boolean;
  onClose: () => void;
};

const FormConfirmationDialog = ({
  onConfirm,
  confirmArgs = [],
  dialogTitle = "Ste si istý, že chcete vykonat túto akciu?",
  dialogDescription = "",
  isOpen,
  onClose,
}: FormConfirmationDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(...confirmArgs);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
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
            <AlertDialogFooter className="m-auto flex w-full flex-row gap-4 items-center justify-center">
              <AlertDialogCancel
                onClick={onClose}
                disabled={isLoading}
                className="border-[1px] mt-0 border-gray-500 text-black"
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
  );
};

export default FormConfirmationDialog;
