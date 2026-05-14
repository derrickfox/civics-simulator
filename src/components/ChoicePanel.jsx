import React, { useState } from 'react';

export default function ChoicePanel({ choices, onChoiceSelect, disabled }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (choice) => {
    if (disabled || selectedId) return;
    setSelectedId(choice.id);
    onChoiceSelect(choice);
  };

  return (
    <div className="choice-panel">
      <h3 className="choice-panel__title">What do you do?</h3>
      <div className="choice-panel__grid">
        {choices.map((choice) => (
          <button
            key={choice.id}
            className={`choice-card${selectedId === choice.id ? ' choice-card--selected' : ''}${
              disabled || (selectedId && selectedId !== choice.id) ? ' choice-card--disabled' : ''
            }`}
            onClick={() => handleSelect(choice)}
            disabled={disabled || (!!selectedId && selectedId !== choice.id)}
            aria-pressed={selectedId === choice.id}
          >
            <div className="choice-card__label">{choice.label}</div>
            <div className="choice-card__description">{choice.description}</div>
            {selectedId === choice.id && (
              <div className="choice-card__selected-badge">Selected ✓</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
