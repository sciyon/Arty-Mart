import React from 'react';
import './index.css';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import monaLisa from './images/monaLisa.jpg';
import persistenceOfMemory from './images/persistenceOfMemory.jpg';
import starryNight from './images/starryNight.jpg';

const images = [monaLisa, persistenceOfMemory, starryNight, monaLisa, persistenceOfMemory, starryNight, starryNight, starryNight, monaLisa, persistenceOfMemory, monaLisa, persistenceOfMemory, persistenceOfMemory];

class imagesMasonry extends React.Component {
    render() {
        return (
            <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200: 4, 1500: 5}}
            >
                <Masonry columnsCount={5} gutter="15px">
                    {images.map((image, i) => (
                    <img 
                    key={i}
                    src={image}
                    className='image'
                    />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        )
    }
}

export default imagesMasonry;