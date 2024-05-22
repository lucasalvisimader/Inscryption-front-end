// css
import './Inventory.css';

// react
import { useState } from 'react';

// components
import { InventoryCard } from '../inventory_card/InventoryCard';

export const Inventory = () => {
    const [playerCards, setPlayerCards] = useState([
        { id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0, key: 1 },
        { id: 2, name: 'STOAT', power: 1, health: 2, sigilsTypes: ['NONE'], imageType: 'STOAT', priceType: -1, key: 2 },
        { id: 3, name: 'STINKBUG', power: 0, health: 2, sigilsTypes: ['STINKY'], imageType: 'STINKBUG', priceType: 2, key: 3 },
        { id: 4, name: 'STUNTED WOLF', power: 2, health: 2, sigilsTypes: ['NONE'], imageType: 'STUNTEDWOLF', priceType: -1, key: 4 },
        { id: 5, name: 'WOLF', power: 3, health: 2, sigilsTypes: ['NONE'], imageType: 'WOLF', priceType: -2, key: 5 },
        { id: 6, name: 'WOLF CUB', power: 1, health: 1, sigilsTypes: ['FLEDGELING'], imageType: 'WOLFCUB', priceType: -1, key: 6 },
        { id: 7, name: 'RAT KING', power: 2, health: 1, sigilsTypes: ['NONE'], imageType: 'RATKING', priceType: -2, key: 7 },
        { id: 8, name: 'URAYULI', power: 7, health: 7, sigilsTypes: ['NONE'], imageType: 'URAYULI', priceType: -4, key: 8 },
    ]);

    const renderCards = (layer) => {
        const hasSecondLayer = playerCards.length > 5;
        let playerCardsSeparated;
        if (layer === 2 && hasSecondLayer) {
            playerCardsSeparated = playerCards.slice(5, playerCards.length).map((card) => {
                card.lengthCard = playerCards.length;
                card.isDisabled = false;
                return (<InventoryCard className="play_cards" key={card.key} id={card.key} card={card} />);
            });
        } else if (layer === 1) {
            playerCardsSeparated = playerCards.slice(0, hasSecondLayer ? 5 : playerCards.length).map((card) => {
                card.lengthCard = playerCards.length;
                card.isDisabled = false;
                return (<InventoryCard className="play_cards" key={card.key} id={card.key} card={card} />);
            });
        }
        return playerCardsSeparated;
    };

    return (<>
        <div className='inventory_container'>
            <div className='inventory_cards'>
                <div className='inventory_cards_first_layer'>
                    {renderCards(1)}
                </div>
                <br/>
                <div className='inventory_cards_second_layer'>
                    {renderCards(2)}
                </div>
            </div>
        </div>
    </>)
}