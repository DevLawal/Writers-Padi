import React from "react";

function Header({ title }) {
  return (
    <div className="bg-blue-400 w-[443.5px] pl-4 m p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}

export default Header;
