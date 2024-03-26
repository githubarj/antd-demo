import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Routes/LandingPage/LandingPage";
import AppLayout from "./Routes/Layout/AppLayout";
import Table from "./Routes/Table/Table";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "table",
        element: <Table />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
