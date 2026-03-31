import { Bell, ChevronDown, Search, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { DashboardData } from "../types";

type NavbarProps = {
  activity?: DashboardData["activity"]; // pass activity array from dashboard
};

export const Navbar: React.FC<NavbarProps> = ({ activity }) => {
  const [showBadge, setShowBadge] = useState(true);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [readIds, setReadIds] = useState<number[]>([]);

  const handleClick = () => {
    setShowBadge(false);
    setOpenNotifications(true);
  };

  const handleClose = () => {
    setOpenNotifications(false);
  };

  const markAsRead = (id: number) => {
    setReadIds((prev) => [...prev, id]);
  };

  // ✅ Take first activity entry as "logged-in user"
  const firstUser = activity && activity.length > 0 ? activity[0] : null;

  const notifications = [
    {
      id: 1,
      title: "New Task Assigned",
      message: "You have been assigned to 'DB Migration'.",
      time: "5m ago",
    },
    {
      id: 2,
      title: "Meeting Reminder",
      message: "Daily standup starts in 15 minutes.",
      time: "15m ago",
    },
    {
      id: 3,
      title: "System Alert",
      message: "Server CPU usage is high.",
      time: "30m ago",
    },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white h-[64px] border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
      {/* Left side */}
      <div className="flex items-center gap-2 cursor-pointer group">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#00B8A9]/40 animate-[ping_2.5s_ease-in-out_infinite]"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00B8A9]"></span>
        </span>
        <h1 className="font-semibold text-[#1A2332] text-lg group-hover:text-[#00B8A9] transition">
          Bhive Workspace
        </h1>
      </div>

      {/* Search */}
      <div className="hidden md:block w-[300px] lg:w-[420px]">
        <div className="flex items-center gap-2 bg-[#F3F6F9] px-4 py-2 rounded-xl border border-transparent focus-within:bg-white focus-within:border-[#00B8A9] transition">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 md:gap-4 relative">
        {/* Notification Bell */}
        <div
          onClick={handleClick}
          className="relative inline-flex bg-[#ECF2EB] rounded-full p-3 cursor-pointer hover:bg-[#DEFAFA] transition-colors duration-200"
        >
          <Bell className="text-gray-500" size={20} />
          {showBadge && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] flex items-center justify-center bg-[#00B8A9] text-white text-[10px] rounded-full shadow">
              {notifications.length}
            </span>
          )}
        </div>

        {/* Notification Popup */}
        {openNotifications && (
          <div className="absolute right-0 top-14 w-80 bg-white/40 backdrop-blur-md shadow-xl rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-[#1A2332]">
                Notifications
              </h3>
              <button
                onClick={handleClose}
                className="p-1 rounded hover:bg-gray-200 transition"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map((n) => {
                const isRead = readIds.includes(n.id);
                return (
                  <li
                    key={n.id}
                    className={`group p-2 rounded-md flex items-start justify-between transition ${
                      isRead ? "bg-gray-100 text-gray-400" : "hover:bg-gray-50"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs">{n.message}</p>
                      <span className="text-[10px] text-gray-400">{n.time}</span>
                    </div>
                    {!isRead && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="opacity-0 group-hover:opacity-100 transition"
                      >
                        <ArrowRight size={14} className="text-[#00B8A9]" />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* User Profile (dynamic) */}
        <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 cursor-pointer hover:bg-[#E0DCD9] transition-colors duration-200">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00B8A9] flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {firstUser?.initials || "??"}
            </span>
          </div>
          <div className="hidden sm:block text-xs leading-tight">
            <p className="font-bold text-[#1A2332]">
              {firstUser?.name || "Manager"}
            </p>
            <p className="text-gray-400">
              {/* If your API includes email, use that. Otherwise fallback */}
              {firstUser
                ? `${firstUser?.name.toLowerCase().replace(" ", ".")}@test.com`
                : "Kavathekaraniket@domain.com"}
            </p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};
