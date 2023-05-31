import { useEffect, useState } from "react";
import { host } from "../Utils/APIRoutes";

const useToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      const e = async () =>
        await fetch(`${host}/jwt?email=${email}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("token", data);
            if (data.accessToken) {
              localStorage.setItem("accessToken", data.accessToken);
              setToken(data.accessToken);
            }
          });
      console.log(e());
    }
  }, [email]);
  return [token];
};
export default useToken;
