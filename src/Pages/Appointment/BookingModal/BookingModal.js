import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { host } from "../../../Utils/APIRoutes";
const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
  const { name, slots, price, doctors } = treatment;
  const { user } = useContext(AuthContext);
  const [singleUser, setSingleUser] = useState();
  useEffect(() => {
    if (user?.email) {
      async function fetchData() {
        await fetch(`${host}/user?userEmail=${user?.email}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(),
        })
          .then((res) => res.json())
          .then((data) => {
            setSingleUser(data.data);
          });
      }
      fetchData();
    }
  }, [user?.email]);

  const [value, setValue] = useState("");
  const [date, setDate] = useState([]);
  const [slot, setSlot] = useState([]);
  const [value1, setValue1] = useState("");
  const navigate = useNavigate();
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const patient_name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const slot = form.slot.value;
    const doctor = form.doc.value;
    const AppointmentDate = form.date1.value;
    const booking = {
      patient_id: singleUser?._id,
      patient_name: patient_name,
      slot,
      AppointmentDate,
      patient_email: email,
      patient_Phone: phone,
      doctor_email: doctor,
      treatment: name,
      price,
      isPaid: false,
    };
    const delSlot = {
      doctor,
      AppointmentDate,
      slot,
    };
    //todo :: send data to the server and once data is saved and close modal
    // display toast
    if (user) {
      fetch(`${host}/bookings`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(booking),
      })
        .then((res) => res.json())
        .then(async (data) => {
          setTreatment(null);
          if (data?.status === "Success") {
            toast.success("Booking Confirmed");
            fetch(`${host}/slots`, {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(delSlot),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data?.status === "Success") {
                  refetch();
                }
              })
              .catch((e) => console.log(e));
          } else {
            toast.error(data.message);
          }
        });
    } else {
      navigate("/login");
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSlot = (e) => {
    setValue1(e.target.value);
    date.docSlot.map((p) => {
      if (p.date === e.target.value) {
        setSlot(p.slot);
      }
    });
  };
  useEffect(() => {
    fetch(`${host}/slot/${value}`)
      .then((res) => res.json())
      .then((data) => {
        setDate(data?.data);
      });
  }, [value]);

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-center font-bold  text-blue-600">
            {name}
          </h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-5"
          >
            {/* <input type="text" disabled value={format(selectedDate, 'PP')} className="input input-bordered input-info w-full " /> */}
            <label className="label">
              <span className="label-text">Please Select a Doctor</span>
            </label>
            <select
              name="doc"
              value={value}
              onChange={handleChange}
              defaultValue={{ label: "Select" }}
              className="select select-bordered w-full "
            >
              <option>Choose One</option>
              {doctors?.map((doc, i) => (
                <option key={i} value={doc.docEmail}>
                  {doc.name}
                </option>
              ))}
            </select>
            <label className="label">
              <span className="label-text">Please Select a Date</span>
            </label>
            {date?.length === 0 ? (
              <>
                {" "}
                <input
                  disabled
                  readOnly
                  type="email"
                  placeholder="Please Select a doctor first"
                  className="input input-bordered input-info w-full "
                />
              </>
            ) : (
              <>
                <select
                  name="date1"
                  value={value1}
                  onChange={handleSlot}
                  className="select select-bordered w-full "
                >
                  <option>Choose One</option>{" "}
                  {date?.docSlot?.map((s, i) => (
                    <option key={i} value={s.date}>
                      {s.date}
                    </option>
                  ))}
                </select>
              </>
            )}
            <label className="label">
              <span className="label-text">Please Select a Slot</span>
            </label>
            {slot?.length === 0 ? (
              <>
                {" "}
                <input
                  disabled
                  readOnly
                  type="email"
                  placeholder="Please Select a slot"
                  className="input input-bordered input-info w-full "
                />
              </>
            ) : (
              <>
                <select name="slot" className="select select-bordered w-full ">
                  <option>Choose One</option>
                  {slot?.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </>
            )}
            <input
              name="name"
              defaultValue={user?.displayName}
              disabled
              readOnly
              type="name"
              placeholder="Your Name"
              className="input input-bordered input-info w-full "
            />
            <input
              name="email"
              defaultValue={user?.email}
              disabled
              readOnly
              type="email"
              placeholder="Email Address"
              className="input input-bordered input-info w-full "
            />
            <input
              name="phone"
              type="phone"
              placeholder="Phone Number"
              className="input input-bordered input-info w-full "
            />
            <br />
            <input
              type="submit"
              className="w-full btn btn-accent"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
