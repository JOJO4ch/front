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
  const [successMessage, setSuccessMessage] = useState('');

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
      setSuccessMessage(`Construct ${mode === 'edit' ? 'updated' : 'created'} successfully.`);
    } catch (error) {
      console.error('Error performing construct operation:', error);
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  const handleModeToggle = () => {
    setMode(mode === 'create' ? 'edit' : 'create');
    setSuccessMessage('');
  };

  return (
    <div className="gpt-construct-form-container">
      <h2>{mode === 'edit' ? 'Редактирование конструкта' : 'Создание конструкта'}</h2>
      <button onClick={handleModeToggle}>{mode === 'edit' ? 'Переключиться в режим создания' : 'Переключиться в режим редактирования'}</button>
      <form onSubmit={handleSubmit} className="gpt-construct-form">
        {mode === 'edit' && (
          <div className="form-group">
            <label htmlFor="construct_id">ID конструкта:</label>
            <input
              type="number"
              id="construct_id"
              name="construct_id"
              value={formData.construct_id}
              onChange={handleChange}
              placeholder="Введите ID конструкта"
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="style">Стиль:</label>
          <input
            type="text"
            id="style"
            name="style"
            value={formData.style}
            onChange={handleChange}
            placeholder="Введите стиль"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tone">Тон:</label>
          <input
            type="text"
            id="tone"
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            placeholder="Введите тон"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="language_constructs">Языковые конструкции:</label>
          <input
            type="text"
            id="language_constructs"
            name="language_constructs"
            value={formData.language_constructs}
            onChange={handleChange}
            placeholder="Введите языковые конструкции"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer_length">Длина ответа:</label>
          <input
            type="number"
            id="answer_lenght"
            name="answer_lenght"
            value={formData.answer_lenght}
            onChange={handleChange}
            placeholder="Введите длину ответа"
            required          />
            </div>
            <div className="form-group">
              <label htmlFor="details">Детали:</label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Введите детали"
                required
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  minHeight: '100px',
                  maxHeight: '250px',
                  minWidth: '500px',
                  maxWidth: '600px'
                }}
              ></textarea>
            </div>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button type="submit">{mode === 'edit' ? 'Обновить конструкт' : 'Создать конструкт'}</button>
          </form>
        </div>
      );
    };
    
    export default GPTConstructForm;
    
