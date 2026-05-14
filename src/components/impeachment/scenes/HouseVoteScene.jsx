import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'party-whip':               { icon: '🗳️', tags: [{ label: '+Senate', color: 'blue' }, { label: '−Bipartisan', color: 'red' }] },
  'persuade-republicans-vote':{ icon: '🤝', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '+Senate', color: 'blue' }] },
  'protect-moderates':        { icon: '🛡️', tags: [{ label: '+Moderate', color: 'blue' }, { label: '−Integrity', color: 'red' }] },
};

export default function HouseVoteScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (choice) => { if (selectedId) return; setSelectedId(choice.id); setTimeout(() => onChoiceSelect(choice), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage im-housevote-stage">
        {/* Left: Whip count */}
        <div className="im-scene-panel">
          <div className="im-panel-label">WHIP COUNT</div>
          <div className="im-whip-row-big"><span className="im-whip-big im-whip-big--yes">221</span><span className="im-whip-lbl">committed yes</span></div>
          <div className="im-whip-row-big"><span className="im-whip-big im-whip-big--soft">3</span><span className="im-whip-lbl">soft yes</span></div>
          <div className="im-whip-row-big"><span className="im-whip-big im-whip-big--gop">2</span><span className="im-whip-lbl">GOP persuadable</span></div>
        </div>

        {/* Center: Vote board */}
        <div className="im-scene-panel im-scene-panel--center">
          <div className="im-hvote-board">
            <div className="im-hvote-board__title">FINAL PASSAGE</div>
            <div className="im-hvote-board__row">
              <div className="im-hvote-board__col im-hvote-board__col--yea">
                <div className="im-hvote-board__num">221</div>
                <div className="im-hvote-board__lbl">YEA</div>
              </div>
              <div className="im-hvote-board__col im-hvote-board__col--nay">
                <div className="im-hvote-board__num">213</div>
                <div className="im-hvote-board__lbl">NAY</div>
              </div>
            </div>
            <div className="im-hvote-board__threshold">218 needed to pass</div>
          </div>
          <div className="im-panel-label" style={{ marginTop: 8 }}>Majority achieved</div>
        </div>

        {/* Right: Historical context */}
        <div className="im-scene-panel">
          <div className="im-stat-box im-stat-box--danger">
            <div className="im-stat-box__num">3×</div>
            <div className="im-stat-box__label">Presidents ever<br/>impeached by House</div>
          </div>
          <div className="im-stat-box">
            <div className="im-stat-box__num">0×</div>
            <div className="im-stat-box__label">Presidents ever<br/>convicted by Senate</div>
          </div>
        </div>

        <div className="im-vote-badge">⚡ HISTORIC VOTE IMMINENT</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">218 votes needed. You have 221 committed — barely.</h2>
        <p className="ci-story__body">
          The full House is minutes from voting on the Articles of Impeachment. Your whip count
          shows 221 committed yes votes — three soft. Two Republicans are genuinely persuadable
          in the next 48 hours. A bipartisan vote in the House would transform the Senate trial's
          dynamics before it even begins.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The vote is in 48 hours. <em>How do you manage the final push?</em></h3>
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
