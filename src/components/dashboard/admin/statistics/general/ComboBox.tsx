import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

type Props = {
  buttonText: string;
  options: any[];
  onSelect: (option: any) => void;
};

const ComboBox = ({ buttonText, options, onSelect }: Props) => {
  const [open, setOpen] = useState(false);

  const handleSelect = async (option: any) => {
    await onSelect(option);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-[200px] justify-between"
        >
          {buttonText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput required />
          <CommandGroup className="max-h-96 overflow-y-auto">
            {options.map((option, index) => (
              <CommandItem key={index} onSelect={() => handleSelect(option.id)}>
                {option.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
