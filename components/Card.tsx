import { useState, useEffect } from "react";

interface CardProps {
  value: string;
  suit: string;
  image: string;
  selected: boolean;
  hasMatched: boolean;
}

const joker: string = "https://deckofcardsapi.com/static/img/X1.png";

const Card: React.FC<CardProps> = ({
  value,
  suit,
  image,
  selected,
  hasMatched,
}) => {
  const [matched, setMatched] = useState<boolean>(false);

  useEffect(() => {
    if (selected && hasMatched) {
      setMatched(true);
    }
  }, [hasMatched, selected]);

  return (
    <div>
      <img
        src={matched ? image : selected ? image : joker}
        alt={`${value} of ${suit}`}
      />
    </div>
  );
};

export default Card;
