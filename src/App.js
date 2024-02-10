import './App.css';
import {NavBar} from "./Components/NavBar/NavBar";
import WelcomePage from "./WelcomePage/WelcomePage";
import {Route, Routes} from 'react-router-dom';
import Projects from "./Projects/Projects";

function App() {
    return (<>
            <NavBar />
            <Routes>
                <Route index element={<WelcomePage/>}/>
                <Route path='/projects' element={<Projects />}/>
            </Routes>
        </>
    );
}

export default App;
