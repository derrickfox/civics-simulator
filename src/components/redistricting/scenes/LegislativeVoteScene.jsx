import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'party-line-vote':   { icon: '🗳️', tags: [{ label: '−Bipartisan', color: 'red' }, { label: '−Legal', color: 'red' }] },
  'negotiate-compromise':{ icon: '🤝', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '+Legal', color: 'blue' }] },
  'defer-commission':  { icon: '🏛️', tags: [{ label: '+Fairness', color: 'green' }, { label: '+Legal', color: 'blue' }] },
};

export default function LegislativeVoteScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (c) => { if (selectedId) return; setSelectedId(c.id); setTimeout(() => onChoiceSelect(c), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage rd-legvote-stage">
        <div className="im-scene-panel">
          <div className="im-panel-label">CHAMBER COMPOSITION</div>
          <div className="im-cmember-grid" style={{ maxWidth: 160 }}>
            {Array.from({ length: 58 }).map((_, i) => (
              <div key={i} className="im-cmember im-cmember--dem"/>
            ))}
            {Array.from({ length: 42 }).map((_, i) => (
              <div key={i} className="im-cmember im-cmember--rep"/>
            ))}
          </div>
          <div className="im-chamber-seats__legend" style={{ marginTop: 6 }}>
            <span className="im-legend__dem">● Dem 58</span>
            <span className="im-legend__rep">● Rep 42</span>
          </div>
        </div>

        <div className="im-scene-panel im-scene-panel--center">
          <div className="im-big-tally">
            <div className="im-big-tally__yes">58</div>
            <div className="im-big-tally__label">MAJORITY</div>
          </div>
          <div className="im-big-tally__vs">vs</div>
          <div className="im-big-tally">
            <div className="im-big-tally__no">42</div>
            <div className="im-big-tally__label">MINORITY</div>
          </div>
          <div className="rd-persuadable-note">2 Republicans rumored persuadable</div>
        </div>

        <div className="im-scene-panel">
          <div className="im-stat-box im-stat-box--hi">
            <div className="im-stat-box__num">33</div>
            <div className="im-stat-box__label">States use legislature<br/>for redistricting</div>
          </div>
          <div className="im-stat-box im-stat-box--warn">
            <div className="im-stat-box__num">17</div>
            <div className="im-stat-box__label">States use independent<br/>commissions</div>
          </div>
          <div className="im-stat-box">
            <div className="im-stat-box__num">CA, AZ<br/>CO, MI</div>
            <div className="im-stat-box__label">Shifted to commissions<br/>after 2010 gerrymanders</div>
          </div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">You have the votes. The question is how you use them.</h2>
        <p className="ci-story__body">{stage.shortDescription}</p>
      </div>
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The vote is called. <em>How do you pass the map?</em></h3>
        <div className="ci-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button key={choice.id}
                className={`ci-choice${selectedId === choice.id ? ' ci-choice--selected' : ''}${selectedId && selectedId !== choice.id ? ' ci-choice--faded' : ''}`}
                style={{ animationDelay: `${i * 100}ms`, '--choice-accent': '#14532d' }}
                onClick={() => handleSelect(choice)} disabled={!!selectedId}>
                <div className="ci-choice__icon">{meta.icon}</div>
                <div className="ci-choice__body">
                  <div className="ci-choice__label">{choice.label}</div>
                  <div className="ci-choice__desc">{choice.description}</div>
                </div>
                <div className="ci-choice__tags">{meta.tags?.map(t => <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>)}</div>
                {selectedId === choice.id && <div className="ci-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
