// styles
import './Play.css';

// react
import { useState, useEffect } from 'react';

// components
import { DraggableCardPlay } from '../../components/draggable_card_play/DraggableCardPlay';
import { DroppableAreaPlay } from '../../components/droppable_area_play/DroppableAreaPlay';

// images
import backDeck from '../../assets/images/card/others/back.png';
import backSquirrelDeck from '../../assets/images/card/others/back_squirrel.png';

// json
import en from '../../assets/locales/en.json';

// services
import { CardService } from '../../service/CardService';

// external
import { v4 as uuidV4 } from 'uuid';
import { DndContext } from '@dnd-kit/core';

const Play = () => {
    const [cards, setCards] = useState([]);
    const [parent, setParent] = useState(null);
    const [playerCards, setPlayerCards] = useState([]);
    const [deckCards, setDeckCards] = useState([]);
    const [deckSquirrelCards, setDeckSquirrelCards] = useState([]);
    const [droppableAreas, setDroppableAreas] = useState([
        { key: 1 },
        { key: 2 },
        { key: 3 },
        { key: 4 },
        { key: 5 },
        { key: 6 },
        { key: 7 },
        { key: 8 },
        { key: 9 },
        { key: 10 },
        { key: 11 },
        { key: 12 }
    ]);

    const json = en.play;

    const handleDragEnd = (result) => {
        if (result.active && result.over) {
            setParent(result);
        } else {
            setParent(null);
        }
    }

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

    const cardsFromAbove = (name) => {
        if (parent) {
            if (parent.over.id === `play_${name}_droppable`) {
                const cardKey = parent.active.id;
                const card = generateCard(cardKey);

                return card;
            }
        }
        return null;
    }


    const generateCard = (cardKey) => {
        const card = searchCard(cardKey);
        if (card) {
            return (
                <DraggableCardPlay className="play_cards"
                    id={cardKey}
                    key={cardKey}
                    card={card}
                />
            );
        }
    }

    const searchCard = (key) => {
        return playerCards.find((card) => card.key === key);
    }

    const cardsFromBelow = () => {
        return playerCards?.map((card) => {
            card.lengthCard = playerCards.length;
            return (
                <DraggableCardPlay className="play_cards"
                    key={card.key}
                    id={card.key}
                    card={card}
                />
            );
        });
    }

    const renderDroppableArea = (rowLayer) => {
        let value = [];
        return droppableAreas.slice(rowLayer, rowLayer + 4).map((droppableArea) => {
            const cards = cardsFromAbove(droppableArea.key);
            // if (value.find((card) => card.key !== cards?.props.id)) {
                console.log(cards)
                value.push(cards?.props.id)

                // const filteredCards = playerCards.filter((card) => {
                //     return card.key !== cards?.key;
                // });

                // if (filteredCards.length !== playerCards.length) {
                //     setPlayerCards(filteredCards);
                //     console.log(playerCards)
                //     console.log(filteredCards)
                // }

                return (
                    <DroppableAreaPlay key={droppableArea.key}
                        id={`play_${droppableArea.key}_droppable`}
                        isInverted={rowLayer === 4 ? true : false}
                        enemyUpComing={rowLayer === 0 ? true : false}>
                        {cards}
                    </DroppableAreaPlay>
                );
            // }
        });
    }

    useEffect(() => {
        const setCardsFunction = async () => {
            const cardsGross = await CardService.listFromUser()
            setCards(cardsGross);
        }
        setCardsFunction();
    }, []);

    useEffect(() => {
        if (cards.data?.length > 0) {
            cards.data[0]?.map((card) => {
                return card.key = uuidV4();
            })
            cards.data[1]?.map((card) => {
                return card.key = uuidV4();
            })
            cards.data[2]?.map((card) => {
                return card.key = uuidV4();
            })
            setPlayerCards(cards.data[0]);
            setDeckCards(cards.data[1]);
            setDeckSquirrelCards(cards.data[2]);
        }
    }, [cards]);

    return (<>
        <DndContext onDragEnd={handleDragEnd}>
            <div className='play_container'>
                <div className='play_content'>
                    <div className='play_table_content'>
                        <div className='play_general_actions'>

                        </div>
                        <div className='play_board'>
                            <div className='play_enemy_upcoming_cards_container'>
                                {renderDroppableArea(0)}
                            </div>
                            <div className='play_enemy_cards_container'>
                                {renderDroppableArea(4)}
                            </div>
                            <div className='play_player_cards_container'>
                                {renderDroppableArea(8)}
                            </div>
                        </div>
                        <div className='play_card_description'>

                        </div>
                    </div>

                    <div className='play_footer'>
                        <div className='play_player_cards'>
                            {cardsFromBelow().map((card, index) => (
                                <div className="play_card" key={index}>
                                    {card}
                                </div>
                            ))}
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
                                    src={backSquirrelDeck}
                                    alt={json.deck_image_squirrel} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DndContext>
    </>);
}

export default Play;