import React, { useState } from 'react';
import axios from 'axios';
import './CreateGPTConstructForm.css'; // Импортируем стили для формы

const CreateGPTConstructForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    style: '',
    tone: '',
    language_constructs: '',
    answer_length: 0,
    details: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'answer_length' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = {
      ...formData,
      user_id: userId
    };

    try {
      const response = await axios.post(
        '/api/gpt_construct/create_construct',
        formDataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Construct created successfully:', response.data);
      // Очистить форму после успешного создания конструкта
      setFormData({
        style: '',
        tone: '',
        language_constructs: '',
        answer_length: 0,
        details: ''
      });
      setError(null);
    } catch (error) {
      console.error('Error creating construct:', error);
      setError('Error creating construct. Please try again.');
    }
  };

  return (
    <div className="gpt-construct-form-container">
      <h2>Create GPT Construct</h2>
      <form onSubmit={handleSubmit} className="gpt-construct-form">
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
            id="answer_length"
            name="answer_length"
            value={formData.answer_length}
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
        <button type="submit">Create Construct</button>
      </form>
    </div>
  );
};

export default CreateGPTConstructForm;
