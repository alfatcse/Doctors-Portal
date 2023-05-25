import { useEffect, useState } from "react";
import { host } from "../Utils/APIRoutes";
const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState("");
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      async function fetchData() {
        await fetch(`${host}/usersrole?email=${email}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(),
        })
          .then((res) => res.json())
          .then((data) => {
            setIsAdmin(data.data);
            setIsAdminLoading(false);
          });
      }
      fetchData();
    }
  }, [email]);
  return [isAdmin, isAdminLoading];
};
export default useAdmin;
