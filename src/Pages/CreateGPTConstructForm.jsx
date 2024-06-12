import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateGPTConstructForm.css';

const GPTConstructForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    construct_id: '',
    style: '',
    tone: '',
    language_constructs: '',
    answer_lenght: '',
    details: ''
  });
  const [error, setError] = useState(null);
  const [constructData, setConstructData] = useState(null);
  const [mode, setMode] = useState('create'); // 'create' or 'edit'

  

  useEffect(() => {
    if (mode === 'edit') {
      // Если переключились в режим редактирования, очистим форму
      setFormData({
        construct_id: '',
        style: '',
        tone: '',
        language_constructs: '',
        answer_lenght: '',
        details: ''
      });
      setConstructData(null);
    }
  }, [mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'answer_lenght' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { construct_id, style, tone, language_constructs, answer_lenght, details } = formData;
      const requestData = {
        style,
        tone,
        language_constructs,
        answer_lenght,
        details,
        user_id: userId
      };

      let response;
      if (mode === 'edit') {
         response = await axios.put(
          `/api/gpt_construct/update_construct`,
          {},
          {
            params: {
              construct_id,
              style,
              tone,
              language_constructs,
              answer_lenght: answer_lenght, // Обратите внимание на орфографию "answer_lenght"
              details
            },
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
      } else {
        response = await axios.post('/api/gpt_construct/create_construct', requestData);
      }

      console.log('Construct operation successful:', response.data);
      setConstructData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error performing construct operation:', error);
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  const handleModeToggle = () => {
    setMode(mode === 'create' ? 'edit' : 'create');
  };

  return (
    <div className="gpt-construct-form-container">
      <h2>{mode === 'edit' ? 'Edit GPT Construct' : 'Create GPT Construct'}</h2>
      <button onClick={handleModeToggle}>{mode === 'edit' ? 'Switch to Create Mode' : 'Switch to Edit Mode'}</button>
      <form onSubmit={handleSubmit} className="gpt-construct-form">
        {mode === 'edit' && (
          <div className="form-group">
            <label htmlFor="construct_id">Construct ID:</label>
            <input
              type="number"
              id="construct_id"
              name="construct_id"
              value={formData.construct_id}
              onChange={handleChange}
              placeholder="Enter construct ID"
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="style">Style:</label>
          <input
            type="text"
            id="style"
            name="style"
            value={formData.style}
            onChange={handleChange}
            placeholder="Enter style"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tone">Tone:</label>
          <input
            type="text"
            id="tone"
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            placeholder="Enter tone"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="language_constructs">Language Constructs:</label>
          <input
            type="text"
            id="language_constructs"
            name="language_constructs"
            value={formData.language_constructs}
            onChange={handleChange}
            placeholder="Enter language constructs"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer_length">Answer Length:</label>
          <input
            type="number"
            id="answer_lenght"
            name="answer_lenght"
            value={formData.answer_lenght}
            onChange={handleChange}
            placeholder="Enter answer length"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Enter details"
            required
          ></textarea>
        </div>
        {error && <p className="error-message">{error}</p>}
        {constructData && (
          <div className="success-message">
            <p>Construct {mode === 'edit' ? 'updated' : 'created'} successfully with the following details:</p>
            <pre>{JSON.stringify(constructData, null, 2)}</pre>
</div>
)}
<button type="submit">{mode === 'edit' ? 'Update Construct' : 'Create Construct'}</button>
</form>
</div>
);
};

export default GPTConstructForm;
