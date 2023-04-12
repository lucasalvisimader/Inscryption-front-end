import { CardService } from '../../../service';
import {Button, Form} from 'react-bootstrap';
import {useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import "./Card-register.css";

function CardRegister() {
  const nameRef = useRef();
  const powerRef = useRef();
  const healthRef = useRef();
  const sigilsRef = useRef();
  const imageRef = useRef();

  const [card, setCard] = useState({
    "name" : "",
    "power": 0,
    "health": 0,
    "sigilsTypes": [],
    "imageType": {}
  });

  const updateCard = (event) => {
    setCard({...card, [event.target.name] : event.target.value})
  }

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [noneSelected, setNoneSelected] = useState(false);

  function getCard() {
    // setCard({
    //   ...card, 
    //   imageType: selectedImage,
    // });
    console.log(card);
    // event.preventDefault();
    CardService.save(card);
  }

  const [imageOptions, setimageOptions] = useState([]);
  const [sigilOptions, setsigilOptions] = useState([]);
  const [selectedImage, setselectedImage] = useState("");

  useEffect(() => {
    CardService.getImages().then(response => {
      setimageOptions(response.data.map(user => ({
        value: user,
        label: user
      })))
    }).catch(e => {
      console.log(e);
    })
    CardService.getSigils().then(response => {
      setsigilOptions(response.data.map(user => ({
        value: user,
        label: user
      })))
    }).catch(e => {
      console.log(e);
    })
  }, [])

  const handleSelectChange = (selectedOptions) => {
    if (selectedOptions.length === 0) {
      setSelectedOptions(selectedOptions);
      setNoneSelected(false);
    } else if (selectedOptions.length <= 4){
      if (selectedOptions.find(option => option.value === "NONE")) {
        setSelectedOptions([{ value: "NONE", label: "None" }]);
        setNoneSelected(true);
      } else {
        setSelectedOptions(selectedOptions);
        setNoneSelected(false);
      }
    }
    setCard({
      ...card, 
      sigilsTypes: selectedOptions.map((option) => option.value),
    });
  };

  const handleImageType = (selectedImage) => {
    setselectedImage(selectedImage);
    if (selectedImage !== undefined) {
      imageRef.current.value = selectedImage.value;
    }
    setCard({
      ...card,
      imageType: selectedImage.value,
    });
  }
  
  return (
    <Form id="login" className='card_register'>
      <Form.Group className="mb-3">
        <Form.Label>Enter the card's name</Form.Label>
        <Form.Control name='name' onChange={updateCard} 
        ref={nameRef} type="text" placeholder="Name" required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Power</Form.Label>
        <Form.Control name='power' onChange={updateCard} 
        ref={powerRef} type="number" placeholder="Power" min="0" required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Health</Form.Label>
        <Form.Control name='health' onChange={updateCard} 
        ref={healthRef} type="number" placeholder="Health" min="1" required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Sigils</Form.Label>
        <Select ref={sigilsRef} 
        isMulti required name='sigilsTypes'
        placeholder="Sigils" 
        value={selectedOptions}
        onChange={handleSelectChange}
        isOptionDisabled={() => {
          if (selectedOptions.length >= 4 || noneSelected) {
            return true;
          }
          return false;
        }}
        className="basic-multi-select"
        classNamePrefix="select"
        options={sigilOptions} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>IMAGE</Form.Label>
        <Select ref={imageRef} required
        placeholder="Image" name='imageType'
        options={imageOptions}
        value={selectedImage}
        onChange={handleImageType} />
      </Form.Group>
      <Button id='card_register_button' variant="primary" type="submit" onClick={getCard}>
        Submit
      </Button>
    </Form>
  );
}

export default CardRegister;