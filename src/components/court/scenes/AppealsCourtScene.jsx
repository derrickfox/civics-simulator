import React, { useState, useEffect } from 'react';

export default function AppealsCourtScene({ stage, onChoiceSelect }) {
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
      {/* Appeals Court Scene */}
      <div className="ci-scene__stage ac-stage">
        <div className="ac-room">
          {/* Drapes */}
          <div className="ac-drape ac-drape--left" />
          <div className="ac-drape ac-drape--right" />

          {/* Three-judge bench */}
          <div className="ac-bench">
            {[0, 1, 2].map(i => (
              <div key={i} className={`ac-judge${i === 1 ? ' ac-judge--chief' : ''}`}>
                <div className="ci-figure__head" style={{ background: '#d4c5a9', width: '16px', height: '16px', borderRadius: '50%' }} />
                <div className="ci-figure__body" style={{ background: '#1a1a1a', width: '22px', height: '28px', borderRadius: '3px 3px 0 0' }} />
                <div className="ac-judge__mic">🎙️</div>
              </div>
            ))}
          </div>

          {/* Podium */}
          <div className="ac-podium">
            <div className="ac-podium__stand">
              <div className="ci-figure__head" style={{ background: '#a87d5a' }} />
              <div className="ci-figure__body" style={{ background: '#1e3a5f' }} />
            </div>
            <div className="ac-podium__lectern" />
          </div>

          {/* Circuit label */}
          <div className="ac-label">United States Court of Appeals</div>

          {/* Circuit split indicators */}
          <div className="ac-split">
            <div className="ac-split__item ac-split__item--9th">9th Circuit: ✓</div>
            <div className="ac-split__vs">vs</div>
            <div className="ac-split__item ac-split__item--5th">5th Circuit: ✗</div>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Three judges. One chance to set up the Supreme Court.</h2>
        <p className="ci-story__body">
          The appellate panel reviews your case on pure legal questions — no new facts allowed.
          A circuit split is already brewing across America. The right argument here could make
          your case irresistible to the nine justices in Washington.
        </p>
      </div>

      {/* Civic Lesson */}
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚖️</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* Choices */}
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          Choose your appellate strategy.
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
  'circuit-split': {
    icon: '🗺️',
    tags: [
      { label: '+Cert Score', color: 'blue' },
      { label: '+Precedent', color: 'purple' },
    ],
  },
  'facts-focus': {
    icon: '👤',
    tags: [
      { label: '+Public Interest', color: 'blue' },
      { label: '+Precedent', color: 'purple' },
    ],
  },
  'law-professor': {
    icon: '🎓',
    tags: [
      { label: '+Legal Strength', color: 'green' },
      { label: '+Cert Score', color: 'blue' },
    ],
  },
};
