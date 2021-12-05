import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Game from "./Game";
import Leaderboard from "./Leaderboard";
import Footer from "./Footer";
import "./App.scss";

function App() {
  // const [isGameRunning, setIsGameRunning] = useState(false);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <main className="wrapper">
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
        <Route path="/leaderboard" component={Leaderboard} />
      </main>

      <Footer />
    </Router>
  );
}

export default App;
