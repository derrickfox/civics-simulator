import React, { useState, useEffect } from 'react';

export default function ElectoralCountScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1300),
      setTimeout(() => setPhase(3), 2100),
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
      <div className="ci-scene__stage el-count-stage">
        {/* Election night broadcast */}
        <div className="el-broadcast">
          <div className="el-broadcast__screen">
            <div className="el-broadcast__map">
              <div className="el-map-state el-map-state--blue">PA</div>
              <div className="el-map-state el-map-state--red">TX</div>
              <div className="el-map-state el-map-state--gray">AZ</div>
              <div className="el-map-state el-map-state--gray">GA</div>
            </div>
            <div className="el-broadcast__ev-counter">
              <span className="el-ev-blue">247</span>
              <span className="el-ev-divider"> — </span>
              <span className="el-ev-red">219</span>
            </div>
          </div>
          <div className="el-broadcast__anchor">📺</div>
        </div>
        {/* Watch party */}
        <div className="el-watch-party">
          {[0,1,2,3].map(i => (
            <div key={i} className={`el-watcher el-watcher--${i}`}>
              <div className="el-watcher__head" />
              <div className="el-watcher__body" />
            </div>
          ))}
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">States are being called. The map is filling in.</h2>
        <p className="ci-story__body">
          It's election night. Networks are projecting states one by one. Your path to 270 is coming
          into focus — but several states are too close to call. How you handle the next few hours
          will define how your presidency begins.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          The nation is watching. <em>How do you handle election night?</em>
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
                style={{ animationDelay: `${i * 100}ms`, '--choice-accent': '#1e3a5f' }}
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
                {selectedId === choice.id && <div className="ci-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const choiceMeta = {
  'steady-messaging': {
    icon: '😌',
    tags: [
      { label: '+Media', color: 'blue' },
      { label: '+Unity', color: 'green' },
    ],
  },
  'rapid-response': {
    icon: '📱',
    tags: [
      { label: '+Unity', color: 'green' },
      { label: '+Funds', color: 'blue' },
    ],
  },
  'legal-ready': {
    icon: '⚖️',
    tags: [
      { label: '+Battleground', color: 'blue' },
      { label: '+Media', color: 'green' },
    ],
  },
};
