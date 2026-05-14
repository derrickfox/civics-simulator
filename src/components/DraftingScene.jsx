import React, { useState, useEffect } from 'react';

export default function DraftingScene({ stage, onChoiceSelect }) {
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
    <div className="dr-scene">
      {/* ── Animated Drafting Office Scene ── */}
      <div className="dr-scene__stage">
        {/* Night background */}
        <div className="dr-bg" />

        {/* Stars */}
        <div className="dr-star dr-star--1" />
        <div className="dr-star dr-star--2" />
        <div className="dr-star dr-star--3" />
        <div className="dr-star dr-star--4" />

        {/* Wall clock */}
        <div className="dr-clock">
          <div className="dr-clock__face">
            <div className="dr-clock__hand dr-clock__hand--hour" />
            <div className="dr-clock__hand dr-clock__hand--min" />
          </div>
        </div>

        {/* Sticky notes on wall */}
        <div className="dr-sticky dr-sticky--1">SECTION 4</div>
        <div className="dr-sticky dr-sticky--2">AMEND §12</div>
        <div className="dr-sticky dr-sticky--3">VOTE?</div>

        {/* Law books stack */}
        <div className="dr-books">
          <div className="dr-book" style={{ background: '#4a1a6e', height: '52px' }} />
          <div className="dr-book" style={{ background: '#1a3a6e', height: '46px' }} />
          <div className="dr-book" style={{ background: '#1a5a2e', height: '58px' }} />
          <div className="dr-book" style={{ background: '#6e1a1a', height: '44px' }} />
          <div className="dr-book" style={{ background: '#4a3a10', height: '50px' }} />
        </div>

        {/* Floor */}
        <div className="dr-floor" />

        {/* Desk */}
        <div className="dr-desk">
          <div className="dr-desk__surface">
            {/* Lamp */}
            <div className="dr-lamp">
              <div className="dr-lamp__arm" />
              <div className="dr-lamp__head" />
              <div className="dr-lamp__cone" />
            </div>

            {/* Laptop */}
            <div className="dr-laptop">
              <div className="dr-laptop__screen">
                <div className="dr-laptop__text">H.B. 2847</div>
                <div className="dr-laptop__line" />
                <div className="dr-laptop__line" />
                <div className="dr-laptop__cursor" />
              </div>
              <div className="dr-laptop__base" />
            </div>

            {/* Legal pad */}
            <div className="dr-legalpad">
              <div className="dr-legalpad__line" />
              <div className="dr-legalpad__line" />
              <div className="dr-legalpad__line" />
            </div>

            {/* Coffee cup */}
            <div className="dr-coffee">
              <div className="dr-coffee__cup" />
              <div className="dr-coffee__steam dr-coffee__steam--1" />
              <div className="dr-coffee__steam dr-coffee__steam--2" />
            </div>

            {/* Scattered papers */}
            <div className="dr-paper dr-paper--1" />
            <div className="dr-paper dr-paper--2" />
            <div className="dr-paper dr-paper--3" />
          </div>
          <div className="dr-desk__leg dr-desk__leg--l" />
          <div className="dr-desk__leg dr-desk__leg--r" />
        </div>

        {/* Figure hunched over desk */}
        <div className="dr-figure">
          <div className="dr-figure__head" />
          <div className="dr-figure__body" />
          <div className="dr-figure__arm" />
        </div>

        {/* Lamp glow */}
        <div className="dr-lamp-glow" />
      </div>

      {/* ── Story Text ── */}
      <div className={`dr-story${phase >= 1 ? ' dr-story--visible' : ''}`}>
        <h2 className="dr-story__headline">Every word of this law will matter.</h2>
        <p className="dr-story__body">
          Legislative attorneys and staff are turning your idea into precise legal language.
          How broad or narrow this bill is will shape its cost, its politics, and its
          real-world impact on students.
        </p>
      </div>

      {/* ── Civic Lesson ── */}
      <div className={`dr-lesson${phase >= 2 ? ' dr-lesson--visible' : ''}`}>
        <span className="dr-lesson__icon">✏️</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* ── Choices ── */}
      <div className={`dr-choices${phase >= 3 ? ' dr-choices--visible' : ''}`}>
        <h3 className="dr-choices__prompt">
          How do you draft this bill? <em>Choose the scope.</em>
        </h3>
        <div className="dr-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`dr-choice${selectedId === choice.id ? ' dr-choice--selected' : ''}${
                  selectedId && selectedId !== choice.id ? ' dr-choice--faded' : ''
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="dr-choice__icon">{meta.icon}</div>
                <div className="dr-choice__body">
                  <div className="dr-choice__label">{choice.label}</div>
                  <div className="dr-choice__desc">{choice.description}</div>
                </div>
                <div className="dr-choice__tags">
                  {meta.tags?.map(t => (
                    <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {selectedId === choice.id && <div className="dr-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const choiceMeta = {
  'pilot-program': {
    icon: '🎯',
    tags: [
      { label: '−Budget Concern',    color: 'green' },
      { label: '−Impl. Difficulty',  color: 'green' },
    ],
  },
  citywide: {
    icon: '🏙️',
    tags: [
      { label: '+Public Support',   color: 'green' },
      { label: '+Budget Concern',   color: 'red'   },
      { label: '+Impl. Difficulty', color: 'red'   },
    ],
  },
  'speed-cameras': {
    icon: '📷',
    tags: [
      { label: '+Media Attention', color: 'blue' },
      { label: '+Opposition',      color: 'red'  },
      { label: '+Budget Concern',  color: 'red'  },
    ],
  },
};
