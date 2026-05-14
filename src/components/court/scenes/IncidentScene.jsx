import React, { useState, useEffect } from 'react';

export default function IncidentScene({ stage, onChoiceSelect }) {
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
      {/* Animated Incident Scene */}
      <div className="ci-scene__stage in-stage">
        {/* Sky */}
        <div className="ci-sky in-sky">
          <div className="ci-sun" />
          <div className="ci-cloud ci-cloud--1" />
          <div className="ci-cloud ci-cloud--2" />
        </div>

        {/* School building (mirrored) */}
        <div className="ci-school in-school">
          <div className="ci-school__roof" />
          <div className="ci-school__body">
            <div className="ci-school__windows">
              <div className="ci-school__window" />
              <div className="ci-school__window" />
              <div className="ci-school__window" />
            </div>
            <div className="ci-school__door" />
          </div>
          <div className="ci-school__sign">🏫 Riverside Middle School</div>
        </div>

        {/* Road with accident */}
        <div className="ci-road in-road">
          <div className="ci-road__dash ci-road__dash--1" />
          <div className="ci-road__dash ci-road__dash--2" />
          <div className="ci-road__dash ci-road__dash--3" />
          <div className="ci-crosswalk">
            {[0,1,2,3,4].map(i => <div key={i} className="ci-crosswalk__stripe" />)}
          </div>

          {/* Ambulance */}
          <div className="in-ambulance">
            <div className="in-ambulance__body">
              <div className="in-ambulance__cross">+</div>
            </div>
            <div className="in-ambulance__light in-ambulance__light--red" />
            <div className="in-ambulance__light in-ambulance__light--blue" />
            <div className="in-ambulance__wheel in-ambulance__wheel--1" />
            <div className="in-ambulance__wheel in-ambulance__wheel--2" />
          </div>

          {/* Bicycle on ground */}
          <div className="in-bike">
            <div className="in-bike__frame" />
            <div className="in-bike__wheel in-bike__wheel--1" />
            <div className="in-bike__wheel in-bike__wheel--2" />
          </div>
        </div>

        {/* Sidewalk & figures */}
        <div className="ci-sidewalk in-sidewalk">
          {/* Family rushing */}
          <div className="ci-figure in-family">
            <div className="ci-figure__head" />
            <div className="ci-figure__body ci-figure__body--red" />
          </div>
          {/* Official */}
          <div className="ci-figure in-official">
            <div className="ci-figure__head" />
            <div className="ci-figure__body" style={{ background: '#1e3a5f' }} />
            <div style={{ fontSize: '10px', marginTop: '2px' }}>📋</div>
          </div>
          {/* News van */}
          <div className="in-news-van">
            <div className="in-news-van__body">📺</div>
          </div>
          {/* Warning */}
          <div className="ci-danger in-alert">🚨</div>
        </div>
      </div>

      {/* Story */}
      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">One family's tragedy. One system's failure.</h2>
        <p className="ci-story__body">
          Sofia Martinez was struck by a speeding driver at an unprotected school crossing.
          The district had received 12 safety complaints about this intersection — and did nothing.
          Her family wants justice, and they want it to mean something for every student in America.
        </p>
      </div>

      {/* Civic Lesson */}
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* Choices */}
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          You represent the Martinez family. <em>What's your first move?</em>
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
                style={{ animationDelay: `${i * 120}ms`, '--choice-accent': '#b91c1c' }}
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
  'file-immediately': {
    icon: '⚡',
    tags: [
      { label: '+Legal Strength', color: 'green' },
      { label: '+Public Interest', color: 'blue' },
    ],
  },
  'negotiate-first': {
    icon: '🤝',
    tags: [
      { label: '+Legal Strength', color: 'green' },
      { label: '−Opposition', color: 'green' },
    ],
  },
  'media-first': {
    icon: '📺',
    tags: [
      { label: '+Public Interest', color: 'blue' },
      { label: '+Opposition', color: 'red' },
    ],
  },
};
