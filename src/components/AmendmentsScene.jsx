import React, { useState, useEffect } from 'react';

export default function AmendmentsScene({ stage, onChoiceSelect }) {
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
    <div className="am-scene">
      {/* ── Animated Negotiation Room ── */}
      <div className="am-scene__stage">
        {/* Background */}
        <div className="am-bg" />

        {/* Whiteboard on wall */}
        <div className="am-whiteboard">
          <div className="am-whiteboard__header">PROS / CONS</div>
          <div className="am-whiteboard__pros">
            <div className="am-wb-line am-wb-line--green" />
            <div className="am-wb-line am-wb-line--green" />
          </div>
          <div className="am-whiteboard__cons">
            <div className="am-wb-line am-wb-line--red" />
            <div className="am-wb-line am-wb-line--red" />
          </div>
        </div>

        {/* Floor */}
        <div className="am-floor" />

        {/* Round table */}
        <div className="am-table">
          {/* Papers on table with red X marks */}
          <div className="am-doc am-doc--1">
            <div className="am-doc__line" />
            <div className="am-doc__line" />
            <div className="am-doc__x">✗</div>
          </div>
          <div className="am-doc am-doc--2">
            <div className="am-doc__line" />
            <div className="am-doc__x">✗</div>
          </div>
          <div className="am-doc am-doc--3">
            <div className="am-doc__line" />
            <div className="am-doc__line" />
          </div>
          {/* Coffee mugs */}
          <div className="am-mug am-mug--1">☕</div>
          <div className="am-mug am-mug--2">☕</div>
          {/* Tension indicators */}
          <div className="am-tension am-tension--1">⚡</div>
          <div className="am-tension am-tension--2">⚡</div>
        </div>

        {/* 4 legislators around the table */}
        <div className="am-figure am-figure--top-left">
          <div className="am-figure__head" />
          <div className="am-figure__body am-figure__body--navy" />
        </div>
        <div className="am-figure am-figure--top-right">
          <div className="am-figure__head" />
          <div className="am-figure__body am-figure__body--brown" />
          {/* Red pen in hand */}
          <div className="am-pen">🖊️</div>
        </div>
        <div className="am-figure am-figure--bottom-left">
          <div className="am-figure__head" />
          <div className="am-figure__body am-figure__body--grey" />
        </div>
        <div className="am-figure am-figure--bottom-right">
          <div className="am-figure__head" />
          <div className="am-figure__body am-figure__body--teal" />
        </div>
      </div>

      {/* ── Story Text ── */}
      <div className={`am-story${phase >= 1 ? ' am-story--visible' : ''}`}>
        <h2 className="am-story__headline">They want to change your bill.</h2>
        <p className="am-story__body">
          Amendments are the price of compromise. Accept too many and you weaken the law.
          Reject them all and you may lose the votes you need. Every change is a trade-off
          between ideals and reality.
        </p>
      </div>

      {/* ── Civic Lesson ── */}
      <div className={`am-lesson${phase >= 2 ? ' am-lesson--visible' : ''}`}>
        <span className="am-lesson__icon">🔧</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* ── Choices ── */}
      <div className={`am-choices${phase >= 3 ? ' am-choices--visible' : ''}`}>
        <h3 className="am-choices__prompt">
          What do you accept? <em>Choose your compromise.</em>
        </h3>
        <div className="am-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`am-choice${selectedId === choice.id ? ' am-choice--selected' : ''}${
                  selectedId && selectedId !== choice.id ? ' am-choice--faded' : ''
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="am-choice__icon">{meta.icon}</div>
                <div className="am-choice__body">
                  <div className="am-choice__label">{choice.label}</div>
                  <div className="am-choice__desc">{choice.description}</div>
                </div>
                <div className="am-choice__tags">
                  {meta.tags?.map(t => (
                    <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {selectedId === choice.id && <div className="am-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const choiceMeta = {
  'pilot-compromise': {
    icon: '🤝',
    tags: [
      { label: '+Committee Support', color: 'purple' },
      { label: '−Budget Concern',    color: 'green'  },
      { label: '−Public Support',    color: 'red'    },
    ],
  },
  'remove-cameras': {
    icon: '🚫',
    tags: [
      { label: '−Opposition',     color: 'green' },
      { label: '−Budget Concern', color: 'green' },
      { label: '−Public Support', color: 'red'   },
    ],
  },
  'delay-implementation': {
    icon: '⏰',
    tags: [
      { label: '+Committee Support', color: 'purple' },
      { label: '−Impl. Difficulty', color: 'green'   },
      { label: '−Public Support',   color: 'red'     },
    ],
  },
  'no-amendments': {
    icon: '✊',
    tags: [
      { label: '−Committee Support', color: 'red' },
      { label: '+Opposition',        color: 'red' },
    ],
  },
};
