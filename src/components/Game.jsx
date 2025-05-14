import { useEffect, useRef, useState } from "react";
import DATA from "../data.json";

const Game = () => {
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);
  const buttonRef = useRef(null);

  const countries = [
    ...DATA.map((item) => {
      return item.name;
    }),
  ];

  const capitals = [
    ...DATA.map((item) => {
      return item.capital;
    }),
  ];

  const handleClick = (event) => {
    const btn = event.target;
    const value = btn.innerText;

    if (!active && countries.includes(value)) {
      btn.classList.add("btn-primary");
      setActive(true);
      buttonRef.current = btn;
    }

    // If an option is active
    if (active) {
      let activeBtn = buttonRef.current;
      let country = activeBtn.innerText;
      let capital = btn.innerText;
      let match = DATA.find((item) => item.name === country && item.capital === capital);
      if (match) {
        btn.classList.add("btn-success");
        activeBtn.classList.add("btn-success");
        setTimeout(() => {
          btn.remove();
          activeBtn.remove();
        }, 1000);
        setScore(() => score + 1);
      } else {
        btn.classList.add("btn-danger");
        activeBtn.classList.add("btn-danger");
        setTimeout(() => {
          btn.classList.remove("btn-danger");
          activeBtn.classList.remove("btn-danger", "btn-primary");
        }, 1000);
      }
      buttonRef.current = null;
      setActive(false);
    }
  };

  const playAgain = () => {
    setScore((prevScore) => (prevScore = 0));
  };

  const shuffle = (arr) => {
    let currentIndex = arr.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
  };

  useEffect(() => {
    if (score === capitals.length) {
      setTimeout(() => {
        document.body.innerHTML = `<p>Congratulations! You have won the game! <a href="#" onClick=${{
          playAgain,
        }}>Play Again</a></p>`;
      }, 1000);
    }
  }, [score]);

  return (
    <>
      <h3>Score: {score}</h3>

      <div className="flex-box">
        {[...countries, ...capitals].map((item, index) => {
          return (
            <button key={index} onClick={handleClick}>
              {item}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Game;
