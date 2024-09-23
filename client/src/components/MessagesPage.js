import React from "react";
import { useParams } from "react-router-dom";
const MessagesPage = () => {
  const param = useParams();
  console.log(param);
  
  return (
    <div>
      message
    </div>
  );
};

export default MessagesPage;
