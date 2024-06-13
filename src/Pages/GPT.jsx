import React from 'react';
import GPTForm from './GPTForm'; 
import './GPTform.css'; 

const GPT = () => {
  return (
    <div className="gpt-page">
      <h1 className="gpt-title">Ask GPT</h1>
      <div className="gpt-form-container">
        <GPTForm /> 
      </div>
    </div>
  );
};

export default GPT;