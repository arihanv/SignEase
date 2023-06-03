import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import { ArrowDown } from "react-bootstrap-icons";
import { HashLink as Link } from "react-router-hash-link";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Quiz() {
  const [input, setInput] = useState("");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState({});
  const [randomLetters, setRandomLetters] = useState([]);
  const getRandomAlphabet = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomizedAlphabet = alphabet.split("");
    randomizedAlphabet.sort(() => Math.random() - 0.5);
    const firstTenLetters = randomizedAlphabet.slice(0, 10);
    setRandomLetters(firstTenLetters);
  };

  const reset = () => {
    setIndex(0);
    setScore({});
    getRandomAlphabet();
  };

  useEffect(() => {
    getRandomAlphabet();
  }, []);

  useEffect(() => {
    console.log(score);
  }, [score]);
  return (
    <div className="App">
      <header className="App-header p-10 lg:px-20">
        <div className="h-[100vh] flex flex-col justify-center gap-4">
        <div className="flex flex-col gap-2 items-center">
            <a href="/" style={{all:"unset"}}>
            <div className="text-lg rounded-xl bg-gray-800 px-2 py-0.5 w-fit tracking-tight cursor-pointer">
Go Back To Home Page
            </div>
            </a>
        <h1 className="tracking-tighter text-7xl font-bold">Quiz</h1>
        </div>
          <div className="items-center">
            {randomLetters.length > 0 && index < 9 ? (
              <div className="bg-gray-900 p-2 rounded-xl">
                <div className="flex justify-center">
                  <img
                    className="rounded-xl w-[300px]"
                    src={require(`./images/signs/${randomLetters[
                      index
                    ].toLowerCase()}.jpeg`)}
                  ></img>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-10 aspect-square text-left">
                <div className="w-full text-center">
                  <h1 className="text-4xl font-bold">Results</h1>
                </div>
                <div className="text-left">
                  {Object.keys(score).map((key, index) => {
                    return (
                      <div>
                        {randomLetters[key]}:{" "}
                        {score[key] ? "correct" : "incorrect"}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {index < 9 ? (
            <div className="flex flex-col items-center gap-2">
              <div className="text-xl font-semibold tracking-tighter">
                Enter the letter you see above
              </div>
              <div className="w-[50px]">
                <InputGroup size="lg">
                  <Form.Control
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                  />
                </InputGroup>
              </div>
              <Button
                onClick={() => {
                  if (index < 9 && input != "") {
                    if (
                      input.toLowerCase() == randomLetters[index].toLowerCase()
                    ) {
                      console.log("correct");
                      setScore({ ...score, [index]: true });
                    } else {
                      console.log("incorrect");
                      console.log(randomLetters[index].toLowerCase());
                      setScore({ ...score, [index]: false });
                    }
                    setInput("");
                    setIndex(index + 1);
                  }
                }}
              >
                Submit
              </Button>
            </div>
          ) : (
            <Button className="mt-3" onClick={() => reset()}>
              Reset
            </Button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Quiz;
