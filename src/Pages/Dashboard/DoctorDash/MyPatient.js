import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import axios from "axios";
import { host } from "../../../Utils/APIRoutes";
const MyPatient = () => {
  const { user } = useContext(AuthContext);
  const [specialty, setSpecialty] = useState();
  const [patient, setPatient] = useState([]);
  const [doc, setDoc] = useState();
  const [docEmail, setDocEmail] = useState();
  let d = "";
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
      setSpecialty(res.data?.data?.specialty);
      setDocEmail(res.data?.data?.email);
      setDoc(res.data?.data?.isverified);
    })
    .catch((e) => console.log(e));
  useEffect(() => {
    axios
      .get(`${host}/booking-doctor?email=${docEmail}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(),
      })
      .then((res) => {
        setPatient(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [specialty, docEmail]);
  return (
    <div>
      {doc === "verified" ? (
        <>
          <h1 className="text-center font-bold mb-3 text-blue-600">
            My Patients
          </h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Slot</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {patient.map((user, i) => (
                  <tr key={user._id}>
                    <th>{i + 1}</th>
                    <td>{user.patient_name}</td>
                    <td>{user.patient_email}</td>
                    <td>{user.appointmentData.AppointmentDate}</td>
                    <td>{user.appointmentData.slot}</td>
                    <td>
                      {user.appointmentData.isPaid ? (
                        <span className="text-green-500 mx-2 font-bold">
                          Paid
                        </span>
                      ) : (
                        <span className="text-red-500 mx-2 font-bold">
                          Not Paid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1 className="text-center font-bold mb-3 text-blue-600">
          Your are not verified by the Admin.Please wait for a while !!
        </h1>
      )}
    </div>
  );
};
export default MyPatient;
