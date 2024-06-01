import React, { useState } from 'react';
import axios from 'axios';
import './CreateEditArticleForm.css';

const CreateEditArticleForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    header: '',
    text: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put('/api/article/edit_article', formData);
      } else {
        await axios.post('/api/article/create_article', formData);
      }
      setSuccess(true);
      setError(null);
      setFormData({ id: '', header: '', text: '' });
    } catch (error) {
      console.error('Error:', error);
      setError('Произошла ошибка при сохранении статьи.');
    }
  };

  const toggleMode = () => {
    setIsEditMode(!isEditMode);
    setSuccess(false);
    setError(null);
    setFormData({ id: '', header: '', text: '' });
  };

  return (
    <div className="create-edit-article-container">
      <h2 className="create-edit-article-title">{isEditMode ? 'Редактировать пост' : 'Создать пост'}</h2>
      <button onClick={toggleMode} className="toggle-button">
        {isEditMode ? 'Переключиться на создание поста' : 'Переключиться на редактирование поста'}
      </button>
      <form onSubmit={handleSubmit}>
        {isEditMode && (
          <div className="form-group">
            <label htmlFor="id">ID:</label>
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
        )}
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
        {success && <p className="success-message">{isEditMode ? 'Пост успешно отредактирован!' : 'Пост успешно создан!'}</p>}
        <button type="submit" className="submit-button">{isEditMode ? 'Сохранить изменения' : 'Создать пост'}</button>
      </form>
    </div>
  );
};

export default CreateEditArticleForm;
