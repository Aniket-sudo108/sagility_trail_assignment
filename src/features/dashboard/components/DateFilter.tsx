import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FilterType } from "../types";

interface DateFilterProps {
  onChange: (val: FilterType) => void;
  value: FilterType;
}

export const DateFilter: React.FC<DateFilterProps> = ({ onChange, value }) => {
  const [open, setOpen] = useState(false);

  const filters: FilterType[] = ["TODAY", "YESTERDAY", "THIS_WEEK"];

  const handleSelect = (f: FilterType) => {
    onChange(f);
    setOpen(false);
  };

  return (
    <div className="relative w-fit">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm cursor-pointer border bg-[#F3F6F9]"
      >
        <span>{value.replace("_", " ")}</span>
        <ChevronDown size={16} />
      </div>

      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-md z-50">
          {filters.map((f) => (
            <div
              key={f}
              onClick={() => handleSelect(f)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {f.replace("_", " ")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};