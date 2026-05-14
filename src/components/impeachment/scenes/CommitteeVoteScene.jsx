import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'party-line-push':     { icon: '🗳️', tags: [{ label: '+Senate', color: 'blue' }, { label: '−Bipartisan', color: 'red' }] },
  'persuade-republicans':{ icon: '🤝', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '+Senate', color: 'blue' }] },
  'procedural-maneuver': { icon: '⏩', tags: [{ label: '+Speed', color: 'blue' }, { label: '−Integrity', color: 'red' }] },
};

export default function CommitteeVoteScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (choice) => { if (selectedId) return; setSelectedId(choice.id); setTimeout(() => onChoiceSelect(choice), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage im-committee-stage">
        {/* Committee chamber */}
        <div className="im-committee-room">
          <div className="im-committee__dais">
            {[0,1,2,3,4,5,6].map(i => (
              <div key={i} className={`im-committee__seat${i === 6 ? ' im-committee__seat--highlight' : ''}`}>
                <div className="im-committee__head"/>
                <div className="im-committee__body"/>
              </div>
            ))}
          </div>
          <div className="im-committee__nameplate">HOUSE JUDICIARY COMMITTEE</div>
        </div>
        {/* Vote tally */}
        <div className="im-vote-tally">
          <div className="im-tally__label">COMMITTEE VOTE</div>
          <div className="im-tally__row">
            <span className="im-tally__yes">23 YES</span>
            <span className="im-tally__divider">·</span>
            <span className="im-tally__no">14 NO</span>
          </div>
          <div className="im-tally__pending">2 UNDECIDED</div>
        </div>
        {/* Republican badge */}
        <div className="im-gop-badge">🔴 2 Republicans persuadable</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Two Republicans could cross the aisle — if you make the case.</h2>
        <p className="ci-story__body">
          The Judiciary Committee is ready to vote on sending the Articles to the full House.
          A party-line vote advances the articles — but bipartisan support would send a powerful
          signal to the Senate. Two Republican members have been unusually quiet. There may still
          be a path to their votes.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The committee vote is next. <em>How do you approach it?</em></h3>
        <div className="ci-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button key={choice.id}
                className={`ci-choice${selectedId === choice.id ? ' ci-choice--selected' : ''}${selectedId && selectedId !== choice.id ? ' ci-choice--faded' : ''}`}
                style={{ animationDelay: `${i * 100}ms`, '--choice-accent': '#7f1d1d' }}
                onClick={() => handleSelect(choice)} disabled={!!selectedId}>
                <div className="ci-choice__icon">{meta.icon}</div>
                <div className="ci-choice__body">
                  <div className="ci-choice__label">{choice.label}</div>
                  <div className="ci-choice__desc">{choice.description}</div>
                </div>
                <div className="ci-choice__tags">{meta.tags?.map(t=><span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>)}</div>
                {selectedId === choice.id && <div className="ci-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
