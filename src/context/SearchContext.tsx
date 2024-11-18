import React, { createContext, useContext, useState } from 'react';
import { Hotel } from '../types';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredHotels: Hotel[];
  setAllHotels: (hotels: Hotel[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);

  const filteredHotels = allHotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const value = {
    searchTerm,
    setSearchTerm,
    filteredHotels,
    setAllHotels,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
      throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
  };
