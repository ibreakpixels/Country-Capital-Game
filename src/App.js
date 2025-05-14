import { useEffect, useRef, useState } from "react";

function App() {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const buttonRef = useRef(null);

  let DATA = [
    {
      name: "India",
      capital: "Delhi",
    },
    {
      name: "China",
      capital: "Bazzoka",
    },
  ];
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
      let match = DATA.find(
        (item) => item.name == country && item.capital == capital
      );
      if (match) {
        btn.classList.add("btn-success");
        activeBtn.classList.add("btn-success");
        setTimeout(() => {
          btn.remove();
          activeBtn.remove();
        }, 5000);
        setCount(() => count + 1);
      } else {
        btn.classList.add("btn-danger");
        activeBtn.classList.add("btn-danger");
        setTimeout(() => {
          btn.classList.remove("btn-danger");
          activeBtn.classList.remove("btn-danger", "btn-primary");
        }, 5000);
      }
      buttonRef.current = null;
      setActive(false);
    }
  };

  useEffect(() => {
    if (count === countries.length) {
      document.body.innerText = "Congratulations! You have won the game!";
    }
  }, [count]);

  const shuffle = (arr) => {
    let currentIndex = arr.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
  };

  return (
    <>
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
}

export default App;
