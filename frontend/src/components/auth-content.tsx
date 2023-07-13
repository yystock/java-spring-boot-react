import { useEffect, useState } from "react";
import { api } from "../api/axiosConfig";

export default function AuthContent() {
  const [content, setContent] = useState();

  const getContent = async () => {
    try {
      const response = await api({ method: "get", url: "/messages" });

      console.log(response.data);
      setContent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return <div>{content}</div>;
}
