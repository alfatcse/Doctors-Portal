import React, { useContext, useState } from "react";
import { format } from "date-fns";
import AppointOption from "./AppointOption";
import BookingModal from "../BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { host } from "../../../Utils/APIRoutes";

const AvailableAppointment = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState(null);
  const date = format(selectedDate, "PP");
  const {
    data: appointmentOptions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: async () => {
      const res = await fetch(`${host}/appointmentOptions`);
      const data = await res.json();
      return data.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section className="mt-16">
      {/* <p className="text-center text-4xl text-primary font-bold">
        Available Appointment On:{format(selectedDate, "PP")}
      </p> */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {appointmentOptions?.map((option) => (
          <AppointOption
            key={option._id}
            option={option}
            setTreatment={setTreatment}
          ></AppointOption>
        ))}
      </div>
      {treatment && (
        <BookingModal
          selectedDate={selectedDate}
          refetch={refetch}
          setTreatment={setTreatment}
          treatment={treatment}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppointment;
