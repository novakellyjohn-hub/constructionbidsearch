import React from 'react';

export default function BidDetails({ bid, onClose }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bid-details-overlay" onClick={onClose}>
      <div className="bid-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="details-header">
          <div className="details-title">
            <h2>{bid.project_name}</h2>
            <span className="bid-specialty">{bid.specialty}</span>
          </div>
          <button className="details-close" onClick={onClose}>×</button>
        </div>

        <div className="details-body">
          <div className="details-field">
            <div className="details-field-label">📍 Location</div>
            <div className="details-field-value">
              {bid.location || 'Not specified'}
            </div>
          </div>

          <div className="details-field">
            <div className="details-field-label">📅 Deadline</div>
            <div className="details-field-value">
              {formatDate(bid.deadline)}
            </div>
          </div>

          <div className="details-field">
            <div className="details-field-label">💰 Bid Amount</div>
            <div className="details-field-value">
              {bid.bid_amount || 'Not specified'}
            </div>
          </div>

          <div className="details-field">
            <div className="details-field-label">🏢 Platform</div>
            <div className="details-field-value">
              {bid.platform_name || 'Unknown'}
            </div>
          </div>

          <div className="details-field">
            <div className="details-field-label">🔗 Source URL</div>
            <div className="details-field-value">
              {bid.source_url ? (
                <a href={bid.source_url} target="_blank" rel="noopener noreferrer">
                  View Original Bid →
                </a>
              ) : (
                'No URL available'
              )}
            </div>
          </div>

          <div className="details-field">
            <div className="details-field-label">📝 Indexed</div>
            <div className="details-field-value">
              {formatDate(bid.indexed_at)}
            </div>
          </div>
        </div>

        <div className="details-footer">
          <a 
            href={bid.source_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', textAlign: 'center' }}
          >
            View Full Bid Details
          </a>
        </div>
      </div>
    </div>
  );
}
