import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'closing-argument': { icon: '🎤', tags: [{ label: '+Public', color: 'blue' }, { label: '+Senate', color: 'green' }] },
  'evidence-speaks':  { icon: '📁', tags: [{ label: '+Legal', color: 'green' }, { label: '+Integrity', color: 'blue' }] },
  'last-negotiation': { icon: '🚶', tags: [{ label: '+Senate', color: 'green' }, { label: '+Bipartisan', color: 'blue' }] },
};

const GUILTY = ['GUILTY', 'NOT GUILTY', 'GUILTY', 'GUILTY', 'NOT GUILTY', 'GUILTY', 'NOT GUILTY', 'GUILTY'];

export default function SenateVoteScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (choice) => { if (selectedId) return; setSelectedId(choice.id); setTimeout(() => onChoiceSelect(choice), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage im-senatevote-stage">
        {/* Left: Chief Justice */}
        <div className="im-scene-panel">
          <div className="im-cj-big">
            <div className="im-cj-big__head"/>
            <div className="im-cj-big__robe"/>
          </div>
          <div className="im-panel-label">Chief Justice</div>
          <div className="im-panel-sub">"How say you?"</div>
        </div>

        {/* Center: Roll call */}
        <div className="im-scene-panel im-scene-panel--center">
          <div className="im-panel-label">SENATE ROLL CALL</div>
          <div className="im-rollcall-list">
            {GUILTY.map((v, i) => (
              <div key={i} className={`im-rollcall__entry im-rollcall__entry--${v === 'GUILTY' ? 'guilty' : 'acquit'}`}>
                {v}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Threshold bar */}
        <div className="im-scene-panel">
          <div className="im-panel-label">CONVICTION THRESHOLD</div>
          <div className="im-svote-bar-wrap">
            <div className="im-svote-bar">
              <div className="im-svote-bar__fill"/>
              <div className="im-svote-bar__marker">
                <span>67</span>
              </div>
            </div>
            <div className="im-svote-bar__labels">
              <span>0</span><span>100</span>
            </div>
          </div>
          <div className="im-stat-box im-stat-box--danger" style={{ marginTop: 12, width: '100%' }}>
            <div className="im-stat-box__num">⅔</div>
            <div className="im-stat-box__label">Supermajority required<br/>Never achieved in history</div>
          </div>
        </div>

        <div className="im-final-badge">🔨 History hangs in the balance</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The Chief Justice calls the roll. This is the moment.</h2>
        <p className="ci-story__body">
          Every stage of the impeachment process — the whistleblower complaint, the investigation,
          the hearings, the articles, the trial — comes down to this. One hundred senators will cast
          a vote that no Senate has ever cast in the history of the United States. You have one last
          choice before the roll is called.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">One final move before the roll is called. <em>What do you do?</em></h3>
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
