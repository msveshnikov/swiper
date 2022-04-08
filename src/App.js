import React from "react";
import TinderCard from "react-tinder-card";
import "./App.css";

const db = [
    "https://images.unsplash.com/photo-1599832110430-da30b996c917?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    "https://images.unsplash.com/photo-1600804889194-e6fbf08ddb39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    "https://images.unsplash.com/photo-1616891170504-77c9805e3357?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    "https://images.unsplash.com/photo-1591592744991-4c43b3367b30?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    "https://images.unsplash.com/photo-1642616755861-a34717106503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MzcyMjIwMQ&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1598147853558-b53f7f671c0b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    "https://images.unsplash.com/photo-1615357414025-1efcbe04587f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    "https://images.unsplash.com/photo-1604918141129-802954f36922?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    "https://images.unsplash.com/photo-1592935952808-867287f1f920?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
];

function App() {
    return (
        <div>
            <div className="cardContainer">
                {db.map((image) => (
                    <TinderCard className="swipe">
                        <div style={{ backgroundImage: "url(" + image + ")" }} className="card"></div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default App;
