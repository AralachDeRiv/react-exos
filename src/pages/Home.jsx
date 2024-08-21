import React, { useEffect } from "react";
import "../styles/Home.css";
import "../styles/TodoList.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const LinkToExo = ({ name, linkStyle, linkTo, newBackground, onClick }) => {
  return (
    <div className={`link-container ${linkStyle}`}>
      <NavLink onClick={() => onClick(linkTo, newBackground)}>
        <h2>{name}</h2>
      </NavLink>
    </div>
  );
};

const Home = () => {
  const [underBacground, setUnderBacground] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { newBackground } = location.state || {
    newBackground: "default-background",
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    setUnderBacground(newBackground);
    const start = async () => {
      const links = document.querySelectorAll(".link-container");

      await delay(200);

      links.forEach(async (link, idx) => {
        setTimeout(() => {
          link.style.transform = "translateX(0px)";
        }, idx * 200);
      });
    };
    start();
  }, []);

  const handleNavigation = (link, newBackground) => {
    setUnderBacground(newBackground);

    const links = document.querySelectorAll(".link-container");

    setTimeout(() => {
      links.forEach(async (link, idx) => {
        setTimeout(() => {
          if (idx % 2) {
            link.style.transform = "translateX(-10000px)";
          } else {
            link.style.transform = "translateX(10000px)";
          }
        }, idx * 200);
      });

      setTimeout(() => {
        navigate(link);
      }, links.length * 200);
    }, 200);
  };

  return (
    <div className={underBacground}>
      <div className="page-container home-page-container">
        <LinkToExo
          name="Todo List"
          linkStyle="todo-link"
          linkTo={"/todoList"}
          newBackground={"todo-new-background"}
          onClick={handleNavigation}
        />
        <LinkToExo
          name="Emoji Search"
          linkStyle={"emojiSearch-link"}
          linkTo={"/emojiSearch"}
          newBackground={"emojiSearch-new-background "}
          onClick={handleNavigation}
        />
        <LinkToExo
          name="Stop Watch"
          linkStyle={"stopWatch-link"}
          linkTo={"/stopWatch"}
          newBackground={"stopWatch-new-background"}
          onClick={handleNavigation}
        />
        <LinkToExo
          name={"Markdown Reader"}
          linkStyle={"markdownReader-link"}
          linkTo={"/markdownReader"}
          newBackground={"markdownReader-new-background"}
          onClick={handleNavigation}
        />
      </div>
    </div>
  );
};

export default Home;
