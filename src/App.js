import Layout from "./Layout/Layout";
import Cards from "./Components/Cards";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MyEvents from "./Components/MyEvents";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
        type: "dark",
        background: {
            paper: "#e66465",
        },
        primary: {
            main: "#9198e5",
        },
        secondary: {
            main: "#9198e5",
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/likes" element={<MyEvents eventType="like" />} />
                        <Route path="/saves" element={<MyEvents eventType="save" />} />
                        <Route path="/shares" element={<MyEvents eventType="share" />} />
                        <Route path="/" element={<Cards />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
