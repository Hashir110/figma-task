import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import ContentShow from "../components/ContentShow";

interface headerTypes {
  title: string;
  id: string;
}
const ShowDetails = ({ title, id }: headerTypes) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* header */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          margin: "0 auto",
          scrollbarWidth: "none",
        }}
        className="bg-gray-50 "
      >
        <Header title={"Task"} />

        <ContentShow />
      </div>
    </div>
  );
};

export default ShowDetails;
