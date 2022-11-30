import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { async } from '@firebase/util';
const ManageDoctors = () => {
    const { data: doctors } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res=await fetch('http://localhost:5006/doctors',{
                    headers:{
                        authorization:`bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data=await res.json();
                return data;
             }
            catch (e) {
                console.log(e)
            }
        }
    })
    return (
        <div>
            <h1>doc{doctors?.length}</h1>
        </div>
    );
};

export default ManageDoctors;