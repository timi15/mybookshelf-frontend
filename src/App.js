import {Routes, Route, Navigate} from "react-router-dom";
import {Layout} from "./component/Layout";
import {Login} from "./page/Login";
import {SignUp} from "./page/SignUp";
import {ProtectedRoute} from "./component/ProtectedRoute";
import {Home} from "./page/Home";
import {Library} from "./page/Library";
import {Loved} from "./page/Loved";
import {ToRead} from "./page/ToRead";
import {Reviews} from "./page/Reviews";
import {Profile} from "./page/Profile";
import {Dashboard} from "./page/Dashboard";
import {NotFound} from "./page/NotFound";

function App() {

    return (
        <Routes>

            <Route path="/" element={<Navigate to="/sign-in" replace/>}/>
            <Route path="/sign-in" element={<Login/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>


            <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
                <Route path="/home" element={<Home/>}/>
                <Route path="/library" element={<Library/>}/>
                <Route path="/loved" element={<Loved/>}/>
                <Route path="/to-read" element={<ToRead/>}/>
                <Route path="/reviews" element={<Reviews/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Route>


        </Routes>
    );
}

export default App;
