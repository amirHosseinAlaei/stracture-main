import { RouterProvider } from "react-router-dom";
import routes from "./Routes/routes";
import { Toaster } from "react-hot-toast";
import getCurrentUser from "./service/users";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  getCurrentUser().then((response) => console.log(response)).catch();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Toaster />
        <RouterProvider router={routes} />
      </>
    </QueryClientProvider>
  );
}

export default App;
