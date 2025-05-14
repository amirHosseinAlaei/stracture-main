import { RouterProvider } from "react-router-dom";
import routes from "./Routes/routes";
import { Toaster } from "react-hot-toast";
import getCurrentUser from "./service/users";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Button, ConfigProvider, Space } from "antd";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  
  useEffect(() => {
    getCurrentUser()
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "IRANYekanXFaNum"
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <>
          <Toaster />
          <RouterProvider router={routes} />
        </>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
