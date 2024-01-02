import '@mantine/core/styles.css';
import './App.css';
import Routing from "./app/routing.tsx";
import {MantineProvider} from "@mantine/core";

function App() {
    return (
        <MantineProvider>
            <Routing/>
        </MantineProvider>
    )
}

export default App
