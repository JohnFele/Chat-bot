import Chatbot from "./pages/Chatbot.jsx";
import { AlertProvider } from "./context/AlertProvider.jsx";

const App = () => {
  return (
    <>
      <AlertProvider />
        <Chatbot />
      <AlertProvider />
    </>
  );
};

export default App;
