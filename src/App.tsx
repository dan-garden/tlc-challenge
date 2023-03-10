import NumberPicker from "./components/NumberPicker";

const App: React.FC = () => {

  return (
    <div className="p-5 lg:p-20">

      <h1 className="text-2xl text-center mb-6">Lotto Number Picker</h1>

      <div className="border max-w-xl mx-auto w-full p-1 sm:p-3 shadow-md rounded-md bg-white">
        <NumberPicker
          primaryCount={35}
          primaryMax={7}
          secondaryCount={20}
          secondaryMax={1}
        />
      </div>

    </div>
  );
};

export default App;