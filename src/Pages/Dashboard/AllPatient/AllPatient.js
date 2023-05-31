import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { host } from "../../../Utils/APIRoutes";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
const AllPatient = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const closeModal = () => {
    setDeletingDoctor(null);
  };
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${host}/users?userType=Patient`, {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data?.data;
    },
  });
  //   const handleMakeAdmin = (id) => {
  //     fetch(`http://localhost:5006/users/admin/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         authorization: `bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {

  //         if (data.deletedCount > 0) {
  //           console.log(data);
  //           toast.success("Modified Successfully");
  //           refetch();
  //         }
  //       });
  //   };
  const handleDeleteDoctor = (doctor) => {
    fetch(`${host}/users?id=${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("del data", data);
        if (data.data.deletedCount > 0) {
          toast.success("Patient deleted Successfully");
          refetch();
        }
      });
  };
  return (
    <div>
      <h1 className="text-center font-bold mb-3 text-blue-600">
        Number of Patients: {users?.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Admin</th> */}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={user.image} alt="Doctor" />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* <td>
                  {user?.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td> */}

                <td>
                  <label
                    onClick={() => setDeletingDoctor(user)}
                    htmlFor="confirmation-modal"
                    className="btn btn-circle btn-outline hover:bg-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConfirmationModal
          closeModal={closeModal}
          successAction={handleDeleteDoctor}
          modalData={deletingDoctor}
          title={"Are you sure?"}
          successButtonName="Delete"
          message={`he will ${deletingDoctor.name} deleted forever`}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllPatient;
