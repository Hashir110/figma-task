import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import ContentShow from "../components/ContentShow";

interface headerTypes {
  title: string;
}
const ShowDetails = ({ title }: headerTypes) => {
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
        className="bg-gray-50"
      >
        <Header
          sidebarHidden={sidebarHidden}
          setSidebarHidden={setSidebarHidden}
          title={"Task"}
        />
        {/* content */}
        <ContentShow btnTitle="Create New Task" />
      </div>
    </div>
  );
};

export default ShowDetails;
