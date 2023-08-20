import Cards from "./Components/Cards";
import { Route, Routes, BrowserRouter } from "react-router-dom";
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
                <Routes>
                    <Route path="/" element={<Cards />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
