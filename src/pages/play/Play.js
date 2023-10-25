// styles
import './Play.css';

// react
import { useState, useEffect } from 'react';

// components
import { DraggableCardPlay } from '../../components/draggable_card_play/DraggableCardPlay';

// images
import backDeck from '../../assets/images/card/others/back.png';

// json
import en from '../../assets/locales/en.json';

// services
import { CardService } from '../../service/CardService';

const Play = () => {
    const [cards, setCards] = useState([]);
    const [playerCards, setPlayerCards] = useState([]);
    const [deckCards, setDeckCards] = useState([]);
    const [deckSquirrelCards, setDeckSquirrelCards] = useState([]);

    const json = en.play;

    useEffect(() => {
        const setCardsFunction = async () => {
            const cardsGross = await CardService.listFromUser()
            setCards(cardsGross);
        }
        setCardsFunction();
    }, []);

    const handleClickPlayerDeck = () => {
        const updatedPlayerCards = [...playerCards];
        const updatedDeckCards = [...deckCards];

        if (updatedDeckCards.length > 0) {
            updatedPlayerCards.push(updatedDeckCards.pop());
        }

        setPlayerCards(updatedPlayerCards);
        setDeckCards(updatedDeckCards);
    }

    const handleClickSquirrelPlayerDeck = () => {
        const updatedPlayerCards = [...playerCards];
        const updatedDeckSquirrelCards = [...deckSquirrelCards];

        if (updatedDeckSquirrelCards.length > 0) {
            updatedPlayerCards.push(updatedDeckSquirrelCards.pop());
        }

        setPlayerCards(updatedPlayerCards);
        setDeckSquirrelCards(updatedDeckSquirrelCards);
    }

    useEffect(() => {
        if (cards.data) {
            if (cards.data.length > 0) {
                setPlayerCards(cards.data[0]);
                setDeckCards(cards.data[1]);
                setDeckSquirrelCards(cards.data[2]);
            }
        }
    }, [cards]);

    return (<>
        <div className='play_container'>
            <div className='play_content'>
                <div className='play_table_content'>
                    <div className='play_general_actions'>

                    </div>
                    <div className='play_board'>

                    </div>
                    <div className='play_card_description'>

                    </div>
                </div>

                <div className='play_footer'>
                    <div className='play_player_cards'>
                        {playerCards?.map((card) => {
                            return DraggableCardPlay(card);
                        })}
                    </div>
                    <div className='play_decks'>
                        <div className='play_deck_cards'
                            onClick={handleClickPlayerDeck} >
                            <img className='play_deck_cards_image'
                                src={backDeck}
                                alt={json.deck_image} />
                        </div>
                        <div className='play_deck_squirrel_cards'
                            onClick={handleClickSquirrelPlayerDeck} >
                            <img className='play_deck_squirrel_cards_image'
                                src={backDeck}
                                alt={json.deck_image_squirrel} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Play;