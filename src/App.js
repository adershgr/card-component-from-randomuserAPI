
import React, { useEffect, useState } from "react";
import { Card } from 'react-bootstrap'  ;
import axios from "axios";
import "./App.css";


const App = () => {
  const [cardData, setCardData] = useState([]);
  const [visible, setVisible] = useState(0);

  const allCardData = async () => {
    const response = await axios.get("https://randomuser.me/api/?results=3");
    setCardData(response.data.results);
  };

  const loadMore = () => {
    setVisible(visible + 1);
  };

  useEffect(() => {
    allCardData();
  }, []);

  const renderCard = (person, index) => {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={person.picture.large} />
        <Card.Body>
          <Card.Title>
            {person.name.first} {person.name.last}
          </Card.Title>
          <Card.Text>
           {person.location.street.number}-{person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.country}    
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="App">
    
        <div className="cards">
          {cardData.slice(0, visible).map(renderCard)}
        </div>
    
      {visible < cardData.length && (
      <button type="button" class="btn btn-success" onClick={loadMore}> + </button>
      )}
    </div>
  );
};

export default App;

