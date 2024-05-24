import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AddDoctor from "../components/AddDoctor";
import AllDoctors from "../components/AllDoctors";
import Allusers from "../components/Allusers";

const Dashboard = () => {
  const [success, setSuccess] = useState();
  const [currentComponent, setCurrentComponent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/dashboard")
      .then((res) => {
        if (res.data === "Success") {
          setSuccess("Successed OK");
          const params = new URLSearchParams(location.search);
          const view = params.get("view");
          if (view) {
            setCurrentComponent(view);
          }
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate, location.search]);

  const handleNavigation = (component) => {
    setCurrentComponent(component);
    navigate(`?view=${component}`);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "AddDoctor":
        return <AddDoctor />;
      case "AllDoctors":
        return <AllDoctors />;
      case "AllUsers":
        return <Allusers />;
      default:
        return (
          <div className="h-[90vh] flex items-center justify-center text-6xl px-10 text-center font-bold capitalize">
            Welcome to admin dashboard
          </div>
        );
    }
  };

  return (
    success && (
      <div className="flex">
        <aside className="bg-primary pt-5 px-1 w-64 text-secondary shadow-2xl z-50 h-screen flex flex-col justify-between">
          <div>
            <div className="px-2">
              <h1 className="font-bold text-2xl">Dashboard</h1>
              <p className="mb-5">Admin</p>
            </div>

            <div className="flex flex-col">
              <button
                onClick={() => handleNavigation("AddDoctor")}
                className="flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3"
              >
                <Add /> Add Doctor
              </button>
              <button
                onClick={() => handleNavigation("AllDoctors")}
                className="flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3"
              >
                <Medication /> All Doctors
              </button>
              <button
                onClick={() => handleNavigation("AllUsers")}
                className="flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3"
              >
                <PeopleAlt /> All Users
              </button>
            </div>
          </div>
          <Logout
            icon={<LogoutOutlined />}
            className="flex gap-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out px-2 py-3 border-t"
          />
        </aside>
        <div className="w-full h-screen overflow-y-auto">
          <DashboardNav />
          {renderComponent()}
        </div>
      </div>
    )
  );
};

export default Dashboard;
