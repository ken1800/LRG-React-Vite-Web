import Header from "./components/Header";
import HotelsList from "./components/HotelList";
import { SearchProvider } from "./context/SearchContext";

const App = () => {
  return (
    <SearchProvider>
      <Header />
      <HotelsList />
    </SearchProvider>
  );
};

export default App;