import React from 'react';

export default function Stats({ stats }) {
  if (!stats) return null;

  return (
    <div className="stats-box">
      <h4>📊 Index Statistics</h4>
      <div className="stat-item">
        <span className="stat-label">Documents Indexed</span>
        <span className="stat-value">{stats.elasticsearch.documents_indexed}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Index Status</span>
        <span className="stat-value" style={{ color: stats.elasticsearch.status === 'green' ? '#28a745' : '#ffc107' }}>
          {stats.elasticsearch.status.toUpperCase()}
        </span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Index Size</span>
        <span className="stat-value">{stats.elasticsearch.index_size_mb} MB</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Total Bids</span>
        <span className="stat-value">{stats.database.total_bids}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Platforms</span>
        <span className="stat-value">{stats.database.platforms}</span>
      </div>
    </div>
  );
}
