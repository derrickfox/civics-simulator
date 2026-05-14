import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'accept-presidents-ask': { icon: '✅', tags: [{ label: '+Passage', color: 'green' }, { label: '+Public', color: 'blue' }] },
  'negotiate-offset':      { icon: '🤝', tags: [{ label: '+Deficit', color: 'green' }, { label: '+Bipartisan', color: 'blue' }] },
  'dare-veto':             { icon: '💪', tags: [{ label: '+Public', color: 'blue' }, { label: '−Passage', color: 'red' }] },
};

export default function PresidentSignScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage bg-budget-oval">
        {/* Oval Office desk */}
        <div className="bd-oval-office">
          <div className="bd-oval__rug">🦅</div>
          <div className="bd-oval__desk">
            <div className="bd-oval__doc">📄 Budget Bill</div>
            <div className="bd-oval__pen">🖊️</div>
          </div>
          <div className="bd-oval__figure">
            <div className="bd-oval__head" />
            <div className="bd-oval__body" />
          </div>
        </div>
        {/* Countdown */}
        <div className="bd-deadline">
          <span>⏰ 11 days until fiscal year ends</span>
        </div>
        {/* Last ask bubble */}
        <div className="bd-last-ask">
          <span>💬 "One last thing..."</span>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The budget is on the President's desk — with one condition.</h2>
        <p className="ci-story__body">
          You've navigated 9 stages of one of the most complex processes in American government.
          The President wants $75 billion added for a priority program before signing. A veto now
          means a continuing resolution and months of work wasted. This is the final call.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The pen is in the President's hand. <em>What's your final move?</em></h3>
        <div className="ci-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`ci-choice${selectedId === choice.id ? ' ci-choice--selected' : ''}${selectedId && selectedId !== choice.id ? ' ci-choice--faded' : ''}`}
                style={{ animationDelay: `${i * 100}ms`, '--choice-accent': '#065f46' }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="ci-choice__icon">{meta.icon}</div>
                <div className="ci-choice__body">
                  <div className="ci-choice__label">{choice.label}</div>
                  <div className="ci-choice__desc">{choice.description}</div>
                </div>
                <div className="ci-choice__tags">
                  {meta.tags?.map(t => <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>)}
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
