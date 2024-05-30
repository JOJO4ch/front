import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Для использования куков
import './GPTform.css'; // Импортируйте CSS файл

const GPTForm = () => {
    const [formData, setFormData] = useState({
        chosed_type: 'Рерайт',
        style: '',
        tone: '',
        language_constructs: '',
        answer_length: 0,
        details: '',
        post_type: 'Статья',
        user_text: ''
    });
    const [result, setResult] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Получаем JWT-токен из куки или localStorage
        const jwtToken = Cookies.get('jwtToken') || localStorage.getItem('jwtToken');

        if (!jwtToken) {
            setError('Вы не авторизованы.');
            return;
        }

        axios.post('http://127.0.0.1:8000/article/ask_gpt', formData, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setResult(response.data.result);
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
                <label htmlFor="user_text">Текст пользователя:</label><br />
                <textarea id="user_text" name="user_text" rows="4" cols="50" value={formData.user_text} onChange={handleChange}></textarea><br /><br />
                <button className="gpt-form-button" onClick={handleSubmit}>Отправить запрос</button>
            </div>
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
            {result && (
                <div className="gpt-result">
                    <h3>Результат:</h3>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
};

export default GPTForm;
