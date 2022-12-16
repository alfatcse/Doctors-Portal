import React from 'react';
import chair from '../../../assets/images/chair.png';
import { DayPicker, DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import backImg from '../../../assets/images/bg.png'
import { useState } from 'react';
const MakeSchedule = () => {
    var option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const [days, setDays] = useState();
    const [daySlot, setdaySlot] = useState([{
        date: '',
        slot: []
    }])
    const [slot,setSlot]=useState([]);
    const footer =
        days && days.length > 0 ? (
            <p>You selected {days.length} day(s).</p>
        ) : (
            <p>Please pick one or more days.</p>
        );
    const handleSlot = (date) => {

        const c = [];
        date.map(d => {
            const a = {
                date: `${d.toLocaleDateString('en-US', option)}`,
               // slot: ['2', '3', '4']
            }
            c.push(a);
        })
        //console.log(c);
        setdaySlot(c);
    }
   // console.log(daySlot);
    const handleDaySlot = d=>(event) => {
        
        event.preventDefault();
        const s=[event.target.slot1.value,event.target.slot2.value];
        
        setSlot(s);
        d.slot=slot;
        console.log('slott', d); 
    }
   // console.log(slot)
    const handelSlots = (d) => {
       
        d.slot=slot;
        console.log('slott', d);
        setSlot(null);
    }
    return (
        <section>
            <header className='my-6' style={{ backgroundImage: `url(${backImg})` }}>
                <div className="hero ">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src={chair} alt='dentist chair' className="max-w-sm  rounded-lg shadow-2xl" />
                        <div className='mr-6'>
                            <DayPicker
                                mode="multiple"
                                min={1}
                                selected={days}
                                onSelect={setDays}
                                footer={footer}
                            />

                        </div>
                    </div>
                </div>
            </header>
            <label onClick={() => handleSlot(days)} htmlFor='slot-modal' className="btn ml-20 btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary">Add Slot</label>
            {daySlot &&
                <>
                    <input type="checkbox" id="slot-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            {
                                daySlot.map(d =>
                                    <>
                                        <p>{d.date}</p>
                                        <form onSubmit={handleDaySlot(d)}>
                                            <input placeholder='slot' name='slot1' type="text" />
                                            <input placeholder='slot' name='slot2' type="text" />
                                            <button onClick={e=>e.currentTarget.disabled=true} className='btn btn-primary'  value="Log In" type="submit" >Add</button>
                                        </form>
                                    </>
                                )

                            }
                            <div className="modal-action">
                                <label htmlFor="slot-modal" className="btn">Yay!</label>
                            </div>
                        </div>
                    </div>
                </>}
        </section>
    );
};

export default MakeSchedule;