import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = (props) => {
  const { show } = props;
  return (
    <>
      {" "}
      {show && (
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0, 0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 999,
          }}
        >
          {" "}
          <CircularProgress />{" "}
        </div>
      )}{" "}
    </>
  );
};
export default Loader;
