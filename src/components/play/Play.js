import './Play.css'
import { useEffect, useState } from 'react';
import { CardService } from "../../service";

function Play(props) {

    const [cards, setCards] = useState([]);
    const [FirstCards, setFirstCards] = useState(
        cards.map((card) => ({
          ...card,
          isActive: false
        }))
    );
    const [remainingCards, setRemainingCards] = useState([]);
    const [isActive, setIsActive] = useState(false);
    
    const randomizeCards = (cards) => {
        let randomizedCards = [...cards];
        return randomizedCards.sort(() => Math.random() - 0.5);
    };
    
    useEffect(() => {
        props.setIsVisible(false); 
        return(() => props.setIsVisible(true));
    });

    useEffect(() => {
        CardService.listFromUser(props.username, props.password).then(response => {
            let arr = response.data;
            arr.forEach(card => {
                if (card.imageType === "SQUIRREL") {
                    for (let i = 0; i < 20; i++) {
                        arr.push(card);
                    }
                }
            });
            setCards(randomizeCards(arr));
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

    function getCardFromDeck() {
        if (remainingCards.length > 0) {
            let array = FirstCards;
            const nextCard = remainingCards[0];
            array.push(nextCard);
            setFirstCards(array);
            setRemainingCards(remainingCards.slice(1));
        }
    }

    const handleActive = (id) => {
        setFirstCards((prevCards) =>
            prevCards.map((card) =>
            card.id === id ? { ...card, isActive: !card.isActive } : card
            )
        );
    };

    return (
        <div className='game'>
            <div className='main_game'>
                <div className='hammer'>
                    <button className='hammer_button'></button>
                </div>
                {remainingCards.length > 0 &&
                    <button className='deck' onClick={getCardFromDeck}></button>
                }
            </div>
            <div className='footer_game'>
                <div className='cards'>
                    {FirstCards.map((card, id) => {
                        const cardStyle = {
                            backgroundImage: `url('/images/imageType/${card.imageType}.png')`,
                            marginRight: `calc(3rem - (${Math.min(FirstCards.length, 14)}px * 10))`
                        };
                    
                        const nameStyle = {
                            fontSize: `calc(2rem - (${card.name.length}px))`,
                            marginBottom: `calc(${card.name.length}px - 20px)`
                        };
                    
                        const footerStyle = {
                            marginTop: `calc(12rem + (${card.name.length}px - 20px))`
                        };
                    
                        return (
                            <div className="card_play_id" key={id}>
                                <div className={"card_play " + (card.isActive ? 'active' : 'inactive')} 
                                style={cardStyle} onClick={() => handleActive(card.id)}>
                                    <div className="header_play">
                                        <div className="cardName_play">
                                            <h2 name='name'
                                                style={nameStyle}
                                                id="inputsShowAllCards"
                                                className="name_play"
                                                type="text">
                                                {card.name}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="footer_play" style={footerStyle}>
                                        <div id="power_play">
                                            <h1 name='power'
                                                className="h1_play"
                                                type="number">
                                                {card.power}
                                            </h1>
                                        </div>
                                        <div id="health_play">
                                            <h1 name='health'
                                                className="h1_play"
                                                type="number">
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
