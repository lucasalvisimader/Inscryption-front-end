import { toPng } from 'html-to-image';
import { useState } from 'react';
import { CardService } from '../../service';

const converterParaImagem = async () => {
    const element = document.getElementById('testImage');
    try {
      const dataUrl = await toPng(element);
      const blob = dataURLToBlob(dataUrl);
  
      const formData = new FormData();
      formData.append('img', blob, 'image.png');
      
      CardService.sendImage(formData);
    } catch (error) {
      console.error('Erro ao converter HTML para imagem', error);
    }
};


function dataURLToBlob(dataUrl) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const base64 = arr[1];

    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: mime });
    return blob;
}

function TestImage() {
    const [card, setCard] = useState({})
    const [id, setId] = useState(0);
    const [cardStyle, setCardStyle] = useState({backgroundImage: `url('/images/imageType/blank.png')`});
    const [nameStyle, setNameStyle] = useState({});

    async function handleOneCard() {
        const [loginResponse] = await Promise.all([
            CardService.list(id)
        ])
        setCard(loginResponse.data);
        setCardStyle({backgroundImage: `url('/images/imageType/${loginResponse.data.imageType}.png')`});
        setNameStyle({
            fontSize: `calc(3rem - ${loginResponse.data.name.length}px)`,
            marginBottom: `calc(${loginResponse.data.name.length}px - 120px)`
        });
    }

    return <div className='cardAndSearch'>
        <div className='oneCard'>
            <div id="modal_one_card">
                <div className="modal-content">
                    <input type={'number'} placeholder={"Search by ID"} 
                    onChange={(event) => setId(event.target.value)} required />
                    <div>
                        <button id='show_one_card_submit' type='submit' onClick={handleOneCard}>Submit</button>
                        <button id='show_one_card_send_image' type='submit' onClick={converterParaImagem}>Send Image</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="card_edit_delete" id='testImage'>
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
}

export default TestImage;