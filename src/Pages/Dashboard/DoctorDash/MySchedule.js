import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { host } from "../../../Utils/APIRoutes";
const MySchedule = () => {
  const { user } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const [doc, setDoc] = useState();
  axios
    .get(`${host}/user?userEmail=${user?.email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(),
    })
    .then((res) => {
      setDoc(res.data.data.isverified);
    })
    .catch((e) => console.log(e));
  useEffect(() => {
    axios
      .get(`${host}/slot/${user.email}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(),
      })
      .then((res) => {
        setSchedule(res.data?.data?.docSlot);
      })
      .catch((e) => console.log(e));
  }, [user.email]);
  if (schedule) {
    console.log("schedule has");
  } else {
    console.log("no schedule has");
  }
  return (
    <div>
      {doc === "verified" ? (
        <>
          {schedule ? (
            <>
              <div>
                <h1 className="text-center text-2xl font-bold mb-3 text-blue-600">
                  My Free Schedule
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
                          <td className="mx-2">
                            {d.slot.map((s) => `${s}, `)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <h1 className="text-center font-bold mb-3 text-blue-600">
                Your have not make any schedule yet.
              </h1>
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          <h1 className="text-center font-bold mb-3 text-blue-600">
            Your are not verified by the Admin.Please wait for a while
          </h1>
        </>
      )}
    </div>
  );
};

export default MySchedule;
