import React from 'react';

export default function FilterPanel({ specialty, onSpecialtyChange, location, onLocationChange }) {
  const specialties = [
    { value: '', label: 'All Specialties' },
    { value: 'foundation', label: 'Foundation' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'roofing', label: 'Roofing' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'general', label: 'General' }
  ];

  return (
    <div className="filter-panel">
      <h3>🔍 Filters</h3>

      <div className="filter-group">
        <label>Specialty Type</label>
        <select 
          value={specialty} 
          onChange={(e) => onSpecialtyChange(e.target.value)}
        >
          {specialties.map((spec) => (
            <option key={spec.value} value={spec.value}>
              {spec.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Location</label>
        <input
          type="text"
          placeholder="e.g., Portland, Salem..."
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '0.9em'
          }}
        />
      </div>

      <div className="filter-group">
        <p style={{ fontSize: '0.85em', color: '#999', marginTop: '15px' }}>
          💡 <strong>Tip:</strong> Combine filters to narrow down results. Search + filter for best results.
        </p>
      </div>
    </div>
  );
}
