import React, { useState, useEffect } from 'react';

export default function CertPetitionScene({ stage, onChoiceSelect }) {
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
      {/* Clerk's Office Scene */}
      <div className="ci-scene__stage cp-stage">
        <div className="cp-office">
          {/* Header sign */}
          <div className="cp-sign">SUPREME COURT OF THE UNITED STATES</div>

          {/* Stats banner */}
          <div className="cp-stats">
            <span className="cp-stat">7,000 petitions / year</span>
            <span className="cp-divider">•</span>
            <span className="cp-stat cp-stat--accent">~70 accepted</span>
          </div>

          {/* Filing cart overflowing with petitions */}
          <div className="cp-cart">
            <div className="cp-cart__body">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`cp-folder${i === 5 ? ' cp-folder--yours' : ''}`}
                  style={{ '--delay': `${i * 0.08}s` }}
                />
              ))}
              {/* Yours glowing */}
              <div className="cp-yours-label">← YOURS</div>
            </div>
            <div className="cp-cart__wheels">
              <div className="cp-cart__wheel" />
              <div className="cp-cart__wheel" />
            </div>
          </div>

          {/* Clerk figure */}
          <div className="cp-clerk">
            <div className="ci-figure__head" style={{ background: '#d4c5a9' }} />
            <div className="ci-figure__body" style={{ background: '#374151' }} />
            <div className="cp-clerk__paper">📋</div>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Your case is one of 7,000. Make it unforgettable.</h2>
        <p className="ci-story__body">
          The Supreme Court clerk's office receives thousands of petitions every year.
          Only about 70 will be granted. Your cert petition must leap off the pile and land
          on a clerk's desk as a case the nine justices cannot ignore.
        </p>
      </div>

      {/* Civic Lesson */}
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">📬</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* Choices */}
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          How will you open your cert petition?
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
  'national-importance': {
    icon: '🇺🇸',
    tags: [
      { label: '+Cert Score', color: 'blue' },
      { label: '+Public Interest', color: 'blue' },
    ],
  },
  'circuit-split-lead': {
    icon: '⚡',
    tags: [
      { label: '+Cert Score', color: 'blue' },
      { label: '+Precedent', color: 'purple' },
    ],
  },
  'constitutional-novelty': {
    icon: '📜',
    tags: [
      { label: '+Legal Strength', color: 'green' },
      { label: '+Cert Score', color: 'blue' },
    ],
  },
};
