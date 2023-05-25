import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigation, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from '../Payment/Checkout';
import Loading from '../../Shared/Loading/Loading';
import { host } from '../../../Utils/APIRoutes';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
    const {id}=useParams();
    const [booking,setBooking] = useState();
    useEffect(() => {
        if (id) {
          async function fetchData() {
            await fetch(`${host}/booking/${id}`, {
              method: "GET",
              headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
              },
              body: JSON.stringify(),
            })
              .then((res) => res.json())
              .then((data) => {
                setBooking(data.data);
              });
          }
          fetchData();
        }
      }, [id]);
    const navigation=useNavigation();
    if(navigation.state==='loading')
    {
        return <Loading></Loading>
    }
    return (
        <div>
            <h3 className='text-bold'>Payment for {booking?.treatment}</h3>
            <p>Please Pay <strong>${booking?.price}</strong> for Your appointment on {booking?.AppointmentDate} at {booking?.slot}</p>
            <div className='w-96 my-12'>
                {
                    booking? <Elements stripe={stripePromise}>
                    <Checkout 
                    booking={booking}
                    />
                </Elements>:<Loading></Loading>
                }
            </div>
        </div>
    );
};

export default Payment;