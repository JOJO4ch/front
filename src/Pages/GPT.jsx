import React from 'react';
import GPTForm from './GPTForm'; // Импортируем компонент GPTForm
import './GPTform.css'; // Импортируем стили для страницы GPT

const GPT = () => {
  return (
    <div className="gpt-page">
      <h1 className="gpt-title">Ask GPT</h1>
      <div className="gpt-form-container">
        <GPTForm /> {/* Вместо <askGPT /> используйте <GPTForm /> */}
      </div>
    </div>
  );
};

export default GPT;