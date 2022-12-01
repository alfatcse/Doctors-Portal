import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from '../Payment/Checkout';
import Loading from '../../Shared/Loading/Loading';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);
const Payment = () => {
    const booking = useLoaderData();
    const navigation=useNavigation();
    if(navigation.state==='loading')
    {
        return <Loading></Loading>
    }
    console.log(booking);
    return (
        <div>
            <h3 className='text-bold'>Payment for {booking.treatment}</h3>
            <p>Please Pay <strong>${booking.price}</strong> for Your appointment on {booking.AppointmentDate} at {booking.slot}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <Checkout 
                    booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;