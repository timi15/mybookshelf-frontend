import { Routes, Route, Navigate} from "react-router-dom";
import {Layout} from "./component/Layout";
import {Home} from "./page/Home";
import {Favourites} from "./page/Favourites";
import {ToRead} from "./page/ToRead";
import {Reviews} from "./page/Reviews";
import {Login} from "./page/Login";
import {SignUp} from "./page/SignUp";
import {ProtectedRoute} from "./component/ProtectedRoute";

function App() {

    return (
            <Routes>

                <Route path="/" element={<Navigate to="/sign-in" replace/>}/>
                <Route path="/sign-in" element={<Login/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>


                <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/favourites" element={<Favourites/>}/>
                    <Route path="/to-read" element={<ToRead/>}/>
                    <Route path="/book-reviews" element={<Reviews/>}/>
                </Route>
            </Routes>
    );
}

export default App;
