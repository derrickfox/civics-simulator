import React, { useState, useEffect } from 'react';

export default function CertGrantedScene({ stage, onChoiceSelect }) {
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
      {/* Supreme Court Exterior Scene */}
      <div className="ci-scene__stage cg-stage">
        <div className="cg-exterior">
          {/* Sky */}
          <div className="cg-sky">
            <div className="ci-sun" style={{ top: '12px', right: '30px', width: '28px', height: '28px' }} />
            <div className="ci-cloud ci-cloud--1" style={{ top: '8px', left: '10%' }} />
          </div>

          {/* Building */}
          <div className="cg-building">
            <div className="cg-building__frieze">EQUAL JUSTICE UNDER LAW</div>
            <div className="cg-building__columns">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="cg-column" />
              ))}
            </div>
            <div className="cg-building__steps">
              {[0, 1, 2].map(i => (
                <div key={i} className="cg-step" />
              ))}
            </div>
          </div>

          {/* Cert granted announcement */}
          <div className="cg-announcement">
            <div className="cg-announcement__text">
              ✅ CERTIORARI GRANTED
            </div>
            <div className="cg-announcement__case">Martinez v. Riverside USD</div>
          </div>

          {/* Crowd of supporters */}
          <div className="cg-crowd">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="cg-supporter">
                <div className="ci-figure__head" style={{ background: `hsl(${i * 40}, 50%, 65%)`, width: '12px', height: '12px' }} />
                <div className="ci-figure__body" style={{ background: `hsl(${i * 40}, 60%, 50%)`, width: '14px', height: '18px', borderRadius: '2px 2px 0 0' }} />
                <div className="cg-sign">✊</div>
              </div>
            ))}
          </div>

          {/* Camera flashes */}
          <div className="cg-flash cg-flash--1" />
          <div className="cg-flash cg-flash--2" />
          <div className="cg-camera">📷</div>
        </div>
      </div>

      {/* Story */}
      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Four justices voted yes. The highest court will hear your case.</h2>
        <p className="ci-story__body">
          Certiorari granted. Supporters gather on the marble steps. Cameras flash.
          Your case — one family's fight against a school district — will now be heard
          by the nine justices who set the law of the land. The real work begins now.
        </p>
      </div>

      {/* Civic Lesson */}
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">✅</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* Choices */}
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          Cert is granted. How do you build your coalition?
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
  'amicus-coalition': {
    icon: '🤝',
    tags: [
      { label: '+Precedent', color: 'purple' },
      { label: '+Public Interest', color: 'blue' },
    ],
  },
  'narrow-ruling': {
    icon: '🎯',
    tags: [
      { label: '+Legal Strength', color: 'green' },
      { label: '−Opposition', color: 'green' },
    ],
  },
  'broad-protection': {
    icon: '🌐',
    tags: [
      { label: '+Public Interest', color: 'blue' },
      { label: '+Opposition', color: 'red' },
    ],
  },
};
