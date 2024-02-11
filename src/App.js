import './App.css';
import {NavBar} from "./Components/NavBar/NavBar";
import WelcomePage from "./WelcomePage/WelcomePage";
import {Route, Routes} from 'react-router-dom';
import Projects from "./Projects/Projects";
import {store} from "./store";
import {Provider} from "react-redux";
import MyProject from "./Projects/MyProject";
import {RequireAuth} from "./Components/Auth/RequireAuth";
import LoginPage from "./Components/Auth/login/LoginPage";
import RegisterPage from "./Components/Auth/register/RegisterPage";
import AddProject from "./Projects/AddProject";

function App() {
    return (
        <Provider store={store}>
                <NavBar/>
                <Routes>
                    <Route index element={<WelcomePage/>}/>
                    <Route path='/projects' element={<RequireAuth>{<Projects/>}</RequireAuth>}/>
                    <Route path='/my-project' element={<RequireAuth>{<MyProject/>}</RequireAuth>}/>
                    <Route path='/login' element={<LoginPage />}/>
                    <Route path='/register' element={<RegisterPage />}/>
                    <Route path='/add-project' element={<RequireAuth>{<AddProject/>}</RequireAuth>}/>
                </Routes>
        </Provider>
    );
}

export default App;
