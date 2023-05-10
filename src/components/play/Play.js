import './Play.css'
import { useEffect } from 'react';

function Play(props) {
    useEffect(() => {
        props.setIsVisible(false); 
        return(() => props.setIsVisible(true));
    });
    
    return (
        <div className='game'>
            <p>OI</p>
        </div>
    );
}

export default Play;