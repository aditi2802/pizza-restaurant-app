import React, { useState } from 'react';

const PizzaForm = ({ onSubmit }) => {
  const [type, setType] = useState('Veg');
  const [size, setSize] = useState('Large');
  const [base, setBase] = useState('Thin');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ type, size, base });
    setType('Veg');
    setSize('Large');
    setBase('Thin');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </label>
      <label>
        Size:
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
        </select>
      </label>
      <label>
        Base:
        <select value={base} onChange={(e) => setBase(e.target.value)}>
          <option value="Thin">Thin</option>
          <option value="Thick">Thick</option>
        </select>
      </label>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default PizzaForm;
