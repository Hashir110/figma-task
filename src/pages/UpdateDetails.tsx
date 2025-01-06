import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import ContentUpdate from "../components/ContentUpdate";

const UpdateDetails = () => {
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
        className="bg-gray-50"
        style={{
          width: "100vw",
          height: "100vh",
          margin: "0 auto",
          scrollbarWidth: "none",
        }}
      >
        <Header title={"Update Task"} />

        {/* content update */}
        <ContentUpdate btnTitle="Update Task" />
      </div>
    </div>
  );
};

export default UpdateDetails;
