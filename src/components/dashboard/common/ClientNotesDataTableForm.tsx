import React, { useState } from "react";
import DashboardSectionWrapper from "./DashboardSectionWrapper";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TClientNote } from "@/lib/shared/types";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { useToast } from "@/components/ui/use-toast";
import {
  addNoteToClient,
  deleteNoteFromClient,
} from "@/lib/actions/clientsActions";
import { FilterMatchMode } from "primereact/api";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ShadConfirmationDialog from "@/components/mainPage/common/ShadConfirmationDialog";

type Props = {
  clientNotes: TClientNote[];
  personId: number;
};

const defaultFilters: DataTableFilterMeta = {
  note: { value: null, matchMode: FilterMatchMode.CONTAINS },
  createdAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const ClientNotesGridForm = ({ clientNotes, personId }: Props) => {
  const [clientNotesState, setClientNotesState] =
    useState<TClientNote[]>(clientNotes);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const handleAddNote = async () => {
    if (note.length > 10000) {
      return;
    }

    try {
      const newNote: TClientNote = {
        note: note,
        personId: personId,
        createdAt: new Date(Date.now()),
      };

      const noteId = await addNoteToClient(newNote);

      toast({
        variant: "success",
        title: "Poznámka bola úspešne pridaná.",
        className: "text-lg",
      });

      newNote.id = noteId;

      setClientNotesState([...clientNotesState, newNote]);
      setNote("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Poznámku sa nepodarilo pridať.",
        className: "text-lg",
      });
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      await deleteNoteFromClient(noteId);

      toast({
        variant: "success",
        title: "Poznámka bola úspešne odstránená.",
        className: "text-lg",
      });

      const updatedClientNotes = clientNotesState.filter(
        (note) => note.id !== noteId,
      );

      setClientNotesState(updatedClientNotes);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Poznámku sa nepodarilo odstrániť.",
        className: "text-lg",
      });
    }
  };

  const actionBodyTemplate = (rowData: TClientNote) => {
    return (
      <div className="flex flex-row gap-1">
        <Dialog>
          <DialogTrigger>
            <Button>Otvoriť</Button>
          </DialogTrigger>
          <DialogContent contentEditable={false}>
            <Label htmlFor="note">
              {new Date(rowData.createdAt!).toLocaleString("sk")}
            </Label>
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
          <Button variant="destructive">Odstrániť</Button>
        </ShadConfirmationDialog>
      </div>
    );
  };

  return (
    <DashboardSectionWrapper title="Poznamky ku klientovi" height="h-full">
      <Label htmlFor="note">Nová poznámka</Label>
      <Textarea
        className="h-28 w-full"
        id="note"
        onChange={(e) => setNote(e.target.value)}
        autoFocus={true}
        value={note}
      />
      {note.length > 10000 && (
        <span className="text-sm text-red-500">
          Poznámka nesmie byť dlhšia ako 10000 znakov.
        </span>
      )}
      <Button className="mt-2 w-full" onClick={handleAddNote}>
        Pridať poznamku
      </Button>
      <DataTable
        value={clientNotesState}
        className="w-full max-w-full"
        paginator
        rows={6}
        emptyMessage="Nenašli sa žiadne poznámky"
        filterLocale="sk"
        dataKey="id"
        size="small"
        showHeaders
        filters={defaultFilters}
      >
        <Column
          field="note"
          header="Poznámka"
          style={{
            width: "74%",
            minWidth: "130px",
            maxWidth: "400px",
            textWrap: "wrap",
            overflowWrap: "break-word",
            wordBreak: "break-all",
          }}
          body={(rowData: TClientNote) =>
            rowData.note.length > 50
              ? `${rowData.note.substring(0, 50)}...`
              : rowData.note
          }
          filter
          filterField="note"
        />
        <Column
          field="createdAt"
          header="Vytvorené"
          body={(rowData: TClientNote) =>
            new Date(rowData.createdAt!).toLocaleString("sk")
          }
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
