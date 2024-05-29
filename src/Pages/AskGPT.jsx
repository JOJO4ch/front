// AskGPT.jsx

import React, { useState } from 'react';

const AskGPT = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Здесь вы можете отправить запрос с помощью fetch или другой библиотеки
    // Например, отправка запроса на ваш сервер для обработки текста и получения ответа от GPT

    // Временно устанавливаем фиктивный ответ
    setResponseText('Это фиктивный ответ от GPT на ваш вопрос');
  };

  return (
    <div className="ask-gpt-container">
      <h1>AskGPT</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          placeholder="Введите ваш вопрос..."
          rows="4"
          cols="50"
        />
        <button type="submit">Отправить</button>
      </form>
      {responseText && (
        <div className="response-container">
          <h2>Ответ:</h2>
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
};

export default AskGPT;
