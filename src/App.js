import Layout from "./Layout/Layout";
import Cards from "./Components/Cards";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MyLikes from "./Components/MyLikes";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/likes" element={<MyLikes />} />
                    <Route path="/" element={<Cards />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
