import { Check, Download } from "lucide-react";
import { TeamDropdown } from "./TeamDropdown";
import { useState } from "react";
import { FilterType } from "../types";
import { DateFilter } from "./DateFilter";

interface HeaderProps {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
  refresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({ filter, setFilter, refresh }) => {
  const [isExported, setIsExported] = useState(false);

  const handleClick = () => {
    setIsExported(true);
    setTimeout(() => setIsExported(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl p-4 mt-4 shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
      
      {/* LEFT SECTION */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-[#1A2332]">Bhive . All Teams</h2>
          <div className="flex items-center gap-2 bg-green-50 px-2 py-0.5 rounded-full">
            <span className="h-2.5 w-2.5 rounded-full bg-[#00B8A9] animate-pulse"></span>
            <span className="text-[#00B8A9] text-xs font-medium">Live</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          Workforce Analytics Dashboard | <span className="text-[#1A2332] font-medium">{filter}</span>
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Avatars */}
        <div className="flex items-center -space-x-2">
          {[{ name: "A", bg: "bg-[#00B8A9]" },
            { name: "B", bg: "bg-blue-600" },
            { name: "C", bg: "bg-yellow-600" },
            { name: "D", bg: "bg-pink-600" }
          ].map((avatar, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center ${avatar.bg}`}
            >
              <span className="text-[10px] font-bold text-white">{avatar.name}</span>
            </div>
          ))}
          <div className="w-7 h-7 flex items-center justify-center text-[10px] bg-gray-300 rounded-full border border-gray-200 font-medium">+60</div>
        </div>
        <span className="text-sm text-gray-900 whitespace-nowrap">65 Team Members</span>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <TeamDropdown />
          <DateFilter value={filter} onChange={setFilter} />
          
        </div>

        {/* Export button */}
        <button
          onClick={handleClick}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-shadow duration-300 whitespace-nowrap ${
            isExported
              ? "bg-[#227336] text-white hover:shadow-[0_4px_15px_rgba(34,115,54,0.7)]"
              : "bg-[#00B8A9] text-white hover:shadow-[0_4px_15px_rgba(0,184,169,0.7)]"
          }`}
        >
          {isExported ? <Check size={16} /> : <Download size={16} />}
          {isExported ? "Exported!" : "Export Reports"}
        </button>
      </div>
    </div>
  );
};