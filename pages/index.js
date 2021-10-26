import { useState, useEffect } from "react";
import Card from "../components/Card";

const initialCard = { code: "" };
export default function Home({ cards }) {
  const [first, setFirst] = useState(initialCard);
  const [second, setSecond] = useState(initialCard);
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    if (matched) {
      setFirst(initialCard);
      setSecond(initialCard);
      setMatched(false);
    }
  }, [matched]);

  const getColor = (card) => {
    if (card.suit === "HEARTS" || card.suit === "DIAMONDS") return "red";
    return "black";
  };

  function setCards(card) {
    if (!first.code) setFirst(card);
    else if (!second.code && card.code !== first.code) setSecond(card);
    else if (
      first.value === second.value &&
      getColor(first) === getColor(second)
    ) {
      setMatched(true);
    } else {
      setFirst(initialCard);
      setSecond(initialCard);
    }
  }

  function getSelected(card) {
    if (card.code === first.code || card.code === second.code) return true;
    return false;
  }

  return (
    <div className="grid grid-cols-12 gap-4 p-8 min-h-screen max-w-7xl mx-auto">
      {cards &&
        cards.map((card) => {
          return (
            <div
              onClick={() => {
                setCards(card);
              }}
            >
              <Card
                key={card.code}
                image={card.image}
                selected={getSelected(card)}
                hasMatched={matched}
              />
            </div>
          );
        })}
    </div>
  );
}

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getStaticProps() {
  const deck = await getData(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const cards = await getData(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=52`
  );
  const newCards = cards.cards.map((card) => {
    return { ...card, matched: false };
  });
  return { props: { cards: newCards } };
}
