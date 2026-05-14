import React, { useState, useEffect } from 'react';

export default function ExecutiveScene({ stage, onChoiceSelect }) {
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
    <div className="ex-scene">
      {/* ── Animated Governor's Office ── */}
      <div className="ex-scene__stage">
        {/* Rich dark green walls */}
        <div className="ex-bg" />

        {/* Tall arched windows */}
        <div className="ex-window ex-window--left">
          <div className="ex-window__sky" />
          <div className="ex-window__capitol">🏛️</div>
          <div className="ex-window__arch" />
          <div className="ex-window__cross-v" />
          <div className="ex-window__cross-h" />
        </div>
        <div className="ex-window ex-window--right">
          <div className="ex-window__sky" />
          <div className="ex-window__arch" />
          <div className="ex-window__cross-v" />
          <div className="ex-window__cross-h" />
        </div>

        {/* State seal on wall */}
        <div className="ex-seal">
          <div className="ex-seal__ring" />
          <div className="ex-seal__inner">🦅</div>
          <div className="ex-seal__label">STATE SEAL</div>
        </div>

        {/* Flags */}
        <div className="ex-flag ex-flag--left">🇺🇸</div>
        <div className="ex-flag ex-flag--right">🏳️</div>

        {/* Floor */}
        <div className="ex-floor" />

        {/* Executive desk */}
        <div className="ex-desk">
          <div className="ex-desk__surface">
            {/* Bill document on desk */}
            <div className="ex-bill">
              <div className="ex-bill__header">H.B. 2847</div>
              <div className="ex-bill__title">Safe Crosswalks Act</div>
              <div className="ex-bill__line" />
              <div className="ex-bill__line" />
              <div className="ex-bill__sig-line">_________________</div>
            </div>
            {/* Ceremonial pen */}
            <div className="ex-pen">✒️</div>
            {/* Nameplate */}
            <div className="ex-nameplate">GOVERNOR</div>
          </div>
          <div className="ex-desk__leg ex-desk__leg--l" />
          <div className="ex-desk__leg ex-desk__leg--r" />
        </div>

        {/* Governor figure */}
        <div className="ex-gov">
          <div className="ex-gov__head" />
          <div className="ex-gov__body" />
        </div>

        {/* Reporters/cameras */}
        <div className="ex-reporters">
          <div className="ex-reporter ex-reporter--1">
            <div className="ex-reporter__head" />
            <div className="ex-reporter__body" />
            <div className="ex-reporter__camera">📷</div>
          </div>
          <div className="ex-reporter ex-reporter--2">
            <div className="ex-reporter__head" />
            <div className="ex-reporter__body" />
            <div className="ex-reporter__mic">🎤</div>
          </div>
        </div>

        {/* Camera flash effects */}
        <div className="ex-flash ex-flash--1" />
        <div className="ex-flash ex-flash--2" />
      </div>

      {/* ── Story Text ── */}
      <div className={`ex-story${phase >= 1 ? ' ex-story--visible' : ''}`}>
        <h2 className="ex-story__headline">One signature away from history.</h2>
        <p className="ex-story__body">
          The Governor's desk is where all legislation either lives or dies. Public support,
          bipartisan backing, and budget reality all weigh on this moment. What happens
          next is in the Governor's hands — and yours.
        </p>
      </div>

      {/* ── Civic Lesson ── */}
      <div className={`ex-lesson${phase >= 2 ? ' ex-lesson--visible' : ''}`}>
        <span className="ex-lesson__icon">✍️</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* ── Choices ── */}
      <div className={`ex-choices${phase >= 3 ? ' ex-choices--visible' : ''}`}>
        <h3 className="ex-choices__prompt">
          What does the Governor do? <em>The final decision.</em>
        </h3>
        <div className="ex-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`ex-choice${selectedId === choice.id ? ' ex-choice--selected' : ''}${
                  selectedId && selectedId !== choice.id ? ' ex-choice--faded' : ''
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="ex-choice__icon">{meta.icon}</div>
                <div className="ex-choice__body">
                  <div className="ex-choice__label">{choice.label}</div>
                  <div className="ex-choice__desc">{choice.description}</div>
                </div>
                <div className="ex-choice__tags">
                  {meta.tags?.map(t => (
                    <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {selectedId === choice.id && <div className="ex-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const choiceMeta = {
  'governor-signs': {
    icon: '✒️',
    tags: [
      { label: '+Public Support',    color: 'green' },
      { label: '+Media Attention',   color: 'blue'  },
      { label: 'Bill Becomes Law!',  color: 'green' },
    ],
  },
  'governor-veto': {
    icon: '❌',
    tags: [
      { label: '−Public Support',    color: 'red' },
      { label: '−Committee Support', color: 'red' },
      { label: 'Veto!',              color: 'red' },
    ],
  },
  'conditional-signing': {
    icon: '📋',
    tags: [
      { label: '+Public Support',   color: 'green' },
      { label: '−Budget Concern',   color: 'green' },
      { label: '+Impl. Difficulty', color: 'red'   },
    ],
  },
};
