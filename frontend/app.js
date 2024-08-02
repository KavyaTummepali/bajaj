// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput } from '@mui/material';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ['Numbers', 'Alphabets', 'Highest Alphabet'];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post('http://localhost:3000/bfhl', parsedData);
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or Error in API call');
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>BFHL Frontend</h1>
      <TextField
        label="JSON Input"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={jsonInput}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Submit
      </Button>
      {response && (
        <FormControl sx={{ m: 1, width: 300, marginTop: '20px' }}>
          <InputLabel>Options</InputLabel>
          <Select
            multiple
            value={selectedOptions}
            onChange={handleChange}
            input={<OutlinedInput label="Options" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={selectedOptions.indexOf(option) > -1} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <div style={{ marginTop: '20px' }}>
        {response && selectedOptions.includes('Numbers') && (
          <div>
            <h3>Numbers:</h3>
            <p>{response.numbers.join(', ')}</p>
          </div>
        )}
        {response && selectedOptions.includes('Alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(', ')}</p>
          </div>
        )}
        {response && selectedOptions.includes('Highest Alphabet') && (
          <div>
            <h3>Highest Alphabet:</h3>
            <p>{response.highest_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
