import React, { useState, useEffect } from 'react';

export default function StrategyScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage el-strategy-stage">
        {/* War room */}
        <div className="el-war-room">
          <div className="el-war-room__table" />
          <div className="el-war-room__map">
            <div className="el-us-state el-us-state--pa">PA</div>
            <div className="el-us-state el-us-state--mi">MI</div>
            <div className="el-us-state el-us-state--wi">WI</div>
            <div className="el-us-state el-us-state--az">AZ</div>
            <div className="el-us-state el-us-state--ga">GA</div>
          </div>
          <div className="el-war-room__screen">📊</div>
        </div>
        {/* Staff figures */}
        <div className="el-staff">
          {[0,1,2].map(i => (
            <div key={i} className="el-staff__person">
              <div className="el-staff__head" />
              <div className="el-staff__body" />
            </div>
          ))}
        </div>
        {/* Clock - 6 weeks out */}
        <div className="el-countdown">
          <span>⏰ 6 weeks to Election Day</span>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Six weeks out. Every dollar spent matters.</h2>
        <p className="ci-story__body">
          The campaign war room is covered in maps and spreadsheets. Resources are finite — you can't
          campaign everywhere. The Electoral College is won state-by-state, and your team has to decide
          which states to fight for and which to concede.
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
          The map is on the table. <em>What's your path to 270?</em>
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
  'firewall-strategy': {
    icon: '🛡️',
    tags: [
      { label: '+Battleground', color: 'blue' },
      { label: '+Media', color: 'green' },
    ],
  },
  'blue-wall-strategy': {
    icon: '🔵',
    tags: [
      { label: '+Battleground', color: 'blue' },
      { label: '+Undecided', color: 'green' },
    ],
  },
  'sunbelt-strategy': {
    icon: '☀️',
    tags: [
      { label: '+Undecided', color: 'blue' },
      { label: '+Media', color: 'green' },
    ],
  },
};
