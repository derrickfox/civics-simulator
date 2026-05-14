import React, { useState, useEffect } from 'react';

export default function CertificationScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage el-cert-stage">
        {/* Capitol building */}
        <div className="el-capitol-sm">
          <div className="el-capitol-sm__dome">🏛️</div>
          <div className="el-capitol-sm__body">
            <div className="el-capitol-sm__columns" />
          </div>
        </div>
        {/* Congress in session */}
        <div className="el-congress">
          <div className="el-congress__chamber">
            <div className="el-congress__podium">📜</div>
            <div className="el-congress__seats">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="el-congress__seat">
                  <div className="el-congress__member" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Seal */}
        <div className="el-seal">🦅</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Congress meets to certify the results.</h2>
        <p className="ci-story__body">
          The joint session of Congress is in session. The Vice President presides. Electoral votes
          are counted, state by state, and certified. The peaceful transfer of power — the hallmark
          of American democracy — is about to be complete.
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
          Victory is certified. <em>How do you use this moment?</em>
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
  'gracious-winner': {
    icon: '📞',
    tags: [
      { label: '+Media', color: 'blue' },
      { label: '+Unity', color: 'green' },
    ],
  },
  'unity-speech': {
    icon: '🎤',
    tags: [
      { label: '+Media', color: 'blue' },
      { label: '+Undecided', color: 'green' },
    ],
  },
  'transition-focus': {
    icon: '🏛️',
    tags: [
      { label: '+Media', color: 'blue' },
      { label: '+Unity', color: 'green' },
    ],
  },
};
