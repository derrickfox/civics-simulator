import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'attack-rival-map':    { icon: '⚔️', tags: [{ label: '+Public', color: 'blue' }, { label: '−Bipartisan', color: 'red' }] },
  'incorporate-elements':{ icon: '🔀', tags: [{ label: '+Legal', color: 'green' }, { label: '+Bipartisan', color: 'blue' }] },
  'ignore-rival':        { icon: '🙈', tags: [{ label: '−Legal', color: 'red' }, { label: '−Bipartisan', color: 'red' }] },
};

export default function RivalMapScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (c) => { if (selectedId) return; setSelectedId(c.id); setTimeout(() => onChoiceSelect(c), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage rd-rival-stage">
        <div className="im-scene-panel">
          <div className="im-panel-label">YOUR MAP</div>
          <div className="rd-map-compare rd-map-compare--yours">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="rd-map-row">
                {[0,1,2].map(j => <div key={j} className={`rd-map-cell rd-map-cell--${(i+j)%2===0?'dem':'rep'}`}/>)}
              </div>
            ))}
          </div>
          <div className="im-stat-box im-stat-box--hi" style={{ marginTop: 8 }}>
            <div className="im-stat-box__num">11–4</div>
            <div className="im-stat-box__label">Projected seat split<br/>Your party advantage</div>
          </div>
        </div>

        <div className="im-scene-panel im-scene-panel--center">
          <div style={{ fontSize: 32 }}>⚔️</div>
          <div className="im-panel-label">MAP BATTLE</div>
          <div className="rd-press-quote">"The most brazen gerrymander in state history"</div>
          <div className="rd-press-attr">— Minority Party Press Release</div>
          <div className="im-stat-box im-stat-box--danger" style={{ marginTop: 10 }}>
            <div className="im-stat-box__num">Exhibit A</div>
            <div className="im-stat-box__label">Rival map is now<br/>evidence in their lawsuit</div>
          </div>
        </div>

        <div className="im-scene-panel">
          <div className="im-panel-label">RIVAL MAP</div>
          <div className="rd-map-compare rd-map-compare--rival">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="rd-map-row">
                {[0,1,2].map(j => <div key={j} className={`rd-map-cell rd-map-cell--${(i+j)%2===0?'rep':'dem'}`}/>)}
              </div>
            ))}
          </div>
          <div className="im-stat-box im-stat-box--danger" style={{ marginTop: 8 }}>
            <div className="im-stat-box__num">9–6</div>
            <div className="im-stat-box__label">Rival map's projection<br/>Their party advantage</div>
          </div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The minority party has released their own map — and a press release to match.</h2>
        <p className="ci-story__body">{stage.shortDescription}</p>
      </div>
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The rival map is in the public square. <em>How do you respond?</em></h3>
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
