import { useEffect, useState } from "react";
import "./App.scss";
import Routes from "./routes/Routes";
import Loader from "./pages/loader/Loader";
import UserAuthProvider from "./context/UserAuth";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <UserAuthProvider>
          <Routes />
        </UserAuthProvider>
      )}
    </>
  );
}

export default App;
