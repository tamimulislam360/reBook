import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-primary h-screen w-full overflow-x-hidden">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
