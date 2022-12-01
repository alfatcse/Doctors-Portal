import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const DisplayError = () => {
    const error=useRouteError();
    const {LogOut}=useContext(AuthContext);
    const handlogout = () => {
        LogOut().then(() => { }).catch(e => console.error(e))
    }
    return (
        <div>
            <p className='text-red-500'>Something Went Wrong!!!</p>
            <p className='text-red-400'>{error.statusText||error.message} </p>
            <h4 className="text-3xl">Please <button onClick={handlogout} className='font-bold rounded-lg' to='/login'>Sign out</button> and Sign in again</h4>
        </div>
    );
};

export default DisplayError;