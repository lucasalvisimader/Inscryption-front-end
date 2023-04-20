import { CardService } from '../../../service';
import { useState, useEffect } from 'react';
import './Show-one-card.css';

function ShowOneCard() {
    const [card, setCard] = useState({})
    const [id, setId] = useState(0);
    const [cardStyle, setCardStyle] = useState({backgroundImage: `url('/images/imageType/blank.png')`});
    const [nameStyle, setNameStyle] = useState({});
    const [max, setMax] = useState(0);
    useEffect(() => {
        CardService.listAll().then(response => {
            setMax(response.data.length);
        })
    }, []);

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
            <div id="modal">
                <div className="modal-content">
                    <input type={'number'} min={1} max={max} placeholder={"Search by ID"} 
                    onChange={(event) => setId(event.target.value)} required />
                    <div>
                        <button type='submit' onClick={handleOneCard}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="card_edit_delete">
            <div className="card" style={cardStyle}>
                <div className="header">
                    <div className="cardName">
                        <h2 style={nameStyle}>{card.name}</h2>
                    </div>
                </div>
                <div className="footer">
                    <div id="power">
                    <h1>{card.power}</h1>
                    </div>
                    <div id="health">
                    <h1>{card.health}</h1>
                    </div>
                </div>
            </div>
            <div className="edit_delete_card">
                <div id="edit">
                    <button id="edit_button_card">EDIT</button>
                </div>
                <div className="delete">
                    {/* <button id="delete_button_card" onClick={() => handleDelete(card.id)}>DELETE</button> */}
                </div>
            </div>
        </div>
    </div>
}

export default ShowOneCard;