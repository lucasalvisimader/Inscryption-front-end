import { React, useState, useEffect } from "react";
import { CardService } from "../../../service";
// import { ContentEditable } from "react-contenteditable";
import "./Show-all-cards.css";

function ShowAllCards() {

    const [cards, setCards] = useState([]);

    const stoatLines = ["Good Luck.", "Good Luck...", "This again?", 
    "Fingers crossed.", "Are you seriou-", "Wow... seriously?",
    "Again?", "Oh come on!"];
    let stoatName = Math.floor(Math.random() * 4);

    const stinkBugLines = ["Salutations.", "Shall we?", "Masterful.",
    "Death take me!", "That stings!", "My flesh..."];
    let stinkBugName = Math.floor(Math.random() * 3);

    const stuntedWolfLines = ["We meet again.", "Greetings.", "Hello again.",
    "Betrayal.", "Farewell.", "Ahem."];
    let stuntedWolfName = Math.floor(Math.random() * 3);
    
    
    const [showModal, setShowModal] = useState(false);
    const [cardIdToDelete, setCardIdToDelete] = useState(null);

    useEffect(() => {
        CardService.listAll().then(response => {
            setCards(response.data);
        }).catch(e => {
            console.log(e);
        })
    }, []);
    
    function deleteCard(id) {
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
    }

    function handleDelete(id) {
        setCardIdToDelete(id);
        setShowModal(true);
    }
    
    function handleConfirmDelete() {
        setShowModal(false);
        const updatedCards = cards.map((card) => {
            if (card.id === cardIdToDelete && card.imageType === "STOAT") {
                stoatName = Math.floor(Math.random() * 4) + 4;
                stoatName = stoatLines[stoatName];
                return {
                    ...card,
                    name: stoatName
                };
            } else if (card.id === cardIdToDelete && card.imageType === "STINKBUG") {
                stinkBugName = Math.floor(Math.random() * 3) + 3;
                stinkBugName = stinkBugLines[stinkBugName];
                return {
                    ...card,
                    name: stinkBugName
                };
            } else if (card.id === cardIdToDelete && card.imageType === "STUNTEDWOLF") {
                stuntedWolfName = Math.floor(Math.random() * 3) + 3;
                stuntedWolfName = stuntedWolfLines[stuntedWolfName];
                return {
                    ...card,
                    name: stuntedWolfName
                };
            }
            return {
                ...card,
            };
        });
        setTimeout(() => {
            deleteCard(cardIdToDelete);
        }, 300);
        setCards(updatedCards);
        CardService.remove(cardIdToDelete);
        setCardIdToDelete(null)
    }

    const PageCards = cards.map((card, id) => {
        const cardStyle = {
            backgroundImage: `url('/images/imageType/${card.imageType}.png')`
        };

        const nameStyle = {
            fontSize: `calc(3rem - ${card.name.length}px)`,
            marginBottom: `calc(${card.name.length}px - 120px)`
        };

        function getCardName() {
            if ((card.imageType ===  "STOAT" && 
                (stoatLines.some((e) => {
                    return card.name === e
                }))) || 
                (card.imageType ===  "STINKBUG" && 
                (stinkBugLines.some((e) => {
                    return card.name === e
                }))) || 
                (card.imageType ===  "STUNTEDWOLF" && 
                (stuntedWolfLines.some((e) => {
                    return card.name === e
                })))) {
                return "cardNameSpecial";
            }
        }

        let cardName = getCardName();

        return (
            <div className="card_edit_delete" key={id}>
                <div className="card" style={cardStyle}>
                    <div className="header">
                        <div className="cardName" id={cardName}>
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
                        <button id="delete_button_card" onClick={() => handleDelete(card.id)}>DELETE</button>
                    </div>
                </div>
            </div>
        );
    });

    return <div>
        <div id="page_cards">{PageCards}</div>
        {showModal && (
            <div id="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <span>Do you <b>really</b> want to delete this card?</span>
                        <div>
                            <button onClick={handleConfirmDelete}>Yes</button>
                            <button onClick={() => setShowModal(false)}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
    
}

export default ShowAllCards;
