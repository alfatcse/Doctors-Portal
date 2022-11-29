import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
const MyAppointment = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5006/booking?email=${user?.email}`;
    const { data: bookings = [] } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })
    return (
        <div className="overflow-x-auto mb-5">
            <h1>MY App</h1>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Treatment</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map((booking,i) => 
                            <tr>
                                <th>{i+1}</th>
                                <td>{booking.patient_name}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.AppointmentDate}</td>
                                <td>{booking.slot}</td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    );
};

export default MyAppointment;