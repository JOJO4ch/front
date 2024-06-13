import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './GPTform.css';

const GPTForm = () => {
    const [formData, setFormData] = useState({
        chosed_type: 'Рерайт',
        style: '',
        tone: '',
        language_constructs: '',
        answer_length: null,
        details: '',
        post_type: 'Статья',
        user_text: ''
    });
    const [result, setResult] = useState({ header: '', text: '' });
    const [editedResult, setEditedResult] = useState({ header: '', text: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const jwtToken = Cookies.get('jwtToken') || localStorage.getItem('jwtToken');
            const payload = {
                gpt: {
                    chosed_type: formData.chosed_type,
                    style: formData.style || null,
                    tone: formData.tone || null,
                    language_constructs: formData.language_constructs || null,
                    answer_length: formData.answer_length !== null ? formData.answer_length : null,
                    details: formData.details || null,
                    post_type: formData.post_type,
                },
                user_text: formData.user_text
            };
            const response = await axios.post('http://127.0.0.1:8000/article/ask_gpt', payload, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const { header, text } = response.data;
            setResult({ header, text });
            setEditedResult({ header, text }); 
        } catch (error) {
            console.error('Error:', error);
            setError('Произошла ошибка при выполнении запроса.');
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedResult({ ...editedResult, [name]: value });
    };

    const handleEditSubmit = async () => {
        try {
            const jwtToken = Cookies.get('jwtToken') || localStorage.getItem('jwtToken');
            
            await axios.post('/api/article/create_article', editedResult, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error:', error);
            setError('Произошла ошибка при отправке отредактированного результата в базу данных.');
        }
    };

    return (
        <div className="gpt-form-container">
            <h2 className="gpt-form-title">Ask GPT</h2>
            <div className="gpt-form">
                <textarea
                    className="user-text-input"
                    name="user_text"
                    value={formData.user_text}
                    onChange={handleChange}
                    placeholder="Введите текст"
                />
                <button className="gpt-form-button" onClick={handleSubmit}>Отправить запрос</button>
                {result.header && (
                    <div className="gpt-result">
                        <input
                            type="text"
                            className="result-header-input"
                            name="header"
                            value={editedResult.header}
                            onChange={handleEditChange}
                            placeholder="Заголовок"
                        />
                        <textarea
                            className="result-text-input"
                            name="text"
                            value={editedResult.text}
                            onChange={handleEditChange}
                            placeholder="Текст"
                        />
                        <button className="submit-edited-result-button" onClick={handleEditSubmit}>Сохранить в базу данных</button>
                    </div>
                )}
            </div>
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default GPTForm;
