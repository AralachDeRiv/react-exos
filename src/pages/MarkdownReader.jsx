import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { marked } from "marked";
import "../styles/MarkdownReader.css";

const MarkdownRender = ({ input }) => {
  const html = marked(input);
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ whiteSpace: "pre-wrap" }}
      ></div>
    </>
  );
};

const MarkdownReader = () => {
  const [input, setInput] = useState("Hello World !");
  const navigate = useNavigate();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const screen = document.querySelector(".screen-container");
    const keyboard = document.querySelector(".keyboard-container");
    const input = document.querySelector(".input-container");

    const start = async () => {
      await delay(400);
      screen.style.transform = "translateX(0px)";
      await delay(400);
      input.style.transform = "translateX(0px)";
      await delay(400);
      keyboard.style.opacity = "1";
    };
    start();
  }, []);

  const backHome = async () => {
    const screen = document.querySelector(".screen-container");
    const keyboard = document.querySelector(".keyboard-container");
    const input = document.querySelector(".input-container");

    await delay(200);
    keyboard.style.opacity = "0";
    screen.style.transform = "translateX(0px)";
    await delay(400);
    input.style.transform = "translateX(1000px)";
    await delay(400);
    screen.style.transform = "translateX(-1000px)";
    await delay(300);

    navigate("/", {
      state: {
        newBackground: "markdownReader-new-background",
      },
    });
  };

  const addMDSyntax = (syntax) => {
    let newInput = input ? input + `\n${syntax}` : syntax;
    setInput(newInput);
  };

  return (
    <div className="page-container mardownReader-page-container">
      <div className="scale-container">
        <div className="first-container">
          <div className="screen-container">
            <main className="lx-container-80">
              <div className="lx-row flow-column-wrap">
                <div className="laws" style={{ whiteSpace: "pre-wrap" }}>
                  <MarkdownRender input={input} />
                </div>
              </div>
            </main>
            <div className="overlay" />
          </div>
          <div className="keyboard-container">
            <div className="keyboard-keys-container">
              <div className="button" onClick={() => addMDSyntax("**Strong**")}>
                Strong
              </div>
              <div className="button" onClick={() => addMDSyntax("# H1 title")}>
                H1
              </div>
              <div
                className="button"
                onClick={() => addMDSyntax("## H2 title")}
              >
                H2
              </div>
              <div
                className="button"
                onClick={() => addMDSyntax("### H3 title")}
              >
                H3
              </div>
              <div className="button" onClick={() => addMDSyntax("*Italic*")}>
                Italic
              </div>
              <div className="button" onClick={() => addMDSyntax("___")}>
                Line
              </div>
              <div
                className="button"
                onClick={() => addMDSyntax("[link](https://duckduckgo.com/)")}
              >
                Link
              </div>
              <div className="button" onClick={() => setInput("")}>
                Reset
              </div>
              <div className="button" id="BackHome" onClick={backHome}>
                BackHome
              </div>
            </div>
          </div>
        </div>
        <div className="input-container">
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default MarkdownReader;
