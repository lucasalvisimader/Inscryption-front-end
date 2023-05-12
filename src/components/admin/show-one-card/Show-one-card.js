import { CardService } from '../../../service';
import { useState } from 'react';
import './Show-one-card.css';

function ShowOneCard() {
    const [card, setCard] = useState({})
    const [id, setId] = useState(0);
    const [cardStyle, setCardStyle] = useState({backgroundImage: `url('/images/imageType/blank.png')`});
    const [nameStyle, setNameStyle] = useState({});

    async function handleOneCard() {
        const [loginResponse] = await Promise.all([
            CardService.list(id)
        ])
        setCard(loginResponse.data);
        setCardStyle({backgroundImage: `url('/images/imageType/${loginResponse.data.imageType}.png')`});
        console.log({backgroundImage: `url('/images/imageType/${loginResponse.data.imageType}.png')`})
        setNameStyle({
            fontSize: `calc(3rem - ${loginResponse.data.name.length}px)`,
            marginBottom: `calc(${loginResponse.data.name.length}px - 120px)`
        });
    }

    return <div className='cardAndSearch'>
        <div className='oneCard'>
            <div id="modal_one_card">
                <div className="modal-content">
                    <input type={'number'} placeholder={"Search by ID"} 
                    onChange={(event) => setId(event.target.value)} required />
                    <div>
                        <button id='show_one_card_submit' type='submit' onClick={handleOneCard}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="card_edit_delete">
            <div className="card_one_card" style={cardStyle}>
                <div className="header_one_card">
                    <div className="cardName_one_card">
                        <h2 style={nameStyle}>{card.name}</h2>
                    </div>
                </div>
                <div className="footer_one_card">
                    <div id="power_one_card">
                        <h1>{card.power}</h1>
                    </div>
                    <div id="health_one_card">
                        <h1>{card.health}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ShowOneCard;