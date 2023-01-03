import { useEffect, useState } from "react"

const useAdmin = (email) => {
  console.log(email);
  const [isAdmin, setIsAdmin] = useState('');
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`https://doctors-portal-server-blush-psi.vercel.app/users/admin/${email}`)
        .then(res => res.json())
        .then(data => {
          console.log('dddd', data.role);
          
          setIsAdmin(data.role);
          setIsAdminLoading(false);
        })
    }
  }, [email])
  return [isAdmin, isAdminLoading];
}
export default useAdmin;