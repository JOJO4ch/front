import React from 'react';

const SearchResult = ({ article }) => {
  const { header, text, created_at } = article;

  return (
    <div className="search-result">
      <h3 className="article-header">{header}</h3>
      <p className="article-text">{text}</p>
      <p className="article-date">Дата создания: {created_at}</p>
    </div>
  );
};

export default SearchResult;
