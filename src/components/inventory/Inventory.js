// css
import './Inventory.css';

// react
import { useState } from 'react';

// components
import { InventoryCard } from '../inventory_card/InventoryCard';

export const Inventory = () => {
    const [playerCards, setPlayerCards] = useState([
        { id: 1, name: 'SQUIRREL', power: 0, health: 2, sigilsTypes: ['NONE'], imageType: 'SQUIRREL', priceType: 0 },
        { id: 2, name: 'STOAT', power: 1, health: 2, sigilsTypes: ['NONE'], imageType: 'STOAT', priceType: -1 },
        { id: 3, name: 'STINKBUG', power: 0, health: 2, sigilsTypes: ['STINKY'], imageType: 'STINKBUG', priceType: 2 },
        { id: 4, name: 'STUNTED WOLF', power: 2, health: 2, sigilsTypes: ['NONE'], imageType: 'STUNTEDWOLF', priceType: -1 },
        { id: 5, name: 'WOLF', power: 3, health: 2, sigilsTypes: ['NONE'], imageType: 'WOLF', priceType: -2 },
        { id: 6, name: 'WOLF CUB', power: 1, health: 1, sigilsTypes: ['FLEDGELING'], imageType: 'WOLFCUB', priceType: -1 },
        { id: 7, name: 'RAT KING', power: 2, health: 1, sigilsTypes: ['NONE'], imageType: 'RATKING', priceType: -2 },
        { id: 8, name: 'URAYULI', power: 7, health: 7, sigilsTypes: ['NONE'], imageType: 'URAYULI', priceType: -4 },
    ]);

    const renderCards = (hasSecondLayer) => {
        let playerCardsSeparated = playerCards.slice(0, hasSecondLayer ? 5 : playerCards.length).map((card) => {
            card.lengthCard = playerCards.length;
            card.isDisabled = false;
            return (<InventoryCard className="play_cards" key={card.key} id={card.key} card={card} />);
        });
        if (hasSecondLayer) {
            playerCardsSeparated = playerCardsSeparated.concat(playerCards.slice(5, playerCards.length).map((card) => {
                card.lengthCard = playerCards.length;
                card.isDisabled = false;
                return (<InventoryCard className="play_cards" key={card.key} id={card.key} card={card} />);
            }));
        }
        return playerCardsSeparated;
    };

    return (<>
        <div className='inventory_container'>
            <div className='inventory_cards'>
                {playerCards.length > 5 ? renderCards(true) : renderCards(false)}
            </div>
        </div>
    </>)
}