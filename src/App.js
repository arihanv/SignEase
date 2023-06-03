import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import signImage from "./images/sign.png";
import Button from "react-bootstrap/Button";
import { ArrowDown } from "react-bootstrap-icons";

function App() {
  return (
    <div className="App">
      <header className="App-header p-10 lg:px-20">
        <div className="h-[100vh] flex flex-col justify-center">
          <div className="grid md:grid-cols-[1fr,1fr] items-center">
            <p className="lg:text-7xl text-5xl tracking-tight sm:text-left font-bold whitespace-break-spaces flex flex-col gap-2">
              Welcome to{" "}
              <span className="inline-block lg:text-9xl text-6xl">
                Sign Ease!
              </span>
              <span className="text-2xl mt-3 tracking-tight bg-gray-900 w-fit rounded-xl px-2 py-0.5">
                Made for <b className="text-red-500">M</b>
                <b className="text-blue-500">L</b>
                <b className="text-yellow-500">H</b> <i>Hack Your Portfolio</i>{" "}
                2023!
              </span>
            </p>
            <div className="flex justify-center">
              <img
                className="invert w-[300px] md:block hidden animate-wiggle animate-infinite"
                src={signImage}
              ></img>
            </div>
          </div>
          <div className="flex-col items-center flex justify-center">
            <ArrowDown className="animate-bounce mt-10 text-7xl" />
            <div className="text-left">
              <a className="mt-5 text-left">
                <Button href="#nav" size="lg">
                  Get Started
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="lg:pb-52 flex justify-center">
          <div id="nav" className="flex flex-col gap-4">
            <div className="text-6xl tracking-tighter font-bold">
              Choose Your Adventure
            </div>
            <div className="md:grid grid-cols-2 gap-5 w-full flex justify-center flex-wrap">
              <div className="bg-gray-900 p-2 rounded-xl h-[300px] aspect-square md:h-full">
                <div className="aspect-square bg-black justify-center flex items-center p-3 rounded-xl h-full lg:w-[300px]">
                  <div className="flex flex-col gap-2 items-center">
                    <h1 className="tracking-tighter font-bold">Quiz</h1>
                    <Button className="w-fit animate-wiggle animate-infinite">
                      Let's Go
                    </Button>
                    <div className="text-base rounded-xl p-3">
                      Test your sign language knowledge with our quiz!
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 p-2 rounded-xl  h-[300px] aspect-square md:h-full">
                <div className="aspect-square bg-black justify-center flex items-center p-3 rounded-xl h-full lg:w-[300px]">
                  <div className="flex flex-col gap-2 items-center">
                    <h1 className="tracking-tighter font-bold">Learn</h1>
                    <Button className="w-fit animate-wiggle animate-infinite">
                      Let's Go
                    </Button>
                    <div className="text-base rounded-xl p-3">
                      Learn Sign Language through our machine learning model
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
