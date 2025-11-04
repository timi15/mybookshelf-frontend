import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Layout} from "./component/Layout";
import {Home} from "./page/Home";
import {Favourites} from "./page/Favourites";
import {ToRead} from "./page/ToRead";
import {Reviews} from "./page/Reviews";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}> </Route>
                    <Route path="/favourites" element={<Favourites/>}> </Route>
                    <Route path="/to-read" element={<ToRead/>}> </Route>
                    <Route path="/book-reviews" element={<Reviews/>}> </Route>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
