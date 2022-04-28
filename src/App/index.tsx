import Header from "./components/Header";
import WelcomeContent from "./components/Welcome";
import BottomSection from "./components/BottomSection";
import TicketSection from "./components/TicketSection";
import ComingSoon  from "./components/ComingSoon";
import { Footer } from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Page404 from "./components/404";

function App() {

  return (
    <Router>
      <div className="App">
        <div className="bg-1">
        <Header/>
        </div>
        <Switch>
          <Route exact path = "/">
            <div className="bg-1">
              <WelcomeContent />
              <BottomSection />
            </div>
          </Route>

          <Route path="/basic">
            <TicketSection title="Basic" amount = {1} raffleCategory = {0}/>
          </Route>

          <Route path="/investor">
            <TicketSection title="Investor" amount = {10} raffleCategory= {1}/>
          </Route>

          <Route path="/whale">
            <TicketSection title="Whale" amount = {100} raffleCategory = {2}/>
          </Route>

          <Route path="/coming">
            <ComingSoon />
          </Route>

          <Route component={Page404} />
        </Switch>
        <Footer></Footer>
    </div>
    </Router>
  );
}

export default App;
