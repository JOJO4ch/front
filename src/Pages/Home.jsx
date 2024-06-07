import React from 'react';
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="fade-in">Добро пожаловать в Smart Article</h1>
      <p className="fade-in">
        Smart Article – это мощный инструмент для создания контента, переработки текстов и управления статьями.
      </p>
      <h2 className="fade-in">Основные функции:</h2>
      <ul className="fade-in">
        <li>Переработка и создание статей</li>
        <li>Управление контентом</li>
        <li>Оптимизация для поисковых систем</li>
        <li>Совместная работа</li>
      </ul>
      <h2 className="fade-in">Как это работает:</h2>
      <ol className="fade-in">
        <li>Регистрация</li>
        <li>Написание или переработка</li>
        <li>Оптимизация</li>
        <li>Просмотр и публикация</li>
      </ol>
      <h2 className="fade-in">Начните сегодня!</h2>
      <p className="fade-in">
        Присоединяйтесь к Smart Article уже сегодня и достигните новых высот в создании контента.
      </p>
    </div>
  );
}

export default Home;
