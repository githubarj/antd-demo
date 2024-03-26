import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="container-fluid">
      <Outlet />
    </div>
  );
}

export default AppLayout;
