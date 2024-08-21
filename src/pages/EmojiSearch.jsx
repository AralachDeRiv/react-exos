import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/EmojiSearch.css";
import emojis from "../jsonFile/emojis.json";

const EmojiSearch = () => {
  const [searchedEmojis, setSearchedEmojis] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const start = async () => {
      const title = document.querySelector("h1");
      const input = document.querySelector("input");
      const btn = document.querySelector(".backHome-btn");
      await setTimeout(() => {
        title.style.transform = "translateY(0px)";
        input.style.transform = "translateY(0px)";
      }, 200);
      await setTimeout(() => {
        btn.style.transform = "translateX(0px)";
      }, 400);
    };
    start();
  }, []);

  const searchEmojis = (e) => {
    if (e.key == "Enter") {
      console.log(searchInput);

      let result = emojis.filter((emoji) => {
        return emoji.title.toLowerCase().includes(searchInput);
      });
      setSearchedEmojis(result);
    }
  };

  const copyToclipBoard = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    toast.success("Emoji copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: false,
      style: { backgroundColor: "#fef9f3", color: "#f9b522", fontSize: "20px" }, // Couleur de fond orange
    });
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const backHomeLink = async () => {
    const title = document.querySelector("h1");
    const input = document.querySelector("input");
    const btn = document.querySelector(".backHome-btn");
    document.querySelector(".emojis-container").innerHTML = "";
    document.querySelector(".commentar").innerHTML = "";

    title.style.transform = "translateY(-1000px)";
    input.style.transform = "translateY(-1000px)";
    await delay(200);
    btn.style.transform = "translateX(-1000px)";
    await delay(400);

    navigate("/", {
      // Envoie le background pour la transition chez home Page
      state: {
        newBackground: "emojiSearch-new-background",
      },
    });
  };

  return (
    <div className="page-container EmojiSearch-page-container">
      <ToastContainer />
      <button className="backHome-btn" onClick={backHomeLink}>
        Back Home !
      </button>

      <h1>😎 EmojiSearch 😎</h1>

      <input
        type="text"
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => searchEmojis(e)}
      />

      <p className="commentar">
        {searchedEmojis.length
          ? "Click on emojis to copy on the clipboard"
          : ""}
      </p>

      <div className="emojis-container">
        {searchedEmojis.map((emoji, idx) => (
          <div key={idx} className="emoji-container">
            <p className="emoji-title">{emoji.title}</p>
            <p className="emoji-symbol" onClick={(e) => copyToclipBoard(e)}>
              {emoji.symbol}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiSearch;
