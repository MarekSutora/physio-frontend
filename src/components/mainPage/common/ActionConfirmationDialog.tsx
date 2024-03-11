import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/lib/utils";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  isVisible: boolean;
  onHide: () => void;
  performAction: () => any;
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

  const handleConfirm = () => {
    setIsLoading(true);
    try {
      performAction();
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
        {isLoading && (
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
        )}
      </Dialog>
    </>
  );
};

export default CustomConfirmDialog;
