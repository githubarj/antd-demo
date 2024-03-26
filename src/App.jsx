import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Routes/LandingPage/LandingPage";
import AppLayout from "./Routes/Layout/AppLayout";
import MyTable from "./Routes/Table/Table";
import MyForm from "./Routes/Form/MyForm";

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
        element: <MyTable />,
      },
      {
        path: "add-patient",
        element: <MyForm/>

      }
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
