import { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "../context/SearchContext";
import { useDebounce } from "../hooks/useDebounce";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setSearchTerm } = useSearch();
  const debouncedSetSearchTerm = useDebounce(setSearchTerm, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchTerm(e.target.value);
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="Laara Hotels" className="h-12 w-auto" />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative w-72">
              <Input
                type="text"
                placeholder="Search hotels..."
                className="pl-10"
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <nav className="flex items-center space-x-4">
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Destinations
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Deals
              </a>
              <Button variant="ghost" className="text-sm font-medium">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </nav>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search hotels..."
                className="pl-10 w-full"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <nav className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Destinations
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Deals
              </a>
              <Button
                variant="ghost"
                className="justify-start text-sm font-medium"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
