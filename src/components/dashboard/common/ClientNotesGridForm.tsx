import React, { useState } from "react";
import DashboardSectionWrapper from "./DashboardSectionWrapper";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TClientNote } from "@/lib/shared/types";
import { Button } from "@/components/ui/button";
import { Data } from "@react-google-maps/api";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { ca } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { set } from "date-fns";
import {
  addNoteToClient,
  deleteNoteFromClient,
} from "@/lib/actions/clientsActions";
import { text } from "stream/consumers";
import { FilterMatchMode } from "primereact/api";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ShadConfirmationDialog from "@/components/mainPage/common/logo/ShadConfirmationDialog";

type Props = {
  clientNotes: TClientNote[];
  clientId: number;
};

const defaultFilters: DataTableFilterMeta = {
  note: { value: null, matchMode: FilterMatchMode.CONTAINS },
  createdAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const ClientNotesGridForm = ({ clientNotes, clientId }: Props) => {
  const [clientNotesState, setClientNotesState] =
    useState<TClientNote[]>(clientNotes);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const handleAddNote = async () => {
    try {
      const newNote: TClientNote = {
        note: note,
        clientId: clientId,
        createdAt: new Date(Date.now()),
      };

      await addNoteToClient(newNote);

      toast({
        variant: "success",
        title: "Uspech",
        description: "Uspech",
        className: "text-lg",
      });

      setNote("");
      setClientNotesState([...clientNotesState, newNote]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Neuspech",
        className: "text-lg",
      });
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      await deleteNoteFromClient(noteId);

      toast({
        variant: "success",
        title: "Uspech",
        description: "Uspech",
        className: "text-lg",
      });

      const updatedClientNotes = clientNotesState.filter(
        (note) => note.id !== noteId,
      );

      setClientNotesState(updatedClientNotes);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Neuspech",
        className: "text-lg",
      });
    }
  };

  const actionBodyTemplate = (rowData: TClientNote) => {
    return (
      <div className="flex flex-row gap-1">
        <Dialog>
          <DialogTrigger>
            <Button>Otvorit</Button>
          </DialogTrigger>
          <DialogContent contentEditable={false}>
            <Label htmlFor="note">{formatDate(rowData.createdAt!)}</Label>
            <Textarea
              className="h-auto min-h-80 w-full"
              id="note"
              value={rowData.note}
              readOnly={true}
              unselectable="on"
            />
          </DialogContent>
        </Dialog>
        <ShadConfirmationDialog
          onConfirm={handleDeleteNote}
          confirmArgs={[rowData.id]}
        >
          <Button variant="destructive">Odstranit</Button>
        </ShadConfirmationDialog>
      </div>
    );
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  return (
    <DashboardSectionWrapper title="Poznamky ku klientovi" height="h-full">
      <Label htmlFor="note">Poznamka</Label>
      <Textarea
        className="h-28 w-full"
        id="note"
        onChange={(e) => setNote(e.target.value)}
        autoFocus={true}
      />
      <Button className="mt-2 w-full" onClick={handleAddNote}>
        Pridat poznamku
      </Button>
      <DataTable
        value={clientNotesState}
        className="w-full max-w-full"
        paginator
        rows={7}
        emptyMessage="Nenasli sa ziadne poznamky"
        filterLocale="sk"
        dataKey="id"
        size="small"
        showHeaders
        filters={defaultFilters}
        sortField="createdAt"
        sortOrder={-1}
      >
        <Column
          field="note"
          header="Poznamka"
          style={{
            width: "74%",
            maxWidth: "400px",
            textWrap: "wrap",
            overflowWrap: "break-word",
            wordBreak: "break-all",
          }}
          body={(rowData: TClientNote) =>
            rowData.note.substring(0, 100) + "..."
          }
          filter
          filterField="note"
        />
        <Column
          field="createdAt"
          header="Vytvorene"
          body={(rowData: TClientNote) => formatDate(rowData.createdAt!)}
          style={{ width: "10%" }}
          sortable
          filter
          filterField="createdAt"
        />
        <Column
          field="id"
          header="Akcia"
          body={actionBodyTemplate}
          style={{ width: "14%" }}
        />
      </DataTable>
    </DashboardSectionWrapper>
  );
};

export default ClientNotesGridForm;
