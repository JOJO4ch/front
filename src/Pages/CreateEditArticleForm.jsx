import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './CreateEditArticleForm.css';

const CreateEditArticleForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    header: '',
    text: '',
    requestText: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [gptError, setGptError] = useState(null);
  const [showGptFields, setShowGptFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put('/api/article/edit_article', formData);
        setSuccess(true);
        setError(null);
        setFormData({ id: '', header: '', text: '', requestText: '' });
      } else {
        if (!showGptFields) {
          const jwtToken = Cookies.get('jwtToken') || localStorage.getItem('jwtToken');
          const payload = {
            gpt: {
              chosed_type: 'Рерайт',
              post_type: 'Статья'
            },
            user_text: formData.requestText
          };
          const response = await axios.post('http://127.0.0.1:8000/article/ask_gpt', payload, {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
              'Content-Type': 'application/json'
            }
          });
          const { header, text } = response.data;
          setFormData({ ...formData, header, text });
          setShowGptFields(true);
          setGptError(null);
        } else {
          await savePost();
        }
      }
    } catch (error) {
      console.error('Error:', error);
      if (!showGptFields) {
        setGptError('Произошла ошибка при генерации текста.');
      } else {
        setError('Произошла ошибка при сохранении статьи.');
      }
    }
  };

  const savePost = async () => {
    try {
      await axios.post('/api/article/create_article', formData);
      setSuccess(true);
      setError(null);
      setFormData({ id: '', header: '', text: '', requestText: '' });
      setShowGptFields(false);
    } catch (error) {
      console.error('Error:', error);
      setError('Произошла ошибка при сохранении статьи.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/article/delete_article?article_id=${formData.id}`);
      setSuccess(true);
      setError(null);
      setFormData({ id: '', header: '', text: '', requestText: '' });
    } catch (error) {
      console.error('Error:', error);
      setError('Произошла ошибка при удалении статьи.');
    }
  };

  const toggleMode = () => {
    setIsEditMode(!isEditMode);
    setSuccess(false);
    setError(null);
    setFormData({ id: '', header: '', text: '', requestText: '' });
    setShowGptFields(false); // Обновление состояния для скрытия полей после переключения режима
  };

  return (
    <div className="article-form-container">
      <h2 className="article-title">{isEditMode ? 'Редактировать пост' : 'Создать пост'}</h2>
      <button onClick={toggleMode} className="toggle-button">
        {isEditMode ? 'Переключиться на создание поста' : 'Переключиться на редактирование поста'}
      </button>
      {isEditMode && (
        <button onClick={handleDelete} className="delete-button">Удалить пост</button>
      )}
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
        {isEditMode && (
          <>
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
          </>
        )}
        {!isEditMode && (
          <div className="form-group">
            <label htmlFor="requestText">Текст запроса:</label>
            <textarea
              id="requestText"
              name="requestText"
              value={formData.requestText}
              onChange={handleChange}
              placeholder="Введите текст запроса"
              required
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                minHeight: '100px',
                maxHeight: '250px',
                minWidth: '300px',
                maxWidth: '450px'
              }}
            />
          </div>
        )}
        {!isEditMode && showGptFields && (
          <>
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
          </>
        )}
        {!isEditMode && !showGptFields && (
          <button type="submit" className="gpt-form-button">Отправить запрос</button>
        )}
        {showGptFields && (
          <button type="button" onClick={savePost} className="form-submit-button-2">Создать пост</button>
        )}
        {isEditMode && (
          <button type="submit" className="form-submit-button">Сохранить изменения</button>
        )}
      </form>
      {error && <p className="error-message">{error}</p>}
      {gptError && <p className="error-message">{gptError}</p>}
      {success && <p className="success-message">{isEditMode ? 'Пост успешно отредактирован!' : 'Пост успешно создан!'}</p>}
    </div>
  );
};

export default CreateEditArticleForm;
