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
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const jwtToken = Cookies.get('jwtToken') || localStorage.getItem('jwtToken');

        const payload = {
            gpt: {
                chosed_type: formData.chosed_type,
                style: formData.style || null,
                tone: formData.tone || null,
                language_constructs: formData.language_constructs || null,
                answer_lenght: formData.answer_length !== null ? formData.answer_length : null,
                details: formData.details || null,
                post_type: formData.post_type,
            },
            user_text: formData.user_text
        };

        axios.post('http://127.0.0.1:8000/article/ask_gpt', payload, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const { header, text } = response.data;
                setResult({ header, text });
            })
            .catch(error => {
                console.error('Error:', error);
                setError('Произошла ошибка при выполнении запроса.');
            });
    };

    return (
        <div className="gpt-form-container">
            <h2 className="gpt-form-title">Ask GPT</h2>
            <div className="gpt-form">
                <label htmlFor="user_text">Текст пользователя:</label>
                <textarea id="user_text" name="user_text" value={formData.user_text} onChange={handleChange}></textarea>
                <button className="gpt-form-button" onClick={handleSubmit}>Отправить запрос</button>
            </div>
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
            {result.header && (
                <div className="gpt-result">
                    <h3>{result.header}</h3>
                    <p>{result.text}</p>
                </div>
            )}
        </div>
    );
};

export default GPTForm;
