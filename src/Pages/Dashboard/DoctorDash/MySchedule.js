import axios from "axios";
import { th } from "date-fns/locale";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

const MySchedule = () => {
  const { user } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    axios
      .get(`https://doctors-portal-server-blush-psi.vercel.app/myschedule?email=${user.email}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(),
      })
      .then((res) => {
        console.log(res.data.docSlot);
        setSchedule(res.data.docSlot);
      })
      .catch((e) => console.log(e));
  }, [user.email]);
  console.log("sss", schedule);
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-3 text-blue-600">
        My Schedule
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Slot</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((d, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>{d.date}</td>
                <td className="mx-2">{
                  d.slot
                  }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySchedule;
