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
import { addNoteToClient } from "@/lib/actions/clientsActions";
import { text } from "stream/consumers";
import { FilterMatchMode } from "primereact/api";

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
      />
      <Button className="mt-2 w-full" onClick={handleAddNote}>
        Pridat poznamku
      </Button>

      <DataTable
        value={clientNotesState}
        className="w-full max-w-full"
        paginator
        rows={10}
        emptyMessage="Nenasli sa ziadne poznamky"
        filterLocale="sk"
        dataKey="id"
        size="small"
        showHeaders
        filters={defaultFilters}
      >
        <Column
          field="note"
          header="Poznamka"
          style={{ width: "70%", textWrap: "wrap" }}
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
          style={{ width: "20%" }}
          sortable
          filter
          filterField="createdAt"
        />
        <Column
          field="id"
          header="Akcia"
          body={(rowData: TClientNote) => <Button>Otvorit</Button>}
          style={{ width: "10%" }}
        />
      </DataTable>
    </DashboardSectionWrapper>
  );
};

export default ClientNotesGridForm;
