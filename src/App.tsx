import {Calendar} from "./components/Calendar";
import MainApp from "./components/MainApp";

import "./App.scss";

function App() {
   
    return (
        <div className="App">
            <div className="banner">
                <h1>PD2 duck Calender</h1>
            </div>
            <MainApp />
            <Calendar />
        </div>
    );

}


export default App;