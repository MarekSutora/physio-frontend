import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createClientBookedAppointmentAction } from "@/lib/actions/appointmentsActions";
import { getErrorMessage } from "@/lib/utils";
import { useAppointmentsStore } from "@/useAppointmentsStore";
import { useSession } from "next-auth/react";

type Props = {
  astdcId: number;
};

const ReserveAppointmentConfirmationDialog = ({ astdcId }: Props) => {
  const { removeAppointment } = useAppointmentsStore();
  const { data: session, status: isAuthenticated } = useSession();
  const { toast } = useToast();

  const tryBookAppointment = async (astdcId: number) => {
    if (isAuthenticated && session?.user.roles.includes("Client")) {
      try {
        await createClientBookedAppointmentAction(astdcId);
        removeAppointment(astdcId);
        toast({
          variant: "success",
          title: "Appointment created successfully!",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: getErrorMessage(error),
        });
      }
    } else {
      alert("Musíte byť prihlásený.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="text-md rounded-sm border border-secondary bg-white px-[6px]
                 py-[5px] font-semibold text-secondary shadow-lg transition-all ease-in-out hover:bg-secondary hover:text-slate-50"
        >
          Rezervovať
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader></DialogHeader>
        <DialogFooter>
          <Button onClick={() => tryBookAppointment(astdcId)}>Potvrdiť</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReserveAppointmentConfirmationDialog;
