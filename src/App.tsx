import '@mantine/core/styles.css';
import './App.css';
import Routing from "./app/routing.tsx";
import {MantineProvider} from "@mantine/core";

function App() {
    return (
        <MantineProvider
            theme={{
                colors: {
                    orange: ['#FFA500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500'],
                }
            }}
        >
            <Routing/>
        </MantineProvider>
    )
}

export default App
