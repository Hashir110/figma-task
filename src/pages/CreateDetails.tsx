import React, { useState } from "react";

import "boxicons";

import Header from "../components/Header";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";

export const CreateDetails = () => {
  const [sidebarHidden, setSidebarHidden] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* sidebar */}

      {sidebarHidden === false && <Sidebar />}

      {/* header */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          margin: "0 auto",
        }}
        className="bg-gray-50 "
      >
        <Header
          sidebarHidden={sidebarHidden}
          setSidebarHidden={setSidebarHidden}
          title={"Create New Task"}
        />

        {/* content */}
        <Content btnTitle={"Create Task"} />
      </div>
    </div>
  );
};
