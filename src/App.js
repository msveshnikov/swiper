import React from "react";
import TinderCard from "react-tinder-card";
import "./App.css";

const db = [
    "https://images.unsplash.com/photo-1599832110430-da30b996c917?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    "https://images.unsplash.com/photo-1600804889194-e6fbf08ddb39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    "https://images.unsplash.com/photo-1616891170504-77c9805e3357?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    "https://images.unsplash.com/photo-1591592744991-4c43b3367b30?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
];

function App() {
    return (
        <div>
            <div className="cardContainer">
                {db.map((character) => (
                    <TinderCard className="swipe">
                        <div style={{ backgroundImage: "url(" + character + ")" }} className="card"></div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default App;
