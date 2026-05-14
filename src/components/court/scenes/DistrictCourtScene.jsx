import React, { useState, useEffect } from 'react';

export default function DistrictCourtScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSelect = (choice) => {
    if (selectedId) return;
    setSelectedId(choice.id);
    setTimeout(() => onChoiceSelect(choice), 300);
  };

  return (
    <div className="ci-scene">
      {/* District Courtroom Scene */}
      <div className="ci-scene__stage dc-stage">
        <div className="dc-room">
          {/* Motto */}
          <div className="dc-motto">IN GOD WE TRUST</div>

          {/* Judge's bench */}
          <div className="dc-bench">
            <div className="dc-bench__platform">
              <div className="dc-judge">
                <div className="ci-figure__head" style={{ background: '#d4c5a9' }} />
                <div className="ci-figure__body" style={{ background: '#1a1a1a' }} />
              </div>
              <div className="dc-gavel" title="Gavel">🔨</div>
            </div>
          </div>

          {/* Counsel tables */}
          <div className="dc-tables">
            <div className="dc-table dc-table--plaintiff">
              <div className="dc-table__label">Plaintiff</div>
              <div className="dc-table__surface">
                <div className="ci-figure__head" style={{ background: '#c4a882', width: '14px', height: '14px' }} />
                <div className="ci-figure__head" style={{ background: '#a87d5a', width: '14px', height: '14px' }} />
              </div>
            </div>
            <div className="dc-table dc-table--defense">
              <div className="dc-table__label">Defense</div>
              <div className="dc-table__surface">
                <div className="ci-figure__head" style={{ background: '#c4a882', width: '14px', height: '14px' }} />
                <div className="ci-figure__head" style={{ background: '#c4a882', width: '14px', height: '14px' }} />
              </div>
            </div>
          </div>

          {/* Empty jury box */}
          <div className="dc-jury-box">
            <div className="dc-jury-box__label">Jury Box (empty)</div>
            <div className="dc-jury-box__seats">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="dc-seat" />
              ))}
            </div>
          </div>

          {/* American flag */}
          <div className="dc-flag">🇺🇸</div>

          {/* Gallery */}
          <div className="dc-gallery">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="dc-gallery__person" />
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Federal court. Your story goes on the record.</h2>
        <p className="ci-story__body">
          The case opens in the United States District Court. A single federal judge will hear
          your arguments. Win or lose here, every word, every brief, every piece of evidence
          you introduce will travel with the case all the way to the Supreme Court.
        </p>
      </div>

      {/* Civic Lesson */}
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">🏛️</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* Choices */}
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          Choose your district court strategy.
        </h3>
        <div className="ci-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`ci-choice${selectedId === choice.id ? ' ci-choice--selected' : ''}${
                  selectedId && selectedId !== choice.id ? ' ci-choice--faded' : ''
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="ci-choice__icon">{meta.icon}</div>
                <div className="ci-choice__body">
                  <div className="ci-choice__label">{choice.label}</div>
                  <div className="ci-choice__desc">{choice.description}</div>
                </div>
                <div className="ci-choice__tags">
                  {meta.tags?.map(t => (
                    <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {selectedId === choice.id && (
                  <div className="ci-choice__check">✓</div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const choiceMeta = {
  'summary-judgment': {
    icon: '📄',
    tags: [
      { label: '+Legal Strength', color: 'green' },
      { label: '+Cert Score', color: 'blue' },
    ],
  },
  'emergency-injunction': {
    icon: '🚨',
    tags: [
      { label: '+Public Interest', color: 'blue' },
      { label: '+Legal Strength', color: 'green' },
    ],
  },
  settle: {
    icon: '🤝',
    tags: [
      { label: '−Cert Score', color: 'red' },
      { label: 'Ends Case', color: 'red' },
    ],
  },
};
