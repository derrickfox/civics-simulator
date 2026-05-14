import React, { useState, useEffect } from 'react';

export default function LegalTheoryScene({ stage, onChoiceSelect }) {
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
      {/* Law Office Scene */}
      <div className="ci-scene__stage lt-stage">
        {/* Office background */}
        <div className="lt-office">
          {/* Bookshelf */}
          <div className="lt-bookshelf">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`lt-book lt-book--${i % 4}`} />
            ))}
          </div>

          {/* Evidence board */}
          <div className="lt-board">
            <div className="lt-board__title">Legal Theories</div>
            <div className="lt-board__cards">
              <div className="lt-theory-card">
                <div className="lt-theory-card__label">14th Amend.</div>
                <div className="lt-theory-card__sub">State-Created Danger</div>
              </div>
              <div className="lt-theory-card lt-theory-card--center">
                <div className="lt-theory-card__label">§ 1983</div>
                <div className="lt-theory-card__sub">Civil Rights</div>
              </div>
              <div className="lt-theory-card">
                <div className="lt-theory-card__label">ADA</div>
                <div className="lt-theory-card__sub">Disability Rights</div>
              </div>
            </div>
          </div>

          {/* Desk with items */}
          <div className="lt-desk">
            <div className="lt-laptop">💻</div>
            <div className="lt-mug">☕</div>
            <div className="lt-brief">📄</div>
          </div>

          {/* Lawyer figure */}
          <div className="lt-lawyer">
            <div className="ci-figure__head" style={{ background: '#c4a882' }} />
            <div className="ci-figure__body" style={{ background: '#1e3a5f' }} />
            <div className="lt-pointer">✏️</div>
          </div>

          {/* Diplomas */}
          <div className="lt-diploma lt-diploma--1">🎓</div>
          <div className="lt-diploma lt-diploma--2">🏅</div>
        </div>
      </div>

      {/* Story */}
      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Every great case needs the right legal hook.</h2>
        <p className="ci-story__body">
          Your attorneys have assembled in the conference room. Three legal theories are pinned
          to the board — each a different path to constitutional justice. The one you choose will
          shape every brief, every argument, and every question from the bench.
        </p>
      </div>

      {/* Civic Lesson */}
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">📋</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* Choices */}
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          Choose your constitutional argument.
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
  'substantive-due-process': {
    icon: '📜',
    tags: [
      { label: '+Legal Strength', color: 'green' },
      { label: '+Precedent', color: 'purple' },
    ],
  },
  'section-1983': {
    icon: '⚖️',
    tags: [
      { label: '+Precedent', color: 'purple' },
      { label: '−Opposition', color: 'green' },
    ],
  },
  'ada-angle': {
    icon: '♿',
    tags: [
      { label: '+Public Interest', color: 'blue' },
      { label: '+Precedent', color: 'purple' },
    ],
  },
};
