import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// ✅ Static options (can later come from API/service layer)
const options = ["All Teams", "Engineering", "Design", "Product", "Sales"];

export const TeamDropdown = () => {

  // ✅ State to store selected value
  // Why? → Needed to display current selected filter in UI
  const [selected, setSelected] = useState("All Teams");

  // ✅ State to control dropdown open/close
  // Why? → UI interaction state (toggle dropdown)
  const [open, setOpen] = useState(false);

  // ✅ Ref to detect click outside component
  // Why? → Used for better UX (auto-close dropdown)
  const ref = useRef<HTMLDivElement>(null);

  // ✅ CLOSE DROPDOWN ON OUTSIDE CLICK
  // Why? → Important UX pattern (used in production apps)
  // Prevents dropdown staying open when user clicks elsewhere
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if click is outside component
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false); // close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup → avoids memory leaks
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-[140px]">

      {/* ✅ Selected Value Box */}
      {/* Why? → Acts as dropdown trigger */}
      <div
        onClick={() => setOpen(!open)} // toggle dropdown
        className={`relative flex items-center justify-between px-3 py-1.5 rounded-lg text-sm cursor-pointer border transition-all duration-200
        bg-[#F3F6F9] text-gray-800 hover:bg-gray-100 border-gray-200
        ${open ? "shadow-[0_2px_4px_rgba(0,184,169,0.5)]" : ""}`}
      >
        {/* Selected text */}
        <span className="truncate">{selected}</span>

        {/* Icon rotation for visual feedback */}
        <ChevronDown
          size={14}
          className={`${
            open
              ? "rotate-180 text-[#00B8A9]"
              : "rotate-0 text-gray-600"
          } transition-transform duration-200`}
        />
      </div>

      {/* ✅ Dropdown List */}
      {/* Why? → Render only when open (performance + clean DOM) */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md z-50 overflow-hidden">

          {/* Map options dynamically */}
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setSelected(opt); // update selected value
                setOpen(false);   // close dropdown
              }}
              className={`px-3 py-2 text-sm cursor-pointer transition
                ${
                  selected === opt
                    ? "bg-gray-100 font-medium text-[#1A2332]" // active state
                    : "hover:bg-gray-100 text-gray-600"       // hover state
                }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};