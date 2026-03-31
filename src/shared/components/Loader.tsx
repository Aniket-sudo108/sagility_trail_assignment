// ✅ Loader Component (Reusable Loading UI)
// Why needed?
// → Shows user-friendly loading state during API calls
// → Prevents blank screen while data is fetching
// → Centralized loading UI for consistency

export const Loader = () => {
  return (
    // Full screen center alignment
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      
      {/* 🔄 Animated Dots Loader */}
      {/* 
        Why dots animation?
        → Lightweight & smooth UX
        → Visually indicates progress without heavy libraries
      */}
      <div className="flex gap-2">

        {/* Each dot uses bounce animation with delay for wave effect */}
        <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-bounce [animation-delay:0.1s]"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce [animation-delay:0.3s]"></div>
        <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]"></div>

      </div>

      {/* 📝 Loading Text */}
      {/* 
        animate-pulse → subtle breathing effect
        Improves perceived performance UX
      */}
      <p className="text-gray-500 text-sm animate-pulse">
        Loading dashboard...
      </p>

    </div>
  );
};