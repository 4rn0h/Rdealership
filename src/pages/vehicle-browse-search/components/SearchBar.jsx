import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, placeholder = "Search by make, model, or keyword...", className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock suggestions data
  const mockSuggestions = [
    { type: 'make', value: 'Mercedes-Benz', label: 'Mercedes-Benz', count: 45 },
    { type: 'make', value: 'BMW', label: 'BMW', count: 38 },
    { type: 'make', value: 'Audi', label: 'Audi', count: 32 },
    { type: 'make', value: 'Lexus', label: 'Lexus', count: 28 },
    { type: 'model', value: 'C-Class', label: 'Mercedes-Benz C-Class', count: 12 },
    { type: 'model', value: 'E-Class', label: 'Mercedes-Benz E-Class', count: 15 },
    { type: 'model', value: '3 Series', label: 'BMW 3 Series', count: 10 },
    { type: 'model', value: '5 Series', label: 'BMW 5 Series', count: 14 },
    { type: 'model', value: 'A4', label: 'Audi A4', count: 8 },
    { type: 'model', value: 'Q5', label: 'Audi Q5', count: 11 },
    { type: 'keyword', value: 'leather seats', label: 'Leather Seats', count: 67 },
    { type: 'keyword', value: 'sunroof', label: 'Sunroof', count: 43 },
    { type: 'keyword', value: 'navigation', label: 'Navigation System', count: 52 },
    { type: 'keyword', value: 'backup camera', label: 'Backup Camera', count: 38 },
    { type: 'keyword', value: 'heated seats', label: 'Heated Seats', count: 29 }
  ];

  useEffect(() => {
    if (searchTerm?.length > 1) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      )?.slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e?.target?.value);
  };

  const handleSearch = (term = searchTerm) => {
    if (term?.trim()) {
      onSearch(term?.trim());
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion?.label);
    handleSearch(suggestion?.value);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions?.length === 0) {
      if (e?.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions?.[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef?.current?.blur();
        break;
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSearch('');
    inputRef?.current?.focus();
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'make':
        return 'Car';
      case 'model':
        return 'Settings';
      case 'keyword':
        return 'Tag';
      default:
        return 'Search';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'make':
        return 'Make';
      case 'model':
        return 'Model';
      case 'keyword':
        return 'Feature';
      default:
        return '';
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef?.current &&
        !suggestionsRef?.current?.contains(event?.target) &&
        !inputRef?.current?.contains(event?.target)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-12"
        />
        
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full luxury-micro-transition"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        )}
      </div>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg luxury-shadow-medium z-50 max-h-80 overflow-y-auto"
        >
          <div className="py-2">
            {suggestions?.map((suggestion, index) => (
              <button
                key={`${suggestion?.type}-${suggestion?.value}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted luxury-micro-transition ${
                  index === selectedIndex ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon 
                      name={getIconForType(suggestion?.type)} 
                      size={16} 
                      className="text-accent" 
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {suggestion?.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getTypeLabel(suggestion?.type)}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {suggestion?.count} vehicles
                </div>
              </button>
            ))}
          </div>

          {/* Search All Results */}
          <div className="border-t border-border">
            <button
              onClick={() => handleSearch()}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted luxury-micro-transition"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Search" size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Search for "{searchTerm}"
                </p>
                <p className="text-xs text-muted-foreground">
                  View all results
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;