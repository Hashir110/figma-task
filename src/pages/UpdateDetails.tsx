import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import ContentUpdate from "../components/ContentUpdate";

const UpdateDetails = () => {
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
          title={"Update Task"}
        />

        {/* content update */}
        <ContentUpdate btnTitle="Update Task" />
      </div>
    </div>
  );
};

export default UpdateDetails;
