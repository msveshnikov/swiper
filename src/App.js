import Layout from "./layout/Layout";
import Cards from "./components/Cards";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MyLikes from "./components/MyLikes";

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
