import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="h-screen bg-blue-500 overflow-y-scroll">
      <Outlet />
    </div>
  );
}
