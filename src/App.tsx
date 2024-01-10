import '@mantine/core/styles.css';
import './App.css';
import Routing from "./app/routing.tsx";
import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";

function App() {
    return (
        <MantineProvider>
            <ModalsProvider>
                <Routing/>
            </ModalsProvider>
        </MantineProvider>
    )
}

export default App
