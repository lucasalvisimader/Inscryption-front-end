import {Button, Form} from 'react-bootstrap';
import {useRef, useState } from 'react';
import Select from 'react-select'
import "./Card-register.css"

function CardRegister() {
  const nameRef = useRef();
  const powerRef = useRef();
  const healthRef = useRef();
  const sigilsRef = useRef();
  const imageRef = useRef();

  const sigil_options = [
    { value: 'AIRBORNE', label: 'Airborne' },
    { value: 'BIFURCATEDSTRIKE', label: 'Bifurcated Strike' },
    { value: 'BONEKING', label: 'Bone King' },
    { value: 'FLEDGELING', label: 'Fledgeling' },
    { value: 'GUARDIAN', label: 'Guardian' },
    { value: 'HOARDER', label: 'Hoarder' },
    { value: 'LEADER', label: 'Leader' },
    { value: 'MANYLIVES', label: 'Many Lives' },
    { value: 'MIGHTYLEAP', label: 'Mighty Leap' },
    { value: 'NONE', label: 'None' },
    { value: 'REPULSIVE', label: 'Repulsive' },
    { value: 'SHARPQUILLS', label: 'Sharp Quills' },
    { value: 'STEELTRAP', label: 'Steel Trap' },
    { value: 'STINKY', label: 'Stinky' },
    { value: 'TOUCHOFDEATH', label: 'Touch of Death' },
    { value: 'TRIFURCATEDSTRIKE', label: 'Trifurcated Strike' },
    { value: 'UNKILLABLE', label: 'Unkillable' },
    { value: 'WATERBORNE', label: 'Waterborne' },
    { value: 'WORTHYSACRIFICE', label: 'Worthy Sacrifice' }
  ]

  const image_options = [
    { value: 'ADDER', label: 'Adder' },
    { value: 'ALPHA', label: 'Alpha' },
    { value: 'AMALGAM', label: 'Amalgam' },
    { value: 'AMOEBA', label: 'Amoeba' },
    { value: 'ANTQUEEN', label: 'Ant Queen' },
    { value: 'BAT', label: 'Bat' },
    { value: 'BEAVER', label: 'Beaver' },
    { value: 'BEE', label: 'Bee' },
    { value: 'BEEHIVE', label: 'Beehive' },
    { value: 'BLACKGOAT', label: 'Black goat' },
    { value: 'BLOOSHOUND', label: 'Blooshound' },
    { value: 'BULLFROG', label: 'Bullfrog' },
    { value: 'CAT', label: 'Cat' },
    { value: 'CHILD13', label: 'Child 13' },
    { value: 'COCKROACH', label: 'Cockroach' },
    { value: 'CORPSEMAGGOTS', label: 'Corpse Maggots' },
    { value: 'COYOTE', label: 'Coyote' },
    { value: 'ELK', label: 'Elk' },
    { value: 'ELKFAWN', label: 'Elk fawn' },
    { value: 'FIELDMICE', label: 'Field Mice' },
    { value: 'GECK', label: 'Geck' },
    { value: 'GREATERSMOKE', label: 'Greater Smoke' },
    { value: 'GREATWHITE', label: 'Great White' },
    { value: 'GRIZZLY', label: 'Grizzly' },
    { value: 'KINGFISHER', label: 'Kingfisher' },
    { value: 'LONGELK', label: 'Long Elk' },
    { value: 'MAGPIE', label: 'Magpie' },
    { value: 'MANTIS', label: 'Mantis' },
    { value: 'MANTISGOD', label: 'Mantis God' },
    { value: 'MOLE', label: 'Mole' },
    { value: 'MOLEMAN', label: 'Mole man' },
    { value: 'MOOSEBUCK', label: 'Moose buck' },
    { value: 'MOTHMAN', label: 'Mothman' },
    { value: 'OPOSSUM', label: 'Opossum' },
    { value: 'OUROBOROS', label: 'Ouroboros' },
    { value: 'PORCUPINE', label: 'Porcupine' },
    { value: 'PRONGHORN', label: 'Pronghorn' },
    { value: 'RABBIT', label: 'Rabbit' },
    { value: 'RATKING', label: 'Ratking' },
    { value: 'RATTLER', label: 'Rattler' },
    { value: 'RAVEN', label: 'Raven' },
    { value: 'RAVENEGG', label: 'Raven Egg' },
    { value: 'RINGWORM', label: 'Ringworm' },
    { value: 'RIVEROTTER', label: 'River Otter' },
    { value: 'RIVERSNAPPER', label: 'River snapper' },
    { value: 'SKINK', label: 'Skink' },
    { value: 'SKUNK', label: 'Skunk' },
    { value: 'SPARROW', label: 'Sparrow' },
    { value: 'SQUIRREL', label: 'Squirrel' },
    { value: 'STINKBUG', label: 'Stinkbug' },
    { value: 'STOAT', label: 'Stoat' },
    { value: 'STRANGELARVA', label: 'Strange Larva' },
    { value: 'STRANGEPUPA', label: 'Strange Pupa' },
    { value: 'STUNTEDWOLF', label: 'Stunted wolf' },
    { value: 'THESMOKE', label: 'The Smoke' },
    { value: 'TURKEYVULTURE', label: 'Turkey Vulture' },
    { value: 'UNDEADCAT', label: 'Undead Cat' },
    { value: 'URAYULI', label: 'Urayuli' },
    { value: 'WOLF', label: 'Wolf' },
    { value: 'WOLFCUB', label: 'Wolf cub' },
    { value: 'WORKERANT', label: 'Worker Ant' }
  ]

  const [card, setCard] = useState({
    "name" : "",
    "power": 0,
    "health": 0,
    "sigilsTypes": [],
    "imageType": ""
  });

  const updateCard = (event) => {
    setCard({...card, [event.target.name] : event.target.value})
}

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [noneSelected, setNoneSelected] = useState(false);
  let sigilText = "";
  selectedOptions.forEach(option => {
    sigilText += option.value + ", ";
  })
  sigilText = sigilText.slice(0, -2);

  function getCard(event) {
    event.preventDefault();
    alert("Name: " + nameRef.current.value + 
    "\nPower: " + powerRef.current.value +
    "\nHealth: " + healthRef.current.value +
    "\nSigils: " + sigilText +
    "\nImage: " + imageRef.current.value);
  }


  const handleSelectChange = (selectedOptions) => {
    setCard({...card, [selectedOptions.target.name] : selectedOptions.target.value})
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
  };
  
  return (
    <Form id="login" className='card_register'>
      <Form.Group className="mb-3">
        <Form.Label>Enter the card's name</Form.Label>
        <Form.Control onChange={updateCard} ref={nameRef} type="text" placeholder="Name" required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Power</Form.Label>
        <Form.Control onChange={updateCard} ref={powerRef} type="number" placeholder="Power" min="0" required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Health</Form.Label>
        <Form.Control onChange={updateCard} ref={healthRef} type="number" placeholder="Health" min="1" required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Sigils</Form.Label>
        <Select ref={sigilsRef} 
        isMulti required
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
        options={sigil_options} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>IMAGE</Form.Label>
        <Select ref={imageRef} required
        placeholder="Image" 
        options={image_options} 
        onChange={(selected) => {
          imageRef.current.value = selected.value;
          updateCard();
        }} />
      </Form.Group>
      <Button id='card_register_button' variant="primary" type="submit" onClick={getCard}>
        Submit
      </Button>
    </Form>
  );
}

export default CardRegister;