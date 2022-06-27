import React from "react";

const Notification = ({ msg, error }) => {
  let msgStyle = {
    color: "green",
    background: "rgb(236, 255, 216)",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  };

  if (msg === null && error === null) {
    return null;
  }
  if (error !== null) {
    msgStyle = { ...msgStyle, color: "red", background: "rgb(255, 249, 242)" };
    return <div style={msgStyle}>{error}</div>;
  }

  return <div style={msgStyle}>{msg}</div>;
};

export default Notification;
