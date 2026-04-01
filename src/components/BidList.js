import React from 'react';

export default function BidList({ bids, onBidClick, selectedBid }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bid-list">
      {bids.map((bid) => (
        <div
          key={bid.id}
          className={`bid-item ${selectedBid?.id === bid.id ? 'selected' : ''}`}
          onClick={() => onBidClick(bid)}
        >
          <div className="bid-title">
            <span className="icon">📋</span>
            {bid.project_name}
          </div>
          <div className="bid-meta">
            <div className="bid-meta-item">
              <span className="bid-meta-label">📍 Location:</span>
              <span>{bid.location || 'N/A'}</span>
            </div>
            <div className="bid-meta-item">
              <span className="bid-meta-label">📅 Deadline:</span>
              <span>{formatDate(bid.deadline)}</span>
            </div>
            <div className="bid-meta-item">
              <span className="bid-meta-label">💰 Amount:</span>
              <span>{bid.bid_amount || 'N/A'}</span>
            </div>
            <div className="bid-meta-item">
              <span className="bid-specialty">{bid.specialty}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
