import React, { useState, useEffect } from 'react';

export default function FloorDebateScene({ stage, onChoiceSelect }) {
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
    <div className="fd-scene">
      {/* ── Animated Legislative Chamber ── */}
      <div className="fd-scene__stage">
        {/* Chamber background */}
        <div className="fd-bg" />

        {/* Gallery rail at top */}
        <div className="fd-gallery">
          {[0,1,2,3,4,5,6,7].map(i => (
            <div key={i} className="fd-gallery__figure" />
          ))}
        </div>

        {/* Speaker's rostrum */}
        <div className="fd-rostrum">
          <div className="fd-rostrum__platform">
            <div className="fd-rostrum__figure">
              <div className="fd-figure__head" />
              <div className="fd-figure__body fd-figure__body--black" />
            </div>
            <div className="fd-rostrum__label">SPEAKER</div>
          </div>
        </div>

        {/* American flags flanking speaker */}
        <div className="fd-flag fd-flag--left">🇺🇸</div>
        <div className="fd-flag fd-flag--right">🇺🇸</div>

        {/* Legislative desks in arc */}
        <div className="fd-desks">
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <div key={i} className={`fd-desk fd-desk--${i}`}>
              <div className="fd-desk__surface" />
              <div className="fd-desk__figure">
                <div className="fd-figure__head" />
                <div className={`fd-figure__body fd-figure__body--${i % 2 === 0 ? 'navy' : 'red'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Central podium with speaker */}
        <div className="fd-podium">
          <div className="fd-podium__stand" />
          <div className="fd-podium__figure">
            <div className="fd-figure__head" />
            <div className="fd-figure__body fd-figure__body--teal" />
            <div className="fd-podium__mic">🎤</div>
          </div>
        </div>

        {/* Floor */}
        <div className="fd-floor" />

        {/* Ceiling spotlights */}
        <div className="fd-light fd-light--1" />
        <div className="fd-light fd-light--2" />
        <div className="fd-light fd-light--3" />
      </div>

      {/* ── Story Text ── */}
      <div className={`fd-story${phase >= 1 ? ' fd-story--visible' : ''}`}>
        <h2 className="fd-story__headline">The whole chamber is watching.</h2>
        <p className="fd-story__body">
          Floor debate is democracy in action — every member gets to speak. Your opening
          argument will set the tone. Choose your framing carefully: it could swing the
          undecided votes you need.
        </p>
      </div>

      {/* ── Civic Lesson ── */}
      <div className={`fd-lesson${phase >= 2 ? ' fd-lesson--visible' : ''}`}>
        <span className="fd-lesson__icon">🎤</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* ── Choices ── */}
      <div className={`fd-choices${phase >= 3 ? ' fd-choices--visible' : ''}`}>
        <h3 className="fd-choices__prompt">
          How do you open? <em>Choose your argument.</em>
        </h3>
        <div className="fd-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`fd-choice${selectedId === choice.id ? ' fd-choice--selected' : ''}${
                  selectedId && selectedId !== choice.id ? ' fd-choice--faded' : ''
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="fd-choice__icon">{meta.icon}</div>
                <div className="fd-choice__body">
                  <div className="fd-choice__label">{choice.label}</div>
                  <div className="fd-choice__desc">{choice.description}</div>
                </div>
                <div className="fd-choice__tags">
                  {meta.tags?.map(t => (
                    <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {selectedId === choice.id && <div className="fd-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const choiceMeta = {
  'emotional-appeal': {
    icon: '❤️',
    tags: [
      { label: '+Public Support',    color: 'green'  },
      { label: '+Media Attention',   color: 'blue'   },
      { label: '+Committee Support', color: 'purple' },
    ],
  },
  'fiscal-argument': {
    icon: '📊',
    tags: [
      { label: '−Budget Concern',    color: 'green'  },
      { label: '+Committee Support', color: 'purple' },
      { label: '−Opposition',        color: 'green'  },
    ],
  },
  'procedural-shield': {
    icon: '⚖️',
    tags: [
      { label: '+Committee Support', color: 'purple' },
      { label: '−Opposition',        color: 'green'  },
      { label: '−Public Support',    color: 'red'    },
    ],
  },
};
