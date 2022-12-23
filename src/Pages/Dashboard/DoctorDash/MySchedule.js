import React from 'react';
import { Link } from 'react-router-dom';

const MySchedule = () => {

    return (
         <div>
      
          <h1 className="text-center text-2xl font-bold mb-3 text-blue-600">
            My Schedule
          </h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Payment Status</th>
                  <th>Slot</th>
                  <th>Call</th>
                </tr>
              </thead>
              <tbody>
               
              </tbody>
            </table>
          </div>
      
    </div>
    );
};

export default MySchedule;