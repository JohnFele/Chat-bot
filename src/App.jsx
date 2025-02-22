import Chatbot from "./components/Chatbot";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to My Chatbot App</h1>
      <Chatbot />
    </div>
  );
};

export default App;
