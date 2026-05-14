import React, { useState, useEffect } from 'react';

export default function ConferenceScene({ stage, onChoiceSelect }) {
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
      {/* Secret Conference Room */}
      <div className="ci-scene__stage cf-stage">
        <div className="cf-room">
          {/* Door with no clerks sign */}
          <div className="cf-door">
            <div className="cf-door__panel">
              <div className="cf-door__sign">🚫 CLERKS NOT ADMITTED</div>
              <div className="cf-door__knob" />
            </div>
          </div>

          {/* Grandfather clock */}
          <div className="cf-clock">
            <div className="cf-clock__face">🕐</div>
            <div className="cf-clock__label">Conference in session</div>
          </div>

          {/* Oval table with 9 justices */}
          <div className="cf-table">
            <div className="cf-table__surface">
              {/* Case files on table */}
              <div className="cf-files">
                <div className="cf-file cf-file--1" />
                <div className="cf-file cf-file--2" />
                <div className="cf-file cf-file--3" />
                <div className="cf-notepad">
                  <div className="cf-tally">||||</div>
                </div>
              </div>
            </div>

            {/* 9 justices around the table */}
            {[0,1,2,3,4,5,6,7,8].map(i => {
              const angle = (i / 9) * 360;
              const rad = (angle - 90) * (Math.PI / 180);
              const rx = 80, ry = 38;
              const x = 50 + rx * Math.cos(rad);
              const y = 50 + ry * Math.sin(rad);
              return (
                <div
                  key={i}
                  className="cf-justice"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="cf-justice__head" />
                </div>
              );
            })}
          </div>

          {/* Room label */}
          <div className="cf-label">CONFERENCE ROOM — JUSTICES ONLY</div>
        </div>
      </div>

      {/* Story */}
      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">No cameras. No clerks. Nine justices. One vote.</h2>
        <p className="ci-story__body">
          The conference room doors close. No clerks, no cameras, no phones — just nine
          justices around an oval table with a stack of case files. They will speak in order
          of seniority. The initial vote is happening right now — and you can still influence it.
        </p>
      </div>

      {/* Civic Lesson */}
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">🤫</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* Choices */}
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          What's your last move before the vote?
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
  'supplemental-brief': {
    icon: '📄',
    tags: [
      { label: '+Precedent', color: 'purple' },
      { label: '+Legal Strength', color: 'green' },
    ],
  },
  'final-amicus': {
    icon: '👮',
    tags: [
      { label: '+Public Interest', color: 'blue' },
      { label: '−Opposition', color: 'green' },
    ],
  },
  'trust-record': {
    icon: '🧘',
    tags: [
      { label: '+Legal Strength', color: 'green' },
      { label: '+Precedent', color: 'purple' },
    ],
  },
};
