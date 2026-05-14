import React, { useState, useEffect } from 'react';

export default function MeritsBriefScene({ stage, onChoiceSelect }) {
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
      {/* Late-Night Law Firm Scene */}
      <div className="ci-scene__stage mb-stage">
        <div className="mb-office">
          {/* Night city skyline through window */}
          <div className="mb-window">
            <div className="mb-sky">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="mb-building-silhouette" style={{ height: `${30 + i * 10}px`, left: `${i * 18}%` }} />
              ))}
              {[...Array(8)].map((_, i) => (
                <div key={i} className="mb-star" style={{ top: `${10 + (i % 3) * 12}px`, left: `${5 + i * 12}%`, animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>
          </div>

          {/* Clock */}
          <div className="mb-clock">🕚 11:00 PM</div>

          {/* Conference table */}
          <div className="mb-table">
            {/* Brief document in center */}
            <div className="mb-brief">
              <div className="mb-brief__title">MERITS BRIEF</div>
              <div className="mb-brief__sub">Martinez v. Riverside USD</div>
              <div className="mb-brief__lines">
                {[...Array(4)].map((_, i) => <div key={i} className="mb-brief__line" />)}
              </div>
            </div>

            {/* Lawyers around table */}
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`mb-lawyer mb-lawyer--${i}`}>
                <div className="ci-figure__head" style={{ background: `hsl(${20 + i * 15}, 40%, 65%)`, width: '12px', height: '12px', borderRadius: '50%' }} />
              </div>
            ))}

            {/* Laptops */}
            <div className="mb-laptop mb-laptop--1">💻</div>
            <div className="mb-laptop mb-laptop--2">💻</div>

            {/* Coffee cups */}
            <div className="mb-coffee mb-coffee--1">☕</div>
            <div className="mb-coffee mb-coffee--2">☕</div>
          </div>

          {/* Sticky note wall */}
          <div className="mb-sticky-wall">
            <div className="mb-sticky-label">Argument Structure</div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`mb-sticky mb-sticky--${i % 3}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The nine justices will read every word of this.</h2>
        <p className="ci-story__body">
          It's 11 PM. The conference table is buried in briefs, laptops, and coffee cups.
          The merits brief must be perfect — it will be read by nine of the most important
          legal minds in America. Every sentence, every citation, every choice of word matters.
        </p>
      </div>

      {/* Civic Lesson */}
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">📝</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* Choices */}
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          How will you structure the merits brief?
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
  'narrative-brief': {
    icon: '📖',
    tags: [
      { label: '+Legal Strength', color: 'green' },
      { label: '+Public Interest', color: 'blue' },
    ],
  },
  'doctrinal-brief': {
    icon: '📚',
    tags: [
      { label: '+Precedent', color: 'purple' },
      { label: '+Legal Strength', color: 'green' },
    ],
  },
  'propose-test': {
    icon: '⚗️',
    tags: [
      { label: '+Precedent', color: 'purple' },
      { label: '−Opposition', color: 'green' },
    ],
  },
};
