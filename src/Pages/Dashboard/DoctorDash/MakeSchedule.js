import React, { useContext } from "react";
import chair from "../../../assets/images/chair.png";
import { DayPicker, DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { DatePicker } from "react-datetime";
import backImg from "../../../assets/images/bg.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthProvider";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import moment from "moment";
import { host } from "../../../Utils/APIRoutes";
const MakeSchedule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState();
  
  const [doc, setDoc] = useState();
  axios
    .get(`${host}/user?userEmail=${user?.email}`, {
      method: "GET",
      headers: { 
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
    .then((res) => {
      setDoc(res.data?.data?.isverified);
    })
    .catch((e) => console.log(e));
  // axios
  //   .get(`http://localhost:5006/useremail?email=${user.email}`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(),
  //   })
  //   .then((res) => {
  //     setSpecialty(res.data.specialty);
  //   })
  //   .catch((e) => console.log(e));
  var option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [days, setDays] = useState();
  const [value, setValue] = useState("");
  const [daySlot, setdaySlot] = useState([
    {
      date: "",
      slot: [],
    },
  ]);
  const [dateSlot, setDateSlot] = useState([]);
  const footer =
    days && days.length > 0 ? (
      <p>You selected {days.length} day(s).</p>
    ) : (
      <p>Please pick one or more days.</p>
    );
  const handleSlot = (date) => {
    const c = [];
    date.map((d) => {
      const a = {
        date: `${d.toLocaleDateString("en-US", option)}`,
      };
      c.push(a);
    });
    setdaySlot(c);
  };
  const handlePrice = (event) => {
    setValue(event.target.value);
  };
  const handleDaySlot = (d) => (event) => {
    event.preventDefault();
    const s = [event.target.slot1.value, event.target.slot2.value];
    if (s[0] !== "Select" && s[1] !== "Select") {
      d.slot = s;
    }
    const c = [d, ...dateSlot];
    setDateSlot(c);
    event.target.reset();
    event.currentTarget.disabled = true;
  };
  const doctorDetails = [
    {
      docEmail: user.email,
      docName: user.displayName,
      price: value,
      slots: dateSlot,
    },
  ];
  const handleSave = () => {
    const Slotdata = {
      docEmail:user?.email,
      docSlot: dateSlot,
    };
    console.log("slotdate", Slotdata);
    setDateSlot([]);
    setValue("");
    fetch(`${host}/slot`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Slotdata),
    })
      .then((res) => res.json())
      .then((result) => {});
  };
  const today = new Date();
  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };
  const disabledDays = [
    new Date(2022, 12, 10),
    new Date(2022, 12, 12),
    new Date(2022, 12, 20),
    { from: new Date(2022, 4, 18), to: new Date(2022, 4, 29) },
  ];
  const getSlot=()=>{
    console.log('dayslot');
  }
  const [disabled, setDisabled] = useState(false);

  const onClick = () => {
    setDisabled(true);
  };
  return (
    <div>
      {doc === "verified" ? (
        <>
          <section>
            <header
              className="my-6"
              style={{ backgroundImage: `url(${backImg})` }}
            >
              <div className="hero ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                  <img
                    src={chair}
                    alt="dentist chair"
                    className="max-w-sm  rounded-lg shadow-2xl"
                  />
                  <div className="mr-6">
                    <DayPicker
                      showOutsideDays
                      disabled={disabledDays}
                      showDisabledMonthNavigation
                      mode="multiple"
                      min={1}
                      selected={days}
                      onSelect={setDays}
                      footer={footer}
                    />
                  </div>
                </div>
              </div>
            </header>
            <label
              onClick={() => handleSlot(days)}
              htmlFor="slot-modal"
              className="btn ml-20 btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary"
            >
              Add Slot
            </label>
            {daySlot && (
              <>
                <input
                  type="checkbox"
                  id="slot-modal"
                  className="modal-toggle"
                />
                <div className="modal ">
                  <div className="modal-box ml-10 grid grid-cols-1 gap-2 justify-items-center">
                    {/* <label className="label">
                                <span className="label-text font-bold">Service Charge</span>
                            </label>
                            <input className='justify-items-center' type='text' id='price' name='price' placeholder='Price' onChange={handlePrice} ></input> */}
                    { 
                      daySlot.map((d) => (
                      < >
                        <p className="font-bold">{d.date}</p>
                        <form
                          className="gap-2 justify-items-center"
                         onSubmit={handleDaySlot(d)}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-items-center">
                          <select   
                            {...register("slot1", {
                              required: "User Type is Required",
                            })}
                            className="select input-bordered  max-w-sm"
                          >
                            <option value="Select" selected>
                              Select a Slot
                            </option>
                            <option  value="10.00 AM-12.00 AM">
                              10.00 AM-12.00 AM
                            </option>
                            <option value="12.00 AM-02.00 PM">
                              12.00 AM-02.00 PM
                            </option>
                          </select>
                          {errors.slot1 && (
                            <p className="text-red-500">
                              {errors.slot1.message}
                            </p>
                          )}
                          <select   
                            {...register("slot2", {
                              required: "User Type is Required",
                            })}
                            className="select input-bordered  max-w-sm"
                          >
                            <option value="Select" selected>
                              Select a Slot
                            </option>
                            <option value="02.00 PM-03.00 PM">
                              02.00 PM-03.00 PM
                            </option>
                            <option value="03.00 Pm-04.00 PM">
                              03.00 PM-04.00 PM
                            </option>
                          </select>
                          {errors.slot2 && (
                            <p className="text-red-500">
                              {errors.slot2.message}
                            </p>
                          )}
                          <button
                            className="btn btn-xs"
                            value="Log In"
                            type="submit"
                          >
                            Add
                          </button> 
                          </div>
                        </form>
                      </>
                    ))}
                    <div className="modal-action">
                      <label
                        htmlFor="slot-modal"
                        onClick={handleSave}
                        className="btn"
                      >
                        Done
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </>
      ) : (
        <>
          <h1 className="text-center font-bold mb-3 text-blue-600">
            Your are not verified by the Admin.Please wait for a while
          </h1>
        </>
      )}
    </div>
  );
};
export default MakeSchedule;
