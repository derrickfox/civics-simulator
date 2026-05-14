import React, { useState, useEffect } from 'react';

export default function VoteScene({ stage, onChoiceSelect }) {
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
    <div className="vt-scene">
      {/* ── Animated Vote Scene ── */}
      <div className="vt-scene__stage">
        {/* Chamber background */}
        <div className="vt-bg" />

        {/* Vote tally board (dominates scene) */}
        <div className="vt-board">
          <div className="vt-board__title">FINAL VOTE TALLY</div>
          <div className="vt-board__counts">
            <div className="vt-board__yea">
              <div className="vt-board__count-label">YEA</div>
              <div className="vt-board__count vt-board__count--yea">
                <span className="vt-yea-counter">52</span>
              </div>
              <div className="vt-board__bar-bg">
                <div className="vt-board__bar-fill vt-board__bar-fill--yea" />
              </div>
            </div>
            <div className="vt-board__divider" />
            <div className="vt-board__nay">
              <div className="vt-board__count-label">NAY</div>
              <div className="vt-board__count vt-board__count--nay">
                <span className="vt-nay-counter">48</span>
              </div>
              <div className="vt-board__bar-bg">
                <div className="vt-board__bar-fill vt-board__bar-fill--nay" />
              </div>
            </div>
          </div>
          <div className="vt-board__threshold">── 50 MAJORITY NEEDED ──</div>
        </div>

        {/* Clock countdown */}
        <div className="vt-clock">
          <div className="vt-clock__face">⏱</div>
          <div className="vt-clock__time">0:42</div>
        </div>

        {/* Floor legislators pressing buttons */}
        <div className="vt-floor-row">
          {[0,1,2,3,4,5].map(i => (
            <div key={i} className="vt-legislator">
              <div className="vt-legislator__head" />
              <div className={`vt-legislator__body vt-legislator__body--${i % 2 === 0 ? 'navy' : 'red'}`} />
              <div className="vt-legislator__keypad">⌨</div>
            </div>
          ))}
        </div>

        {/* Gallery packed watchers */}
        <div className="vt-gallery">
          {[0,1,2,3,4,5,6,7].map(i => (
            <div key={i} className="vt-gallery__figure vt-gallery__figure--lean" />
          ))}
        </div>

        {/* Floor */}
        <div className="vt-floor" />
      </div>

      {/* ── Story Text ── */}
      <div className={`vt-story${phase >= 1 ? ' vt-story--visible' : ''}`}>
        <h2 className="vt-story__headline">The moment of truth has arrived.</h2>
        <p className="vt-story__body">
          Every vote you built through petitions, hearings, debates, and compromises comes
          down to right now. The tally board is filling up. How do you want this
          recorded for history?
        </p>
      </div>

      {/* ── Civic Lesson ── */}
      <div className={`vt-lesson${phase >= 2 ? ' vt-lesson--visible' : ''}`}>
        <span className="vt-lesson__icon">🗳️</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      {/* ── Choices ── */}
      <div className={`vt-choices${phase >= 3 ? ' vt-choices--visible' : ''}`}>
        <h3 className="vt-choices__prompt">
          How do you call the vote? <em>Choose the procedure.</em>
        </h3>
        <div className="vt-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`vt-choice${selectedId === choice.id ? ' vt-choice--selected' : ''}${
                  selectedId && selectedId !== choice.id ? ' vt-choice--faded' : ''
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="vt-choice__icon">{meta.icon}</div>
                <div className="vt-choice__body">
                  <div className="vt-choice__label">{choice.label}</div>
                  <div className="vt-choice__desc">{choice.description}</div>
                </div>
                <div className="vt-choice__tags">
                  {meta.tags?.map(t => (
                    <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {selectedId === choice.id && <div className="vt-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const choiceMeta = {
  'immediate-vote': {
    icon: '⚡',
    tags: [
      { label: 'Fast & Clean', color: 'blue' },
    ],
  },
  'roll-call': {
    icon: '📝',
    tags: [
      { label: '+Media Attention',  color: 'blue'   },
      { label: '+Public Support',   color: 'green'  },
      { label: 'On the Record',     color: 'purple' },
    ],
  },
  table: {
    icon: '⏸️',
    tags: [
      { label: '−Public Support',    color: 'red' },
      { label: '−Committee Support', color: 'red' },
      { label: 'Bill Dies',          color: 'red' },
    ],
  },
};
