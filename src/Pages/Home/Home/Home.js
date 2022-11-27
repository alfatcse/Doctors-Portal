import React from 'react';
import InfoCards from '../../InfoCards/InfoCards';

import Banner from '../Banner/Banner';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
        </div>
    );
};

export default Home;