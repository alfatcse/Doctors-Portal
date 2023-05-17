import { useEffect, useState } from "react";
import { host } from "../Utils/APIRoutes";
const useAdmin = (email) => {
  
  const [isAdmin, setIsAdmin] = useState("");
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      async function fetchData() {
        await fetch(`${host}/usersrole?email=${email}`)
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
