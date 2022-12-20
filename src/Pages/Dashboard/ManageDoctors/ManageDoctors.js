import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { async } from '@firebase/util';
import Loading from '../../Shared/Loading/Loading';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';
const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    const closeModal = () => {
        setDeletingDoctor(null);
    }

    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5006/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                return data;
            }
            catch (e) {
                console.log(e)
            }
        }
    })
    const handleDeleteDoctor = (doctor) => {
        fetch(`http://localhost:5006/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Doctor deleted Successfully');
                    refetch();
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleVerified=(id,specialty)=>{
      console.log(id,specialty);
      fetch(`http://localhost:5006/verifydoctor/${id}`,{
        method:'PUT',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({specialty})
      }).then().catch(e=>console.log(e))
    }
    return (
        <div>
            <h1>doc{doctors?.length}</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Verified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) =>
                                <tr key={doctor._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-full">
                                                <img src={doctor.image} alt="Doctor" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.specialty}</td>
                                    <td><button onClick={()=>handleVerified(doctor._id,doctor.specialty)} className='btn btn-primary btn-sm'>Make Verified</button></td>
                                    <td>
                                        <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-circle btn-outline"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></label>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    closeModal={closeModal}
                    successAction={handleDeleteDoctor}
                    modalData={deletingDoctor}
                    title={'Are you sure?'}
                    successButtonName="Delete"
                    message={`he will ${deletingDoctor.name} deleted forever`}>
                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;