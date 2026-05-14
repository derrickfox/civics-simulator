import React, { useState, useEffect } from 'react';

export default function OtherChamberScene({ stage, onChoiceSelect }) {
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
    <div className="oc-scene">
      {/* ── Animated Senate Chamber Scene ── */}
      <div className="oc-scene__stage">
        {/* Marble walls background */}
        <div className="oc-bg" />

        {/* Marble columns */}
        <div className="oc-column oc-column--1" />
        <div className="oc-column oc-column--2" />
        <div className="oc-column oc-column--3" />
        <div className="oc-column oc-column--4" />

        {/* Senate President rostrum */}
        <div className="oc-rostrum">
          <div className="oc-rostrum__platform">
            <div className="oc-rostrum__figure">
              <div className="oc-figure__head" />
              <div className="oc-figure__body oc-figure__body--black" />
            </div>
            <div className="oc-rostrum__label">PRESIDENT</div>
          </div>
        </div>

        {/* Senate desks in formal rows */}
        <div className="oc-senate-desks">
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <div key={i} className={`oc-senate-desk oc-senate-desk--${i}`}>
              <div className="oc-senate-desk__surface" />
              <div className="oc-senate-desk__figure">
                <div className="oc-figure__head" />
                <div className={`oc-figure__body oc-figure__body--${i % 3 === 0 ? 'navy' : i % 3 === 1 ? 'charcoal' : 'brown'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Traveling bill document (paper airplane) */}
        <div className="oc-bill-travel">
          <div className="oc-bill-travel__doc">📄</div>
          <div className="oc-bill-travel__trail" />
        </div>

        {/* Floor */}
        <div className="oc-floor" />
      </div>

      {/* ── Story Text ── */}
      <div className={`oc-story${phase >= 1 ? ' oc-story--visible' : ''}`}>
        <h2 className="oc-story__headline">The bill crosses the rotunda.</h2>
        <p className="oc-story__body">
          Passing one chamber is only half the battle. The other chamber has its own
          members, its own priorities, and its own political dynamics. Your bill needs
          to survive this gauntlet too.
        </p>
      </div>

      {/* ── Civic Lesson ── */}
      <div className={`oc-lesson${phase >= 2 ? ' oc-lesson--visible' : ''}`}>
        <span className="oc-lesson__icon">🏛️</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* ── Choices ── */}
      <div className={`oc-choices${phase >= 3 ? ' oc-choices--visible' : ''}`}>
        <h3 className="oc-choices__prompt">
          How do you win the second chamber? <em>Choose your strategy.</em>
        </h3>
        <div className="oc-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`oc-choice${selectedId === choice.id ? ' oc-choice--selected' : ''}${
                  selectedId && selectedId !== choice.id ? ' oc-choice--faded' : ''
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="oc-choice__icon">{meta.icon}</div>
                <div className="oc-choice__body">
                  <div className="oc-choice__label">{choice.label}</div>
                  <div className="oc-choice__desc">{choice.description}</div>
                </div>
                <div className="oc-choice__tags">
                  {meta.tags?.map(t => (
                    <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {selectedId === choice.id && <div className="oc-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const choiceMeta = {
  'lobby-second-chamber': {
    icon: '🤝',
    tags: [
      { label: '+Committee Support', color: 'purple' },
      { label: '−Opposition',        color: 'green'  },
    ],
  },
  'grassroots-pressure': {
    icon: '📢',
    tags: [
      { label: '+Public Support',  color: 'green' },
      { label: '+Media Attention', color: 'blue'  },
      { label: '+Budget Concern',  color: 'red'   },
    ],
  },
  'accept-changes': {
    icon: '✅',
    tags: [
      { label: '+Committee Support', color: 'purple' },
      { label: '−Impl. Difficulty',  color: 'green'  },
      { label: '−Public Support',    color: 'red'    },
    ],
  },
};
