import { GetStaticProps, NextPage } from "next";
import { useState, useEffect } from "react";
import Card from "../components/Card";

interface Deck {
  success: boolean;
  deck_id: string;
  remaining: number;
  shuffled: boolean;
}

interface ICard {
  code: string;
  image: string;
  images?: {
    svg: string;
    png: string;
  };
  value: string;
  suit: string;
}

interface Cards {
  success: boolean;
  deck_id: string;
  remaining: number;
  cards: ICard[];
}

interface HomeProps {
  cards: ICard[];
}

const initialCard: ICard = { code: "", image: "", suit: "", value: "" };

const Home: NextPage<HomeProps> = ({ cards }) => {
  const [first, setFirst] = useState<ICard>(initialCard);
  const [second, setSecond] = useState<ICard>(initialCard);
  const [matched, setMatched] = useState<boolean>(false);

  useEffect(() => {
    if (matched) {
      setFirst(initialCard);
      setSecond(initialCard);
      setMatched(false);
    }
  }, [matched]);

  const getColor = (card: ICard): string => {
    if (card.suit === "HEARTS" || card.suit === "DIAMONDS") return "red";
    return "black";
  };

  function setCards(card: ICard): void {
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

  function getSelected(card: ICard): boolean {
    if (card.code === first.code || card.code === second.code) return true;
    return false;
  }

  return (
    <div className="grid grid-cols-12 gap-4 p-8 min-h-screen max-w-7xl mx-auto">
      {cards &&
        cards.map((card) => {
          return (
            <div
              key={card.code}
              onClick={() => {
                setCards(card);
              }}
            >
              <Card
                image={card.image}
                value={card.value}
                suit={card.suit}
                selected={getSelected(card)}
                hasMatched={matched}
              />
            </div>
          );
        })}
    </div>
  );
};

async function getData(url: string): Promise<any> {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getStaticProps() {
  const deck: Deck = await getData(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const cards: Cards = await getData(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=52`
  );
  return { props: { cards: cards.cards } };
}

export default Home;
