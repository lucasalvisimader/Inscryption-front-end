import './Play.css'
import { useEffect } from 'react';

function Play(props) {
    useEffect(() => {
        props.setIsVisible(false); 
        return(() => props.setIsVisible(true));
    });
    
    return (
        <div className='game'>
            <div className='main_game'>
            </div>
            <div className='footer_game'>
                
            </div>
        </div>
    );
}

export default Play;