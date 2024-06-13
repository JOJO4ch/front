
import React, { useState } from 'react';
import axios from 'axios';
import './EditArticleForm.css';

const EditArticleForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    header: '',
    text: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/article/edit_article', formData);
      setSuccess(true);
      setError(null);
      setFormData({ id: '', header: '', text: '' });
    } catch (error) {
      console.error('Error:', error);
      setError('Произошла ошибка при редактировании статьи.');
    }
  };

  return (
    <div className="edit-article-container">
      <h2 className="edit-article-title">Редактировать пост</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID поста:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Введите ID поста"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="header">Заголовок:</label>
          <input
            type="text"
            id="header"
            name="header"
            value={formData.header}
            onChange={handleChange}
            placeholder="Введите заголовок"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Текст:</label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Введите текст"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Пост успешно отредактирован!</p>}
        <button type="submit" className="submit-button">Редактировать пост</button>
      </form>
    </div>
  );
};

export default EditArticleForm;
