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
          scrollbarWidth: "none",
        }}
        className="bg-gray-50 smoothly-transparent scroll-smooth"
      >
        <Header
          sidebarHidden={sidebarHidden}
          setSidebarHidden={setSidebarHidden}
          title={"Task"}
        />

        <ContentShow />
      </div>
    </div>
  );
};

export default ShowDetails;
