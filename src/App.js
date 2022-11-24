import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";


function App() {
  return (
    <div className="bg-primary h-screen w-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
