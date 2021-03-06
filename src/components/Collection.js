import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCollectionThunk } from "../redux/actions/collectionThunk";
import Alice from "./Alice";
import Alice1 from "./Alice1";
import { getUserThunk } from "../redux/actions/userThunk";
import UserCards from "./UserCards";

export default function Collection() {
  const [user] = useSelector((state) => [state.user.user]);
  const [collection] = useSelector((state) => [state.collection.collection]);
  const [usercards] = useSelector((state) => [state.usercards.usercards]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCollectionThunk(user.collection_id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  const [cards, setCards] = useState([]);
  const [cardNums, setCardNums] = useState([]);
  const [collectionFetched, setCollectionFetched] = useState(false);
  const [getAllCards, setGetAllCards] = useState(false);

  // const addCard = (newCard) => {
  //   dispatch({ type: "ADD_CARD", newItem: newCard });
  // };

  // const reset = () => {
  //   dispatch({ type: "RESET" });
  // };

  useEffect(() => {
    getCardsFromCollection();
  }, [collection]);

  console.log(collection);
  console.log(cards);

  async function getCardsFromCollection() {
    let currentCardId = "";
    for (let i = 0; i < collection.length; i++) {
      currentCardId = collection[i].card_id;

      console.log(currentCardId);
      if (!cardNums.includes(currentCardId)) {
        cardNums.push(currentCardId);
        try {
          console.log("hello");
          const response = await fetch(
            `https://tcgdex.herokuapp.com/card/${currentCardId}`
          );
          const cardData = await response.json();
          console.log(cardData);
          console.log(response);
          cards.push(cardData);
          console.log(cards);
        } catch (err) {
          console.error(err.message);
        }
      }
    }
  }

  const handleGetAllCards = () => {
    setGetAllCards(true);
  };

  return (
    <Fragment>
      <div className="NavBars">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 1024 1024"
          fill="currentColor"
        >
          <path
            strokeWidth="1"
            d="M 512.00,96.80
           C 304.28,96.94 132.17,249.33 101.24,448.41
             101.24,448.41 312.51,448.80 312.51,448.80
             339.50,364.37 418.60,303.25 512.00,303.20
             605.25,303.31 684.24,364.33 711.33,448.61
             711.33,448.61 922.53,448.80 922.53,448.80
             891.82,249.60 719.75,97.06 512.00,96.80
             512.00,96.80 512.00,96.80 512.00,96.80 Z
           M 512.00,376.80
           C 436.89,376.80 376.00,437.69 376.00,512.80
             376.00,587.91 436.89,648.80 512.00,648.80
             512.00,648.80 512.00,648.80 512.00,648.80
             587.11,648.80 648.00,587.91 648.00,512.80
             648.00,512.80 648.00,512.80 648.00,512.80
             648.00,437.69 587.11,376.80 512.00,376.80
             512.00,376.80 512.00,376.80 512.00,376.80
             512.00,376.80 512.00,376.80 512.00,376.80 Z
           M 101.47,576.80
           C 132.18,776.00 304.25,928.54 512.00,928.80
             719.72,928.66 891.83,776.27 922.76,577.19
             922.76,577.19 711.49,576.80 711.49,576.80
             684.50,661.23 605.40,722.35 512.00,722.40
             418.75,722.29 339.76,661.27 312.67,576.99
             312.67,576.99 101.47,576.80 101.47,576.80
             101.47,576.80 101.47,576.80 101.47,576.80 Z"
          />
        </svg>
        <Link className="Links" to="/home">
          Home
        </Link>
        <Link className="Links" to="/userProfile">
          UserProfile
        </Link>
        <Link className="Links" to="/login">
          Login
        </Link>
        <Link className="Links" to="/collection">
          Collection
        </Link>
        <Link className="Links" to="/search">
          Search
        </Link>
        <Link className="Links" to="/reduxtest">
          ReduxTest
        </Link>
      </div>

      {/* {!getAllCards ? ( <div>What would you like to do {user.username}?</div>
      <button onClick={handleGetAllCards}>Show All My Cards</button>
        ) : (<div>{user.username}'s Collection</div> 
        <UserCards usercards={cards}></UserCards>
          )}
           */}

      <div className="cardImages">
        {!getAllCards ? (
          <>
            <div>What would you like to do {user.username}?</div>
            <button onClick={handleGetAllCards}>Show All My Cards</button>
          </>
        ) : (
          <>
            <h1>{user.username}'s Collection</h1>
            <UserCards usercards={cards}></UserCards>
          </>
        )}
      </div>

      <div>
        {/* {cards.map((card) => (
          <div key={card.card_id}>
            <img src={card.image} />
          </div>
        ))} */}
      </div>
      <br />
      <br />
      <br />
      <Alice />
      <Alice1 />
    </Fragment>
  );
}
