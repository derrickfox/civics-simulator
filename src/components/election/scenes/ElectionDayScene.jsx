import React, { useState, useEffect } from 'react';

export default function ElectionDayScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage el-eday-stage">
        {/* Polling place */}
        <div className="el-polling-place">
          <div className="el-polling-place__building">
            <div className="el-polling-place__sign">🗳️ VOTE HERE</div>
            <div className="el-polling-place__door" />
          </div>
          {/* Voter line */}
          <div className="el-voter-line">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="el-voter">
                <div className="el-voter__head" />
                <div className="el-voter__body" />
              </div>
            ))}
          </div>
        </div>
        {/* Map results starting to fill in */}
        <div className="el-results-ticker">
          <span>📊 Early results coming in...</span>
        </div>
        {/* American flag */}
        <div className="el-flag">🇺🇸</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Polls are open. Election Day is here.</h2>
        <p className="ci-story__body">
          Millions of Americans are heading to the polls. Your rapid-response team is monitoring
          turnout data in real time. Lawyers are on standby in contested counties. The work is
          mostly done — but Election Day can still be won or lost on the margins.
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
          Polls open at 7am. <em>Where do you focus your final effort?</em>
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
  'chase-program': {
    icon: '📞',
    tags: [
      { label: '+Battleground', color: 'blue' },
      { label: '+Undecided', color: 'green' },
    ],
  },
  'legal-protection': {
    icon: '⚖️',
    tags: [
      { label: '+Battleground', color: 'blue' },
      { label: '+Media', color: 'green' },
    ],
  },
  'victory-lap': {
    icon: '🎤',
    tags: [
      { label: '+Media', color: 'blue' },
      { label: '+Unity', color: 'green' },
    ],
  },
};
