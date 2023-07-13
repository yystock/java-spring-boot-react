import { AuthProvider } from "./providers/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { RenderRoutes } from "./components/structure/Navigation";
import { Toaster } from "react-hot-toast";
import Header from "./components/header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <AuthProvider>
          <Header />
          <RenderRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
