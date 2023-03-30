import { useEffect, useState } from "react";
import "./App.scss";
import Routes from "./routes/Routes";
import Loader from "./pages/loader/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <>{isLoading ? <Loader /> : <Routes></Routes>}</>;
}

export default App;
