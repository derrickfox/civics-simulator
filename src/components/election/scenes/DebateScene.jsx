import React, { useState, useEffect } from 'react';

export default function DebateScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage el-debate-stage">
        {/* Debate set */}
        <div className="el-debate">
          <div className="el-debate__backdrop" />
          <div className="el-debate__podium el-debate__podium--left">
            <div className="el-debate__figure">
              <div className="el-debate__head" />
              <div className="el-debate__body el-debate__body--blue" />
            </div>
            <div className="el-debate__stand">🎤</div>
          </div>
          <div className="el-debate__vs">VS</div>
          <div className="el-debate__podium el-debate__podium--right">
            <div className="el-debate__figure">
              <div className="el-debate__head" />
              <div className="el-debate__body el-debate__body--red" />
            </div>
            <div className="el-debate__stand">🎤</div>
          </div>
        </div>
        {/* Viewer count */}
        <div className="el-viewer-count">
          <span>📺 70M viewers</span>
        </div>
        {/* Moderator */}
        <div className="el-moderator">
          <div className="el-moderator__figure">
            <div className="el-moderator__head" />
            <div className="el-moderator__body" />
          </div>
          <span className="el-moderator__label">Moderator</span>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">70 million viewers. One night. Your whole message.</h2>
        <p className="ci-story__body">
          The general election debate is the biggest audience of your career. Your opponent is sharp,
          disciplined, and well-funded. Undecided voters across the country are watching — this is
          your chance to close the deal or hand your opponent a defining moment.
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
          The moderator turns to you. <em>What's your debate approach?</em>
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
  'vision-debate': {
    icon: '🌟',
    tags: [
      { label: '+Undecided', color: 'blue' },
      { label: '+Media', color: 'green' },
    ],
  },
  'attack-debate': {
    icon: '⚡',
    tags: [
      { label: '+Unity', color: 'green' },
      { label: '+Battleground', color: 'blue' },
    ],
  },
  'policy-debate': {
    icon: '📋',
    tags: [
      { label: '+Media', color: 'blue' },
      { label: '+Funds', color: 'green' },
    ],
  },
};
