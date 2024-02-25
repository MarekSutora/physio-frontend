import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/lib/utils";

type Props = {
  isVisible: boolean;
  onHide: () => void;
  performAction: () => Promise<void>;
  successToastText: string;
  errorToastTest: string;
};

const CustomConfirmDialog = ({
  isVisible,
  onHide,
  performAction,
  successToastText,
  errorToastTest,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await performAction();
      toast({
        variant: "success",
        title: " 🎉 " + successToastText + " 🎉",
        className: "text-lg",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: errorToastTest + " 🙁",
        description: getErrorMessage(error) + " 🙄",
        className: "text-lg",
      });
    } finally {
      setIsLoading(false);
      onHide(); // Close the dialog
    }
  };

  const dialogFooter = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={onHide}
        className="p-button-text"
      />
      <Button
        label="Confirm"
        icon="pi pi-check"
        onClick={handleConfirm}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <>
      <Dialog
        header="Confirmation"
        visible={isVisible}
        style={{ width: "350px" }}
        footer={dialogFooter}
        onHide={onHide}
      >
        <p>Are you sure you want to perform this action?</p>
        {isLoading && <p>Loading...</p>} {/* Display loading indicator */}
      </Dialog>
    </>
  );
};

export default CustomConfirmDialog;
