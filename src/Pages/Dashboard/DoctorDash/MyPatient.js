import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import axios from "axios";
import VedioCall from "./VedioCall";
import { Link } from "react-router-dom";

const MyPatient = () => {
  const { user } = useContext(AuthContext);
  const [specialty, setSpecialty] = useState();
  const [patient, setPatient] = useState([]);
  const [doc, setDoc] = useState();
  const [docName, setDocName] = useState();
  let d = "";
  axios
    .get(`http://localhost:5006/useremail?email=${user.email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
    .then((res) => {
      setSpecialty(res.data.specialty);
      console.log(res.data.email);
      setDocName(res.data.email);
      setDoc(res.data.isverified);
    })
    .catch((e) => console.log(e));
  console.log("vv", docName);
  d = doc;
  useEffect(() => {
    axios
      .get(`http://localhost:5006/bookingpatient/${docName}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(),
      })
      .then((res) => {
        console.log(res.data);
        setPatient(res.data);
      })
      .catch((e) => console.log(e));
  }, [specialty]);
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
                  <th>Payment Status</th>
                  <th>Slot</th>
                  <th>Call</th>
                </tr>
              </thead>
              <tbody>
                {patient.map((user, i) => (
                  <tr key={user._id}>
                    <th>{i + 1}</th>
                    <td>{user.patient_name}</td>
                    <td>{user.email}</td>
                    <td>{user.AppointmentDate}</td>
                    <td>
                      {user?.paid ? (
                        <>
                          <h1>paid</h1>
                        </>
                      ) : (
                        <h1>Not paid</h1>
                      )}
                    </td>
                    <td>{user.slot}</td>
                    <td>
                      {user?.paid ? (
                        <>
                          <Link to={`/dashboard/vediocall/${user._id}`}>
                            <button className="btn btn-xs btn-primary">
                              Call
                            </button>
                          </Link>
                        </>
                      ) : (
                        <button disabled className="btn btn-xs  btn-primary">
                          Call
                        </button>
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
          Your are not verified by the Admin.Please wait for a while
        </h1>
      )}
    </div>
  );
};

export default MyPatient;
