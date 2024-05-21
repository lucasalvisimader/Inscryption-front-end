// css
import './InventoryCard.css';

// translation
import { useTranslation } from 'react-i18next';

export const InventoryCard = (props) => {
    const id = props.id;
    const card = props.card;
    const { t } = useTranslation();
    const style = {background: `url('/images/imageType/${card.imageType}.png')`}

    return (<>
        <div className='inventory_card_container' style={style} id={`inventory_card_container_${id}`}>
            <div className='inventory_card_header'>
                <span className='inventory_card_name' style={{ fontSize: `calc(1rem - ${card.name.length / 3}px` }}>
                    {card.name}
                </span>
            </div>
            <img className='inventory_card_image' src={require(`../../assets/images/card/image_type/${card.imageType.toLowerCase()}.png`)} alt={t('card_image')} />
            <div className='inventory_card_footer'>
                <span className='inventory_card_power'>
                    {card.power}
                </span>
                <span className='inventory_card_health'>
                    {card.health}
                </span>
            </div>
        </div>
    </>);
}