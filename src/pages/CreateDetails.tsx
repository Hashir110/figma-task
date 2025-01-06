import React from "react";

import "boxicons";

import Header from "../components/Header";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";

export const CreateDetails = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* sidebar */}

      <Sidebar />

      {/* header */}
      <div
        className="bg-gray-50 "
        style={{
          width: "100vw",
          height: "100vh",
          margin: "0 auto",
          scrollbarWidth: "none",
        }}
      >
        <Header title={"Create New Task"} />

        {/* content */}
        <Content btnTitle={"Create Task"} />
      </div>
    </div>
  );
};
