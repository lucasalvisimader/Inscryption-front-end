import { CardService, ImageCardService } from '../../../service';
import { toPng } from 'html-to-image';
import { useState, useEffect } from 'react';
import './Show-one-card.css';

function ShowOneCard() {
    const [card, setCard] = useState({})
    const [id, setId] = useState(0);
    const [cardStyle, setCardStyle] = useState({backgroundImage: `url('/images/imageType/blank.png')`});
    const [nameStyle, setNameStyle] = useState({});

    // Converte o conteúdo de um elemento HTML para uma imagem e a envia para o servidor.
    const convertToImage = async () => {
        const element = document.getElementById('card_show_one_card').firstChild; 
        // Obtém o primeiro filho do elemento do ID 'card_show_one_card'.
        try {
            const dataUrl = await toPng(element); 
            // Converte o elemento para uma imagem 
            // em formato de URL.
            const blob = dataURLToBlob(dataUrl);
            // Converte a URL em um objeto Blob.
        
            const formData = new FormData(); 
            // Cria um objeto FormData.
            formData.append('img', blob, 'image.png'); 
            // Adiciona o objeto Blob ao FormData com o nome 'img' e o nome de arquivo 'image.png'.
        
            ImageCardService.sendImage(formData, id); 
            // Envia o FormData e o valor do elemento com o ID 'show_one_card_id_input' 
            // para o serviço ImageCardService.
        } catch (error) {
          console.error('Erro ao converter HTML para imagem', error); 
          // Exibe um erro se houver problemas ao converter para imagem.
        }
    };

    // Obtém a imagem do servidor com base no ID fornecido.
    const getImage = async () => {
        const listImage = await ImageCardService.listImage("bucket-romario", id); 
        // Obtém a imagem do serviço ImageCardService com base no valor do elemento com o 
        // ID 'show_one_card_id_input'.
        
        if (listImage !== null && listImage !== undefined) {
            const imageURL = listImage.data; 
            // Obtém a URL da imagem retornada.

            const imgElement = document.createElement('img'); 
            // Cria um novo elemento de imagem.

            imgElement.src = imageURL;
            // Coloca a url da imagem como o valor da imageURL
            document.getElementById('card_show_one_card').innerHTML = ''; 
            // Limpa o conteúdo do elemento 
            // com o ID 'card_show_one_card'.

            document.getElementById('card_show_one_card').appendChild(imgElement); 
            // Adiciona o elemento de 
            // imagem ao elemento com o ID 'card_show_one_card'.
        }
    }
    
    function dataURLToBlob(dataUrl) {
        const arr = dataUrl.split(','); 
        //  A URL de dados é dividida em duas partes com base na vírgula. 
        // A primeira parte contém o cabeçalho da URL e a segunda parte contém os dados em si.

        const mime = arr[0].match(/:(.*?);/)[1]; 
        // Procura a parte da url antes da vírgula que está após
        // os dois pontos e antes do ponto e vírgula. O nome dessa parte é chamado de tipo de MIME da URL.

        const base64 = arr[1]; 
        // A parte dos dados em base64 é extraída da segunda parte da URL.
    
        const byteCharacters = atob(base64); 
        // A string em base64 é decodificada usando a função atob, 
        // que converte a string base64 em uma string ASCII.

        const byteNumbers = new Array(byteCharacters.length);
        //  Uma nova matriz de comprimento igual 
        // ao número de caracteres na string decodificada é criada. 
        // Essa matriz será preenchida com os códigos ASCII dos caracteres.

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i); 
            // Converte os caracteres em seus códigos ASCII correspondentes.
        }

        const byteArray = new Uint8Array(byteNumbers); 
        // Uma nova matriz de bytes sem sinal é criada 
        // usando a matriz byteNumbers.
        //  Isso é feito para garantir que os valores dos bytes sejam interpretados corretamente.
    
        const blob = new Blob([byteArray], { type: mime }); 
        //Um novo objeto Blob é criado usando a 
        // matriz de bytes e o tipo MIME extraído anteriormente. 
        // O objeto Blob representa os dados em formato binário.

        return blob;
    }

    async function handleOneCard() {
        console.log('handleOneCard() called');
        const [loginResponse] = await Promise.all([CardService.list(id)]);
        console.log(loginResponse.data);
        setCard(loginResponse.data);
        setCardStyle({
            backgroundImage: `url('/images/imageType/${loginResponse.data.imageType}.png')`,
        });
        setNameStyle({
            fontSize: `calc(3rem - ${loginResponse.data.name.length}px)`,
            marginBottom: `calc(${loginResponse.data.name.length}px - 120px)`,
        });
    }

    // Executa o código dentro do useEffect quando os valores de "card", "cardStyle" ou "nameStyle" 
    // são alterados.
    useEffect(() => {
        const cardElement = document.getElementById('card_show_one_card');
        cardElement.innerHTML = '';

        const cardContainer = document.createElement('div');
        cardContainer.className = 'card_edit_delete';
        cardContainer.id = 'card_show_one_card';

        const cardOneCard = document.createElement('div');
        cardOneCard.className = 'card_one_card';
        cardOneCard.style.backgroundImage = cardStyle.backgroundImage;

        const headerOneCard = document.createElement('div');
        headerOneCard.className = 'header_one_card';

        const cardNameOneCard = document.createElement('div');
        cardNameOneCard.className = 'cardName_one_card';

        const cardName = document.createElement('h2');
        cardName.style = nameStyle;
        cardName.textContent = card.name;

        cardNameOneCard.appendChild(cardName);
        headerOneCard.appendChild(cardNameOneCard);

        const footerOneCard = document.createElement('div');
        footerOneCard.className = 'footer_one_card';

        const powerOneCard = document.createElement('div');
        powerOneCard.id = 'power_one_card';

        const power = document.createElement('h1');
        power.textContent = card.power;

        const healthOneCard = document.createElement('div');
        healthOneCard.id = 'health_one_card';

        const health = document.createElement('h1');
        health.textContent = card.health;

        powerOneCard.appendChild(power);
        healthOneCard.appendChild(health);
        footerOneCard.appendChild(powerOneCard);
        footerOneCard.appendChild(healthOneCard);

        cardOneCard.appendChild(headerOneCard);
        cardOneCard.appendChild(footerOneCard);

        cardContainer.appendChild(cardOneCard);

        cardElement.appendChild(cardContainer);
    }, [card, cardStyle, nameStyle]);

    return <>
    <div className='cardAndSearch'>
        <div className='oneCard'>
            <div id="modal_one_card">
                <div className="modal-content">
                    <input type={'number'} placeholder={"Search by ID"} min={1}
                    onChange={(event) => setId(event.target.value)} id="show_one_card_id_input" required />
                    <div>
                        <button id='show_one_card_submit' className='button_show_one_card' type='submit' 
                        onClick={handleOneCard}>Get Image Attributes</button>
                        <button id='show_one_card_send_image' className='button_show_one_card' type='submit' 
                        onClick={convertToImage}>Send Image</button>
                        <button id='show_one_card_get_image' className='button_show_one_card' type='submit' 
                        onClick={getImage}>Get Image</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="card_edit_delete" id='card_show_one_card'>
            <div className="card_one_card" style={cardStyle}>
                <div className="header_one_card">
                    <div className="cardName_one_card">
                        <h2 style={nameStyle}>{card.name}</h2>
                    </div>
                </div>
                <div className="footer_one_card">
                    <div id="power_one_card">
                        <h1>{card.power}</h1>
                    </div>
                    <div id="health_one_card">
                        <h1>{card.health}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default ShowOneCard;