import React, { useState } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';

const Search = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchInput);
    }
  };

  return (
    <Container>
      <InputGroup className="mb-3" size="lg" >
        <FormControl
          placeholder="Search For Artist"
          type="input"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={() => onSearch(searchInput)}>
          Search
        </Button>
      </InputGroup>
    </Container>
  );
};

export default Search;
