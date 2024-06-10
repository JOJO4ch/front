import React, { useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = ({ userId }) => {
  const [showApprovalForm, setShowApprovalForm] = useState(true);
  const [approvedValue, setApprovedValue] = useState('OnCheck');
  const [constructId, setConstructId] = useState('');
  const [error, setError] = useState(null);

  const handleToggleForm = () => {
    setShowApprovalForm((prevShowApprovalForm) => !prevShowApprovalForm);
  };

  const handleApproveConstruct = async () => {
    try {
      const response = await axios.put(`/api/gpt_construct/check`, null, {
        params: {
          construct_id: constructId,
          approved: approvedValue,
        }
      });
      console.log('Construct approved successfully:', response.data);
      // Обновить UI или выполнить другие действия по необходимости
    } catch (error) {
      console.error('Error approving construct:', error.response ? error.response.data : error.message);
      // Обработка ошибки
      setError('Error approving construct. Please try again.');
    }
  };

  const handleDeleteConstruct = async () => {
    try {
      const response = await axios.delete(`/api/gpt_construct/delete_construct`, {
        params: {
          construct_id: constructId,
        },
      });
      console.log('Construct deleted successfully:', response.data);
      setError(null);
    } catch (error) {
      console.error('Error deleting construct:', error.response ? error.response.data : error.message);
      setError('Error deleting construct. Please try again.');
    }
  };

  const handleApprovedChange = (e) => {
    setApprovedValue(e.target.value);
  };

  const handleConstructIdChange = (e) => {
    setConstructId(e.target.value);
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
     
      
        
          <h2>Approval Form</h2>
          <div className="form-group">
            <label htmlFor="constructId">Construct ID:</label>
            <input type="text" id="constructId" value={constructId} onChange={handleConstructIdChange} />
          </div>
          <div className="form-group">
            <label htmlFor="approvedValue">Approved:</label>
            <select id="approvedValue" value={approvedValue} onChange={handleApprovedChange}>
              <option value="OnCheck">On Check</option>
              <option value="Approved">Approved</option>
              <option value="Banned">Banned</option>
            </select>
          </div>
          <button onClick={handleApproveConstruct}>Approve Construct</button>
          <button onClick={handleDeleteConstruct}>Delete Construct</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      
    
  );
};

export default AdminPanel;
