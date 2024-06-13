import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './SearchArticles.css';

const SearchArticles = () => {
  const [articleId, setArticleId] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filters, setFilters] = useState({
    limit: '',
    page: '',
    search: '',
    early_date: '',
    late_date: ''
  });
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'articleId') {
      setArticleId(value);
    } else {
      setFilters({
        ...filters,
        [name]: value
      });
    }
  };

  const searchArticleById = async () => {
    try {
      const response = await axios.get(`/api/article/get_article?article_id=${articleId}`);
      setSelectedArticle(response.data);
      setArticles([]); // Clear the articles list
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Ошибка при поиске статьи.');
    }
  };

  const searchArticles = async () => {
    try {
      const response = await axios.get('/api/article/get_articles', {
        params: filters
      });
      console.log('API response:', response.data); // Log the API response
      setArticles(response.data.article);
      setSelectedArticle(null); // Clear the selected article
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Ошибка при поиске статей.');
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBackToResults = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="search-articles-container">
      <div className="search-filters">
        <h2 className="search-title">Поиск статей</h2>
        <div className="form-group">
          <label htmlFor="articleId">ID статьи:</label>
          <input
            type="text"
            id="articleId"
            name="articleId"
            value={articleId}
            onChange={handleInputChange}
            placeholder="Введите ID статьи"
          />
          <button onClick={searchArticleById} className="search-button">Поиск по ID</button>
        </div>

        <button onClick={toggleFilters} className="toggle-filters-button">
          {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
        </button>

        {showFilters && (
          <div className="filters-container">
            <div className="form-group">
              <label htmlFor="limit">Limit:</label>
              <input
                type="number"
                id="limit"
                name="limit"
                value={filters.limit}
                onChange={handleInputChange}
                placeholder="Limit"
              />
            </div>
            <div className="form-group">
              <label htmlFor="page">Page:</label>
              <input
                type="number"
                id="page"
                name="page"
                value={filters.page}
                onChange={handleInputChange}
                placeholder="Page"
              />
            </div>
            <div className="form-group">
              <label htmlFor="search">Search:</label>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleInputChange}
                placeholder="Search"
              />
            </div>
            <div className="form-group">
              <label htmlFor="early_date">Early Date:</label>
              <input
                type="date"
                id="early_date"
                name="early_date"
                value={filters.early_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="late_date">Late Date:</label>
              <input
                type="date"
                id="late_date"
                name="late_date"
                value={filters.late_date}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={searchArticles} className="search-button">Поиск по фильтрам</button>
          </div>
        )}
      </div>

      <div className="search-results">
        {selectedArticle ? (
          <div className="selected-article">
            <button onClick={handleBackToResults} className="back-button">Назад к результатам</button>
            <h3>{selectedArticle.header}</h3>
            <p>{selectedArticle.text}</p>
            <p>Дата создания: {format(new Date(selectedArticle.created_at), 'dd.MM.yyyy')}</p>
          </div>
        ) : (
          <div className="articles-results">
            {articles.length > 0 ? (
              articles.map(article => (
                <div key={article.id} className="search-result" onClick={() => handleArticleClick(article)}>
                  <h3 className="article-header">{article.header}</h3>
                  <p className="article-text">{article.text}</p>
                  <p className="article-date">Дата создания: {format(new Date(article.created_at), 'dd.MM.yyyy')}</p>
                </div>
              ))
            ) : (
              <p>Нет результатов</p>
            )}
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default SearchArticles;
