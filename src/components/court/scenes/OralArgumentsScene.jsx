import React, { useState, useEffect } from 'react';

export default function OralArgumentsScene({ stage, onChoiceSelect }) {
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
      {/* Supreme Court Chamber — the iconic scene */}
      <div className="ci-scene__stage oa-stage">
        <div className="oa-chamber">
          {/* Chandeliers */}
          <div className="oa-chandelier oa-chandelier--1" />
          <div className="oa-chandelier oa-chandelier--2" />
          <div className="oa-chandelier oa-chandelier--3" />

          {/* Banner */}
          <div className="oa-banner">EQUAL JUSTICE UNDER LAW</div>

          {/* The Bench — 9 justices */}
          <div className="oa-bench">
            {[0,1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className={`oa-justice${i === 4 ? ' oa-justice--chief' : ''}`}>
                <div className="oa-justice__head" />
                <div className="oa-justice__robe" />
                <div className="oa-justice__nameplate" />
              </div>
            ))}
          </div>

          {/* Columns */}
          <div className="oa-columns">
            <div className="oa-column" />
            <div className="oa-column" />
            <div className="oa-column" />
            <div className="oa-column" />
          </div>

          {/* Flag */}
          <div className="oa-flag">🇺🇸</div>

          {/* Podium / lectern */}
          <div className="oa-lectern">
            <div className="oa-advocate">
              <div className="ci-figure__head" style={{ background: '#a87d5a' }} />
              <div className="ci-figure__body" style={{ background: '#1e3a5f' }} />
            </div>
            <div className="oa-lectern__stand" />
          </div>

          {/* Packed gallery */}
          <div className="oa-gallery">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="oa-gallery__person" style={{ background: `hsl(${i * 22}, 30%, 55%)` }} />
            ))}
          </div>

          {/* Timer */}
          <div className="oa-timer">⏱ 30:00</div>
        </div>
      </div>

      {/* Story */}
      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Nine justices. Thirty minutes. Everything on the line.</h2>
        <p className="ci-story__body">
          The chamber falls silent. All nine justices look down from the mahogany bench.
          You approach the lectern. You will not finish your first sentence before
          a justice interrupts. Every question is an opportunity — if you see it that way.
        </p>
      </div>

      {/* Civic Lesson */}
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">🎤</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* Choices */}
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          Choose your oral argument approach.
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
  'concede-narrow': {
    icon: '🤲',
    tags: [
      { label: '+Legal Strength', color: 'green' },
      { label: '−Opposition', color: 'green' },
    ],
  },
  'hold-firm': {
    icon: '💪',
    tags: [
      { label: '+Public Interest', color: 'blue' },
      { label: '+Opposition', color: 'red' },
    ],
  },
  'hot-bench-prep': {
    icon: '🧠',
    tags: [
      { label: '+Legal Strength', color: 'green' },
      { label: '+Precedent', color: 'purple' },
    ],
  },
};
