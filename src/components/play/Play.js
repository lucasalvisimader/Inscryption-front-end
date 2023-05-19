import './Play.css'
import { useEffect, useState } from 'react';
import { CardService } from "../../service";

function Play(props) {

    const [cards, setCards] = useState([]);
    const [card, setCard] = useState({});
    const [FirstCards, setFirstCards] = useState([]);
    const [remainingCards, setRemainingCards] = useState([]);
    
    useEffect(() => {
        props.setIsVisible(false); 
        return(() => props.setIsVisible(true));
    });

    useEffect(() => {
        CardService.listFromUser(props.username, props.password).then(response => {
            setCards(response.data);
        }).catch(e => {
            console.log(e);
        });
    }, [props.username, props.password]);

    useEffect(() => {
        const squirrelCards = cards.filter(card => card.imageType === "SQUIRREL");

        if (squirrelCards.length >= 3 || squirrelCards.length === 0) {
          let randomizedCards = [...cards];
          while (randomizedCards.slice(0, 5).filter(card => card.imageType === "SQUIRREL").length >= 3) {
            randomizedCards = [...cards].sort(() => Math.random() - 0.5);
          }
          setFirstCards(randomizedCards.slice(0, 5));
          setRemainingCards(randomizedCards.slice(5));
        } else {
          const randomizedCards = [...cards].sort(() => Math.random() - 0.5);
          setFirstCards(randomizedCards.slice(0, 5));
          setRemainingCards(randomizedCards.slice(5));
        }
    }, [cards]);

    return (
        <div className='game'>
            <div className='main_game'>

            </div>
            <div className='footer_game'>
                <div className='cards'>
                    {FirstCards.map((card, id) => {
                        const cardStyle = {
                            backgroundImage: `url('/images/imageType/${card.imageType}.png')`
                        };
                    
                        const nameStyle = {
                            fontSize: `calc(2.3rem - (${card.name.length}px) * 2)`,
                            marginBottom: `calc(${card.name.length}px - 20px)`
                        };
                    
                        const footerStyle = {
                            marginTop: `calc(12rem + (${card.name.length}px - 20px))`
                        };
                    
                        return (
                            <div className="card_play_id" key={id}>
                                <div className="card_play" style={cardStyle}>
                                    <div className="header_play">
                                        <div className="cardName_play">
                                            <h2
                                                name='name'
                                                style={nameStyle}
                                                id="inputsShowAllCards"
                                                className="inputName_play"
                                                onChange={(event) => setCard({...card, "name" : event.target.value})} 
                                                type="text"
                                            >
                                                {card.name}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="footer_play" style={footerStyle}>
                                        <div id="power_play">
                                            <h1
                                                name='power'
                                                className="h1"
                                                onChange={(event) => setCard({...card, "power" : event.target.value})}
                                                type="number"
                                            >
                                                {card.power}
                                            </h1>
                                        </div>
                                        <div id="health_play">
                                            <h1
                                                name='health'
                                                className="h1"
                                                onChange={(event) => setCard({...card, "health" : event.target.value})} 
                                                type="number"
                                            >
                                                {card.health}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='remaining-cards'>
                {remainingCards.map((card, id) => {
                    const cardStyle = {
                        backgroundImage: `url('/images/imageType/${card.imageType}.png')`
                    };
                
                    const nameStyle = {
                        fontSize: `calc(2.3rem - (${card.name.length}px) * 2)`,
                        marginBottom: `calc(${card.name.length}px - 20px)`
                    };
                
                    const footerStyle = {
                        marginTop: `calc(12rem + (${card.name.length}px - 20px))`
                    };
                
                    return (
                        <div className="card_play_id" key={id}>
                            <div className="card_play" style={cardStyle}>
                                <div className="header_play">
                                    <div className="cardName_play">
                                        <h2
                                            name='name'
                                            style={nameStyle}
                                            id="inputsShowAllCards"
                                            className="inputName_play"
                                            onChange={(event) => setCard({...card, "name" : event.target.value})} 
                                            type="text"
                                        >
                                            {card.name}
                                        </h2>
                                    </div>
                                </div>
                                <div className="footer_play" style={footerStyle}>
                                    <div id="power_play">
                                        <h1
                                            name='power'
                                            className="h1"
                                            onChange={(event) => setCard({...card, "power" : event.target.value})}
                                            type="number"
                                        >
                                            {card.power}
                                        </h1>
                                    </div>
                                    <div id="health_play">
                                        <h1
                                            name='health'
                                            className="h1"
                                            onChange={(event) => setCard({...card, "health" : event.target.value})} 
                                            type="number"
                                        >
                                            {card.health}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        </div>
    );
}

export default Play;
