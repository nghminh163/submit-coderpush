import type { NextPage } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/system";
import TinderCard from "../src/components/TinderCard";
import { AuthContext } from "../src/stores/AuthStore";
import { useContext } from "react";

const App = styled("div")({
  "> div": {
    display: "flex",
    alignItems: "center",
  },
});

const Home: NextPage = () => {
  const authStore = useContext(AuthContext);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <App>
        {authStore?.user && <p>You are logging as {authStore?.user?.name}</p>}
        <TinderCard />
      </App>
    </>
  );
};

export default Home;
