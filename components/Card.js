import { useState, useEffect } from "react";

const joker = "https://deckofcardsapi.com/static/img/X1.png";

const Card = ({ value, suite, image, selected, hasMatched }) => {
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    if (selected && hasMatched) {
      setMatched(true);
    }
  }, [hasMatched, selected]);
  return (
    <div>
      <img
        src={matched ? image : selected ? image : joker}
        alt={`${value} of ${suite}`}
      />
    </div>
  );
};

export default Card;
