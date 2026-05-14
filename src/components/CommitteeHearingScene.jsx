import React, { useState, useEffect } from 'react';

export default function CommitteeHearingScene({ stage, onChoiceSelect }) {
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
    <div className="ch-scene">
      {/* ── Animated Hearing Room Scene ── */}
      <div className="ch-scene__stage">
        {/* Background walls */}
        <div className="ch-bg" />

        {/* Gallery rows (audience) */}
        <div className="ch-gallery">
          {[0,1,2,3,4,5,6].map(i => (
            <div key={i} className={`ch-audience ch-audience--${i % 3}`} />
          ))}
        </div>

        {/* American flags */}
        <div className="ch-flag ch-flag--left">🇺🇸</div>
        <div className="ch-flag ch-flag--right">🇺🇸</div>

        {/* Raised dais */}
        <div className="ch-dais">
          <div className="ch-dais__platform">
            {/* 5 committee members */}
            {['SMITH', 'JONES', 'CHAIR', 'DAVIS', 'LEE'].map((name, i) => (
              <div key={i} className="ch-member">
                <div className="ch-member__head" />
                <div className={`ch-member__body ch-member__body--${i % 2 === 0 ? 'blue' : 'grey'}`} />
                <div className="ch-member__namecard">{name}</div>
              </div>
            ))}
            {/* Gavel */}
            <div className="ch-gavel">🔨</div>
          </div>
        </div>

        {/* Witness table */}
        <div className="ch-witness-table">
          <div className="ch-witness-table__surface">
            {/* Microphone */}
            <div className="ch-mic">
              <div className="ch-mic__head" />
              <div className="ch-mic__stand" />
              <div className="ch-mic__base" />
            </div>
          </div>
          {/* Witness figures */}
          <div className="ch-witness ch-witness--1">
            <div className="ch-figure__head" />
            <div className="ch-figure__body ch-figure__body--navy" />
          </div>
          <div className="ch-witness ch-witness--2">
            <div className="ch-figure__head" />
            <div className="ch-figure__body ch-figure__body--teal" />
          </div>
        </div>

        {/* Floor */}
        <div className="ch-floor" />

        {/* Overhead spotlights */}
        <div className="ch-spotlight ch-spotlight--1" />
        <div className="ch-spotlight ch-spotlight--2" />
      </div>

      {/* ── Story Text ── */}
      <div className={`ch-story${phase >= 1 ? ' ch-story--visible' : ''}`}>
        <h2 className="ch-story__headline">The committee holds your bill's fate.</h2>
        <p className="ch-story__body">
          Roughly 90% of bills die in committee. You're about to choose who testifies —
          and their words could determine whether this bill gets a floor vote or
          disappears forever.
        </p>
      </div>

      {/* ── Civic Lesson ── */}
      <div className={`ch-lesson${phase >= 2 ? ' ch-lesson--visible' : ''}`}>
        <span className="ch-lesson__icon">📋</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* ── Choices ── */}
      <div className={`ch-choices${phase >= 3 ? ' ch-choices--visible' : ''}`}>
        <h3 className="ch-choices__prompt">
          Who testifies? <em>Choose your witness.</em>
        </h3>
        <div className="ch-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`ch-choice${selectedId === choice.id ? ' ch-choice--selected' : ''}${
                  selectedId && selectedId !== choice.id ? ' ch-choice--faded' : ''
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="ch-choice__icon">{meta.icon}</div>
                <div className="ch-choice__body">
                  <div className="ch-choice__label">{choice.label}</div>
                  <div className="ch-choice__desc">{choice.description}</div>
                </div>
                <div className="ch-choice__tags">
                  {meta.tags?.map(t => (
                    <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {selectedId === choice.id && <div className="ch-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const choiceMeta = {
  'parents-students': {
    icon: '👨‍👩‍👧',
    tags: [
      { label: '+Public Support',  color: 'green' },
      { label: '+Media Attention', color: 'blue'  },
    ],
  },
  engineers: {
    icon: '🔬',
    tags: [
      { label: '+Committee Support', color: 'purple' },
      { label: '−Opposition',        color: 'green'  },
    ],
  },
  'budget-analysts': {
    icon: '💰',
    tags: [
      { label: '−Budget Concern',    color: 'green'  },
      { label: '+Committee Support', color: 'purple' },
    ],
  },
  'disability-advocates': {
    icon: '♿',
    tags: [
      { label: '+Public Support',    color: 'green'  },
      { label: '+Committee Support', color: 'purple' },
      { label: '+Media Attention',   color: 'blue'   },
    ],
  },
};
