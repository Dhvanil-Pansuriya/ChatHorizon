import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "../components/Avatar.js";
const MessagesPage = () => {
  const param = useParams();
  console.log(param);

  return <div>Hello this is message page</div>;
};

export default MessagesPage;
