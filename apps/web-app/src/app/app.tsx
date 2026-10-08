import { RouterProvider } from "./routes/provider"

import { DiProvider } from "../di/react/di.provider"

export function App() {
    return (
        <>
            <DiProvider>
                <RouterProvider />
            </DiProvider>
        </>
    )
}

export default App
