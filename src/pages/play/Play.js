// styles
import './Play.css';

// react
import { useState, useEffect, useRef } from 'react';

// components
import { DraggableCardPlay } from '../../components/play/draggable_card_play/DraggableCardPlay';
import { DroppableAreaPlay } from '../../components/play/droppable_area_play/DroppableAreaPlay';
// import { Inventory } from '../../components/play/inventory_container/Inventory';

// images
import backDeck from '../../assets/images/card/others/back.png';
import backSquirrelDeck from '../../assets/images/card/others/back_squirrel.png';
import cardSlot from '../../assets/images/game/slots/card_slot.png';
import cardQueue from '../../assets/images/game/slots/card_queue_slot.png';

// scale images
// import minusTest from '../../assets/images/menu/options/minus_enable.png';
// import plusTest from '../../assets/images/menu/options/plus_enable.png';
// import scaleStatic from '../../assets/images/game/scale/scale_static.png';
// import scalePlayer1 from '../../assets/images/game/scale/scale_player_1.png';
// import scaleEnemy1 from '../../assets/images/game/scale/scale_enemy_1.png';
// import scalePlayer2 from '../../assets/images/game/scale/scale_player_2.png';
// import scaleEnemy2 from '../../assets/images/game/scale/scale_enemy_2.png';
// import scalePlayer3 from '../../assets/images/game/scale/scale_player_3.png';
// import scaleEnemy3 from '../../assets/images/game/scale/scale_enemy_3.png';
// import scalePlayer4 from '../../assets/images/game/scale/scale_player_4.png';
// import scaleEnemy4 from '../../assets/images/game/scale/scale_enemy_4.png';
// import scalePlayer5 from '../../assets/images/game/scale/scale_player_5.png';
// import scaleEnemy5 from '../../assets/images/game/scale/scale_enemy_5.png';

// translation
import { useTranslation } from 'react-i18next';

// external
import { v4 as uuidV4 } from 'uuid';
import { DndContext } from '@dnd-kit/core';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const Play = () => {
    const [cardsData, setCardsData] = useState([]);
    const [playerCards, setPlayerCards] = useState([]);
    const [deckCards, setDeckCards] = useState([]);
    const [deckSquirrelCards, setDeckSquirrelCards] = useState([]);
    const [droppableAreas, setDroppableAreas] = useState(Array.from({ length: 12 }, (_, index) => ({ key: index + 1, cards: [] })));
    // const [playerPoints, setPlayerPoints] = useState(0);
    // const [enemyPoints, setEnemyPoints] = useState(0);
    // const [scaleTiltedSide, setScaleTiltedSide] = useState(0);
    // const [currentScaleImage, setCurrentScaleImage] = useState(scaleStatic);
    // const [styleScale, setStyleScale] = useState({backgroundImage: `url(${currentScaleImage})`});
    const boardRef = useRef();
    const playHeaderRef = useRef();
    const playTableContentRef = useRef();
    const playFooterRef = useRef();
    const { t } = useTranslation();

    const SECRET_KEY = 'chave-secreta-bem-segura';
    
    useEffect(() => {
        const fetchCards = async () => {
            const encryptedCards = Cookies.get('cards');
            if (encryptedCards) {
                // Decrypting data
                const bytes = CryptoJS.AES.decrypt(encryptedCards, SECRET_KEY);
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                setCardsData(decryptedData);
            } else {
                const cardsGross = {
                    data: [
                        [
                            { id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0 },
                            { id: 5, name: 'WOLF', power: 3, health: 2, sigilsTypes: ['NONE'], imageType: 'WOLF', priceType: -2 },
                            { id: 6, name: 'WOLF CUB', power: 1, health: 1, sigilsTypes: ['FLEDGELING'], imageType: 'WOLFCUB', priceType: -1 }
                        ],
                        [
                            { id: 2, name: 'STOAT', power: 1, health: 2, sigilsTypes: ['NONE'], imageType: 'STOAT', priceType: -1 },
                            { id: 3, name: 'STINKBUG', power: 0, health: 2, sigilsTypes: ['STINKY'], imageType: 'STINKBUG', priceType: 2 },
                            { id: 4, name: 'STUNTED WOLF', power: 2, health: 2, sigilsTypes: ['NONE'], imageType: 'STUNTEDWOLF', priceType: -1 }
                        ],
                        Array(10).fill({ id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0 })
                    ]
                }
                setCardsData(cardsGross.data);
                // Encrypting data
                const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(cardsGross.data), SECRET_KEY).toString();
                Cookies.set('cards', encryptedData, { expires: 99999999 });
            }
        }
        fetchCards();
    }, []);

    // This is an use effect made to used to put an unique key in each one of the cards. It's also used to separate in different variables current player cards and deck cards.
    useEffect(() => {
        Cookies.get('cards') ? Cookies.get('cards') : Cookies.set(cardsData)
        if (cardsData.length) {
            const [initialPlayerCards, initialDeckCards, initialSquirrelDeckCards] = cardsData;
            const assignKeys = (cards) => cards.map(card => ({ ...card, key: uuidV4() }));
            setPlayerCards(assignKeys(initialPlayerCards));
            setDeckCards(assignKeys(initialDeckCards));
            setDeckSquirrelCards(assignKeys(initialSquirrelDeckCards));
        }
    }, [cardsData]);

    useEffect(() => {
        setTimeout(() => {
            if (playFooterRef.current) {
                playFooterRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }, [playFooterRef]);

    const handleDragStart = () => {}

    const handleDragEnd = (result) => {
        const {active, over} = result;
        if (active && over) {
            const droppableAreaKey = parseInt(over.id.split("_")[1]);
            const cardKey = active.id;
            
            const updatedDroppableAreas = droppableAreas.map((area) => {
                if (area.key === droppableAreaKey && area.cards.length === 0) {
                    const draggableCard = (<DraggableCardPlay className="play_cards" id={cardKey} key={cardKey} card={playerCards.find((card) => card.key === cardKey)} boardRef={boardRef}/>);
                    area.cards.push(draggableCard);
                    setPlayerCards(playerCards.filter((card) => card.key !== cardKey));
                }
                return area;
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
            setPlayerCards(updatedPlayerCards);
            isSquirrelDeck ? setDeckSquirrelCards(updatedDeckCards) : setDeckCards(updatedDeckCards);
        }
    }

    // This function returns the cards the player have in their hand.
    const renderCards = () => {
        return playerCards.map((card) => {
            card.lengthCard = playerCards.length;
            card.isDisabled = false;
            return (<DraggableCardPlay className="play_cards" key={card.key} id={card.key} card={card} boardRef={boardRef}/>);
        });
    };

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
        const startOfRow = (row - 1) * 4;
        return droppableAreas.slice(startOfRow, startOfRow + 4).map((area) => {
            // This arrow function makes all cards inside of the board disabled, that means the card can't be taken out of the board.
            const cards = area.cards.map((card) => {
                card.props.card.isDisabled = true;
                const props = generateDraggableCardPlayProps(card);
                return (<DraggableCardPlay className="play_cards" {...props} card={card.props.card}/>);
            });

            if (row !== 3) {
                const styleEnemyAreaBoard = {background: `url(${row === 2 ? cardSlot : cardQueue})`, backgroundSize: "contain", backgroundRepeat: "no-repeat"};
                return (
                    <div className={`play_enemy${row === 2 ? '_inverted' : ''}_input_card`} style={styleEnemyAreaBoard} key={area.key} id={`play_${area.key}_droppable`}>
                        {cards}
                    </div>
                );
            }
            return (
                <DroppableAreaPlay key={area.key} id={`play_${area.key}_droppable`}>
                    {cards}
                </DroppableAreaPlay>
            );
        });
    }

    // This function was made to render the board area of the game.
    const renderBoardArea = () => {
        return [...Array(3)].map((_, i) => {
            return (
                <div className={i + 1 === 1 ? 'play_enemy_upcoming_cards_container' : i + 1 === 2 ? 'play_enemy_cards_container' : 'play_player_cards_container'} key={i + 1}>
                    {renderRowArea(i + 1)}
                </div>
            );
        });
    }

    // This function was made to render the deck images and actions, verifying if it is the squirrel deck or not.
    const renderDeck = (isSquirrelDeck) => {
        const textSquirrel = isSquirrelDeck ? '_squirrel' : '';
        return (
            <div className={`play_deck${textSquirrel}_cards`} onClick={() => handleClickDecks(isSquirrelDeck)}>
                <img className={`play_deck${textSquirrel}_cards_image`} src={isSquirrelDeck ? backSquirrelDeck : backDeck} alt={isSquirrelDeck ? t('deck_image_squirrel') : t('deck_image')} />
            </div>
        );
    }

    // const updateScaleImage = (playerPoints, enemyPoints) => {
    //     const diff = Math.max(playerPoints, enemyPoints) - Math.min(playerPoints, enemyPoints);
    //     const newScaleImage = (() => {
    //         switch (diff) {
    //             case 0: return scaleStatic;
    //             case 1: return playerPoints > enemyPoints ? scalePlayer1 : scaleEnemy1;
    //             case 2: return playerPoints > enemyPoints ? scalePlayer2 : scaleEnemy2;
    //             case 3: return playerPoints > enemyPoints ? scalePlayer3 : scaleEnemy3;
    //             case 4: return playerPoints > enemyPoints ? scalePlayer4 : scaleEnemy4;
    //             default: {
    //                 console.log("Você " + (playerPoints > enemyPoints ? "ganhou!" : "perdeu!"));
    //                 return playerPoints > enemyPoints ? scalePlayer5 : scaleEnemy5;
    //             }
    //         }
    //     })();
    //     setScaleTiltedSide(playerPoints > enemyPoints ? diff : diff * -1);
    //     console.log(scaleTiltedSide)
    //     setCurrentScaleImage(newScaleImage);
    //     // setStyleScale({backgroundImage: `url(${newScaleImage})`});
    // }

    // const addPointScale = (qtyPoints, isPlayerPoint) => {
    //     const newPoints = qtyPoints;
    //     isPlayerPoint ? setPlayerPoints(() => {
    //         updateScaleImage(newPoints, enemyPoints);
    //         return newPoints;
    //     }) : setEnemyPoints(() => {
    //         updateScaleImage(playerPoints, newPoints);
    //         return newPoints;
    //     });
    // }

    return (<>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} autoScroll={false}>
            <div className='play_container'>
                <div className='play_content'>
                    {/* <div className='play_header' ref={playHeaderRef}>
                        <div className='play_inventory'>
                            <Inventory />
                        </div>
                    </div> */}
                    <div className='play_table_content' ref={playTableContentRef}>
                        {/* <div className='play_general_actions'>
                            <div className='play_scale' style={styleScale}>
                                <div className='play_scale_points'>
                                    <div className='play_scale_enemy_points' style={{top:`100%`, marginTop: `calc(${Math.abs(scaleTiltedSide) <= 5 ? scaleTiltedSide * -9.2 : (scaleTiltedSide < 0 ? -1 : 1) * 5 * -9.2}% + 10%)`}}>
                                        <span className='play_scale_enemy_points_text'>{'x' + (enemyPoints <= 10 ? enemyPoints : '10+')}</span>
                                    </div>
                                    <div className='play_scale_player_points' style={{top:`100%`, marginTop: `calc(${Math.abs(scaleTiltedSide) <= 5 ? scaleTiltedSide * 9.2 : (scaleTiltedSide < 0 ? -1 : 1) * 5 * 9.2}% + 10%)`}}>
                                        <span className='play_scale_player_points_text'>{'x' +( playerPoints <= 10 ? playerPoints : '10+')}</span>
                                    </div>
                                </div>
                            </div>
                            <img className='play_minus_test' src={minusTest} alt={t('minus')}  onClick={() => addPointScale(enemyPoints + 1, false)}/>
                            <img className='play_plus_test' src={plusTest} alt={t('plus')} onClick={() => addPointScale(playerPoints + 1, true)}/>
                        </div> */}
                        <div className='play_board' ref={boardRef}>
                            {renderBoardArea()}
                        </div>
                    </div>
                    <div className='play_footer' ref={playFooterRef}>
                        <div className='play_player_cards'>
                            {renderCards()}
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