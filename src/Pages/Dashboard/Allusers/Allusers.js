import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { async } from '@firebase/util';
const Allusers = () => {
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5006/users');
            const data = await res.json();
            return data;
        }
    })
    return (
        <div>
            <h1>All users</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Favorite Color</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,i) =>
                                <tr key={user._id}>
                                    <th>{i+1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>Blue</td>
                                    <td>Blue</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allusers;