// styles
import './Play.css';

// react
import { useState, useEffect, useRef, Fragment } from 'react';

// components
import { DraggableCardPlay } from '../../components/draggable_card_play/DraggableCardPlay';
import { DroppableAreaPlay } from '../../components/droppable_area_play/DroppableAreaPlay';

// images
import backDeck from '../../assets/images/card/others/back.png';
import backSquirrelDeck from '../../assets/images/card/others/back_squirrel.png';
import cardSlot from '../../assets/images/game/slots/card_slot.png';
import cardQueue from '../../assets/images/game/slots/card_queue_slot.png';

// json
import en from '../../assets/locales/en.json';

// services
// import { CardService } from '../../service/CardService';

// external
import { v4 as uuidV4 } from 'uuid';
import { DndContext } from '@dnd-kit/core';

const Play = () => {
    const [cards, setCards] = useState([]);
    const [playerCards, setPlayerCards] = useState([]);
    const [deckCards, setDeckCards] = useState([]);
    const [deckSquirrelCards, setDeckSquirrelCards] = useState([]);
    const [droppableAreas, setDroppableAreas] = useState([{key:1, cards: []}, {key:2, cards: []}, {key:3, cards: []}, {key:4, cards: []}, {key:5, cards: []}, {key:6, cards: []}, {key:7, cards: []}, {key:8, cards: []}, {key:9, cards: []}, {key:10, cards: []}, {key:11, cards: []}, {key:12, cards: []}]);
    const boardRef = useRef();
    const json = en.play;

    const handleDragStart = () => {}

    const handleDragEnd = (result) => {
        if (result.active && result.over) {
            const droppableAreaKey = parseInt(result.over.id.split("_")[1]);
            const cardKey = result.active.id;
            const card = (<DraggableCardPlay className="play_cards" id={cardKey} key={cardKey} card={playerCards.find((card) => card.key === cardKey)} boardRef={boardRef}/>);

            const updatedDroppableAreas = droppableAreas.map((droppableArea) => {
                if (droppableArea.key === droppableAreaKey && droppableArea.cards.length === 0) {
                    droppableArea.cards.push(card);
                    const updatedPlayerCards = playerCards.filter((card) => card.key !== cardKey);
                    setPlayerCards(updatedPlayerCards);
                }
                return droppableArea;
            });

            setDroppableAreas(updatedDroppableAreas);
        }
    }

    // This function is used to handle onClick actions on both deck cards.
    const handleClickDecks = (isSquirrelDeck) => {
        const updatedPlayerCards = [...playerCards];
        const updatedDeckCards = isSquirrelDeck ? [...deckSquirrelCards] : [...deckCards];

        if (updatedDeckCards.length > 0) {
            updatedPlayerCards.push(updatedDeckCards.pop());
        }
        setPlayerCards(updatedPlayerCards);
        isSquirrelDeck ? setDeckSquirrelCards(updatedDeckCards) : setDeckCards(updatedDeckCards);
    }

    // This function returns the cards the player have in their hand.
    const cardsFromBelow = () => {
        return playerCards.map((card, index) => {
            card.lengthCard = playerCards.length;
            card.isDisabled = true;
            return (
                <Fragment key={index}>
                    <DraggableCardPlay className="play_cards" key={card.key} id={card.key} card={card} boardRef={boardRef}/>
                </Fragment>
            );
        });
    }

    // This function generate the props that are going to the draggable cards
    const generateDraggableCardPlayProps = (card) => {
        return {
            id: card.key,
            key: card.key,
            card: card.props.card
        }
    }

    // This function was made to render each row of the board, being the first 2 rows the enemy's side, which the player can't place a card there, and the last row the player side.
    const renderRowArea = (row) => {
        return droppableAreas.slice(row, row + 4).map((droppableArea) => {
            // This arrow function makes all cards inside of the board disabled, that means the card can't be taken out of the board.
            const cards = droppableArea.cards.map((card) => {
                card.props.card.isDisabled = true;
                const props = generateDraggableCardPlayProps(card);
                return (<DraggableCardPlay className="play_cards" props={props}/>);
            });

            if (row !== 3) {
                const styleEnemyAreaBoard = {background: `url(${row === 2 ? cardSlot : cardQueue})`, backgroundSize: "contain", backgroundRepeat: "no-repeat"};
                return (
                    <div className={`play_enemy${row === 2 ? '_inverted' : ''}_input_card`} style={styleEnemyAreaBoard} key={droppableArea.key} id={`play_${droppableArea.key}_droppable`}>
                        {cards}
                    </div>
                );
            }
            return (
                <DroppableAreaPlay key={droppableArea.key} id={`play_${droppableArea.key}_droppable`}>
                    {cards}
                </DroppableAreaPlay>
            );
        });
    }

    // This function was made to render the board area of the game.
    const renderBoardArea = () => {
        return [1, 2, 3].map((index) => {
            return (
                <div className={index === 1 ? 'play_enemy_upcoming_cards_container' : index === 2 ? 'play_enemy_cards_container' : 'play_player_cards_container'} key={index}>
                    {renderRowArea(index)}
                </div>
            );
        });
    }

    // This function was made to render the deck images and actions, verifying if it is the squirrel deck or not.
    const renderDeck = (isSquirrelDeck) => {
        const textSquirrel = isSquirrelDeck ? '_squirrel' : '';
        return (
            <div className={`play_deck${textSquirrel}_cards`} onClick={() => handleClickDecks(isSquirrelDeck)}>
                <img className={`play_deck${textSquirrel}_cards_image`} src={isSquirrelDeck ? backSquirrelDeck : backDeck} alt={isSquirrelDeck ? json.deck_image_squirrel : json.deck_image} />
            </div>
        );
    }

    // This is an use effect made to set the player cards based on which cards they have in the database.
    // useEffect(() => {
    //     const setCardsFunction = async () => {
    //         const cardsGross = await CardService.listFromUser();
    //         setCards(cardsGross);
    //     }
    //     setCardsFunction();
    // }, []);
    useEffect(() => {
        const setCardsFunction = async () => {
            const cardsGross = {
                data: [
                        [{id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0}, {id: 5, name: 'WOLF', power: 3, health: 2, sigilsTypes: ['NONE'], imageType: 'WOLF', priceType: -2}, {id: 6, name: 'WOLF CUB', power: 1, health: 1, sigilsTypes: ['FLEDGELING'], imageType: 'WOLFCUB', priceType: -1}],
                        [{id: 2, name: 'STOAT', power: 1, health: 2, sigilsTypes: ['NONE'], imageType: 'STOAT', priceType: -1}, {id: 3, name: 'STINKBUG', power: 0, health: 2, sigilsTypes: ['STINKY'], imageType: 'STINKBUG', priceType: 2}, {id: 4, name: 'STUNTED WOLF', power: 2, health: 2, sigilsTypes: ['NONE'], imageType: 'STUNTEDWOLF', priceType: -1}],
                        [{id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0}, {id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0}, {id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0}, {id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0}, {id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0}, {id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0}, {id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0}, {id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0}, {id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0}, {id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0}]
                    ]
                }
            setCards(cardsGross);
        }
        setCardsFunction();
    }, []);

    // This is an use effect made to used to put an unique key in each one of the cards. It's also used to separate in different variables current player cards and deck cards.
    useEffect(() => {
        if (cards.data?.length > 0) {
            cards.data.forEach(data => data.map((card) => card.key = uuidV4()));
            setPlayerCards(cards.data[0]);
            setDeckCards(cards.data[1]);
            setDeckSquirrelCards(cards.data[2]);
        }
    }, [cards]);

    return (<>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className='play_container'>
                <div className='play_content'>
                    <div className='play_table_content'>
                        <div className='play_general_actions'>

                        </div>
                        <div className='play_board' ref={boardRef}>
                            {renderBoardArea()}
                        </div>
                    </div>
                    <div className='play_footer'>
                        <div className='play_player_cards'>
                            {cardsFromBelow()}
                        </div>
                        <div className='play_decks'>
                            {deckCards.length > 0 && renderDeck(false)}
                            {deckSquirrelCards.length > 0 && renderDeck(true)}
                        </div>
                    </div>
                </div>
            </div>
        </DndContext>
    </>);
}

export default Play;