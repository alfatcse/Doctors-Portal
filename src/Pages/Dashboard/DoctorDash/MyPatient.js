import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import axios from 'axios';
import VedioCall from './VedioCall';
import { Link } from 'react-router-dom';

const MyPatient = () => {
    const { user } = useContext(AuthContext);
    const [specialty, setSpecialty] = useState();
    const [patient, setPatient] = useState([]);
    const [p,setP]=useState('');
    axios.get(`http://localhost:5006/useremail?email=${user.email}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify()
    }).then(res => {
        setSpecialty(res.data.specialty);
    }).catch(e => console.log(e))
    console.log(specialty);
    useEffect(() => {
        axios.get(`http://localhost:5006/bookingpatient/${specialty}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        }).then(res => {
            console.log(res.data)
            setPatient(res.data);
        }).catch(e => console.log(e))
    }, [specialty])
    const handelPayment=(id)=>{
        return <div>hello</div>
    }
    return (
        <div>
            <h1>My patitnent{specialty}</h1>
            <h1>All users</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Slot</th>
                           
                            <th>Call</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            patient.map((user, i) =>
                                <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td>{user.patient_name}</td>
                                    <td>{user.email}</td>
                                    
                                    <td>{user.AppointmentDate}</td>
                                    <td>{user.slot}</td>
                                    
                                    <td><Link to={`/dashboard/vediocall/${user._id}`}><button className='btn btn-xs btn-danger'>Call</button></Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPatient;