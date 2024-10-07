import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-blue-400  w-[443.5px] fixed mt-[85vh] h-[15vh]  py-4 text-center">
      <p className="text-md font-bold">
        &copy; Alatechdigitals {currentYear}. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
