import React, { useState, useEffect } from 'react';

export default function DecisionScene({ stage, onChoiceSelect }) {
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
      {/* Opinion Announcement Day */}
      <div className="ci-scene__stage ds-stage">
        <div className="ds-chamber">
          {/* Chandeliers (same as oral args but different energy) */}
          <div className="oa-chandelier oa-chandelier--1" style={{ opacity: 0.6 }} />
          <div className="oa-chandelier oa-chandelier--3" style={{ opacity: 0.6 }} />

          {/* Reading justice at bench */}
          <div className="ds-bench">
            <div className="ds-bench__surface">
              {/* The reading justice */}
              <div className="ds-reading-justice">
                <div className="ci-figure__head" style={{ background: '#d4c5a9', width: '18px', height: '18px' }} />
                <div className="ci-figure__body" style={{ background: '#1a1a1a', width: '24px', height: '30px', borderRadius: '3px 3px 0 0' }} />
                <div className="ds-opinion-doc">📜</div>
              </div>
              {/* Other justices seated */}
              {[0,1,2,3,4,5,6,7].map(i => (
                <div key={i} className="ds-seated-justice">
                  <div className="ci-figure__head" style={{ background: '#c4b8a0', width: '12px', height: '12px' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Announcement screen/board */}
          <div className="ds-announcement">
            <div className="ds-announcement__case">Martinez v. Riverside USD</div>
            <div className="ds-announcement__label">JUDGMENT</div>
            <div className="ds-announcement__blink" />
          </div>

          {/* Reporters in gallery */}
          <div className="ds-gallery">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="ds-reporter">
                <div className="ci-figure__head" style={{ background: `hsl(${i * 30}, 35%, 62%)`, width: '10px', height: '10px' }} />
                <div style={{ fontSize: '8px' }}>📝</div>
              </div>
            ))}
          </div>

          {/* Window with supporters outside */}
          <div className="ds-window">
            <div className="ds-window__outside">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="ds-supporter-outside">
                  <div style={{ fontSize: '8px' }}>✊</div>
                </div>
              ))}
            </div>
          </div>

          {/* Camera flashes */}
          <div className="ds-flash ds-flash--1" />
          <div className="ds-flash ds-flash--2" />
        </div>
      </div>

      {/* Story */}
      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The opinion is written. History is about to be made.</h2>
        <p className="ci-story__body">
          Opinion Day. The chamber is hushed. A justice rises to read the majority opinion.
          Reporters' pens are ready. Outside, supporters cluster on the marble steps.
          One final decision remains — the scope of your victory.
        </p>
      </div>

      {/* Civic Lesson */}
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">📜</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* Choices */}
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          The majority has an opinion. How do you shape the ruling?
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
  'accept-narrow': {
    icon: '🔒',
    tags: [
      { label: '+Precedent', color: 'purple' },
      { label: '−Opposition', color: 'green' },
    ],
  },
  'hold-broad': {
    icon: '🌐',
    tags: [
      { label: '+Public Interest', color: 'blue' },
      { label: '+Opposition', color: 'red' },
    ],
  },
  'swing-compromise': {
    icon: '⚖️',
    tags: [
      { label: '+Precedent', color: 'purple' },
      { label: '+Legal Strength', color: 'green' },
    ],
  },
};
