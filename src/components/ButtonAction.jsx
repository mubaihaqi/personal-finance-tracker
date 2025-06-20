import React from "react";

export default function ButtonAction({
  onClick,
  icon,
  className = "",
  bgColor = "bg-rose-400",
  afterColor = "after:bg-rose-800",
  textColor = "text-white",
  size = "h-9 w-9",
  rounded = "rounded-md",
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={`px-0 z-30 py-0 ${bgColor} ${rounded} ${textColor} relative font-semibold
        after:-z-20 after:absolute after:h-1 after:w-1 ${afterColor} after:left-5 overflow-hidden
        after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300]
        after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700
        transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:cursor-pointer
        hover:[text-shadow:2px_2px_2px_#fda4af] text-2xl flex items-center justify-center ${size} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}
