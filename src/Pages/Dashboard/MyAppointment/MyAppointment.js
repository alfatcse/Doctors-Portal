import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'react-day-picker';
import { Link } from 'react-router-dom';
import { host } from '../../../Utils/APIRoutes';
const MyAppointment = () => {
    const { user } = useContext(AuthContext);
   
    const url = `${host}/bookings?email=${user?.email}`;
    const { data: bookings = {} } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                     authorization: `bearer ${localStorage.getItem('accessToken')}`,
                    'content-type': 'application/json'
                }
            });
            const data = await res.json();
            console.log('ddd',data);
            return data;
        }
    })
    
    return (
        <div className="overflow-x-auto mb-5">
            <h1 className='text-center font-bold mb-3 text-blue-600'>MY Appointment</h1>
            <table className="table w-full">
                <thead> 
                    <tr>
                        <th></th>
                        <th>Treatment Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings?.data?.appointmentData?.map((booking, i) =>
                            <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.treatment}</td>
                                <td>{booking.AppointmentDate}</td> 
                                <td>{booking.slot}</td>
                                <td>{
                                    booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-sm btn-primary'>Pay</button></Link>
                                }
                                    {
                                        booking.price && booking.paid && <span className='text-green-500 font-bold'>Paid</span>
                                    }</td> 
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    );
};

export default MyAppointment;
 {/* <td><Link to={`/dashboard/vediocall/${booking._id}`}><button className='btn btn-xs btn-danger'>Receive Call</button></Link></td> */}