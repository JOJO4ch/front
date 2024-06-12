import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchConstructs.css';

const SearchConstructs = ({ userId, isSuperuser }) => {
  const [constructId, setConstructId] = useState('');
  const [construct, setConstruct] = useState(null);
  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
    search: '',
  });
  const [constructs, setConstructs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState(isSuperuser ? 'all' : 'my');
  const [isFilteredSearch, setIsFilteredSearch] = useState(false);

  useEffect(() => {
    if (isFilteredSearch) {
      searchConstructs();
    }
  }, [filters, filter, isFilteredSearch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'constructId') {
      setConstructId(value);
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  const searchConstructById = async () => {
    try {
      const response = await axios.get(`/api/gpt_construct/get_construct`, {
        params: { construct_id: constructId },
        headers: {
          'Authorization': `Bearer YOUR_AUTH_TOKEN`
        }
      });
      setConstruct(response.data);
      setConstructs([]);
      setIsFilteredSearch(false);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Error searching construct by ID.');
    }
  };

  const searchConstructs = async () => {
    try {
      const params = { ...filters };
      if (!isSuperuser || filter === 'my') {
        params.user_id = userId;
      }

      const response = await axios.get('/api/gpt_construct/get_constructs', {
        params,
        headers: {
          'Authorization': `Bearer YOUR_AUTH_TOKEN`
        }
      });
      setConstructs(response.data.variant);
      setTotalPages(response.data.total_pages);
      setConstruct(null);
      setIsFilteredSearch(true);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Error searching constructs.');
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setFilters({ ...filters, page: 1 }); // Reset to the first page on filter change
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  return (
    <div className="search-constructs-container">
      <div className="filters">
        <h2 className="search-title">Поиск конструктов</h2>
        <div className="form-group">
          <label htmlFor="constructId">Поиск по ID конструкта:</label>
          <input
            type="text"
            id="constructId"
            name="constructId"
            value={constructId}
            onChange={handleInputChange}
            placeholder="Введите ID конструкта"
          />
          <button onClick={searchConstructById} className="search-button">Искать по ID</button>
        </div>
        
        <button onClick={toggleFilters} className="toggle-filters-button">
          {showFilters ? 'Спрятать фильтры' : 'Показать фильтры'}
        </button>
        
        {showFilters && (
          <div className="filters-container">
            <div className="form-group">
              <label htmlFor="limit">Лимит:</label>
              <input
                type="number"
                id="limit"
                name="limit"
                value={filters.limit}
                onChange={handleInputChange}
                placeholder="Введите ограничение по количеству"
              />
            </div>
            <div className="form-group">
              <label htmlFor="page">Страница:</label>
              <input
                type="number"
                id="page"
                name="page"
                value={filters.page}
                onChange={handleInputChange}
                placeholder="Введите страницу"
              />
            </div>
            <button onClick={searchConstructs} className="search-button">Search by Filters</button>
          </div>
        )}
        {isSuperuser && (
          <div className="filter-buttons">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => handleFilterChange('all')}
            >
              All Constructs
            </button>
            <button
              className={filter === 'my' ? 'active' : ''}
              onClick={() => handleFilterChange('my')}
            >
              My Constructs
            </button>
          </div>
        )}
      </div>
      
      <div className="search-results">
        {construct && (
          <div className="construct-result">
            <h3>{construct.style}</h3>
            <p>ID: {construct.id}</p>
            <p>Tone: {construct.tone}</p>
            <p>Language Constructs: {construct.language_constructs}</p>
            <p>Details: {construct.details}</p>
            <p>Answer Length: {construct.answer_length}</p>
            <p>Approved: {construct.approved}</p>
          </div>
        )}
        
        {!construct && (
          <div className="table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Стиль</th>
                  <th>Тон</th>
                  <th>Языковые конструкции</th>
                  <th>Детали</th>
                  <th>Длина ответа</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {constructs.map(construct => (
                  <tr key={construct.id}>
                    <td>{construct.id}</td>
                    <td>{construct.style}</td>
                    <td>{construct.tone}</td>
                    <td>{construct.language_constructs}</td>
                    <td>{construct.details}</td>
                    <td>{construct.answer_length}</td>
                    <td>{construct.approved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!construct && (
          <div className="pagination">
            {[...Array(totalPages).keys()].map(page => (
              <button
                key={page + 1}
                className={filters.page === page + 1 ? 'active' : ''}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            ))}
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default SearchConstructs;
