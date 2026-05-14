import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'full-support':        { icon: '✍️', tags: [{ label: '+Speed', color: 'blue' }, { label: '−Bipartisan', color: 'red' }] },
  'conditional-approval':{ icon: '✏️', tags: [{ label: '+Legal', color: 'green' }, { label: '+Fairness', color: 'blue' }] },
  'veto-fight':          { icon: '🚫', tags: [{ label: '+Fairness', color: 'green' }, { label: '+Bipartisan', color: 'blue' }] },
};

export default function GovernorsDeskScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (c) => { if (selectedId) return; setSelectedId(c.id); setTimeout(() => onChoiceSelect(c), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage rd-gov-stage">
        <div className="im-scene-panel">
          <div className="im-cj-big">
            <div className="im-cj-big__head"/>
            <div className="im-cj-big__robe" style={{ background: '#14532d' }}/>
          </div>
          <div className="im-panel-label">GOVERNOR</div>
          <div className="im-panel-sub">Same party<br/>Up for re-election in 2yr</div>
          <div className="im-stat-box im-stat-box--warn" style={{ marginTop: 8 }}>
            <div className="im-stat-box__num">10</div>
            <div className="im-stat-box__label">Days to act or<br/>map becomes law</div>
          </div>
        </div>

        <div className="im-scene-panel im-scene-panel--center">
          <div className="rd-bill-doc">
            <div className="rd-bill-doc__title">REDISTRICTING PLAN</div>
            <div className="rd-bill-doc__line"/>
            <div className="rd-bill-doc__line"/>
            <div className="rd-bill-doc__line rd-bill-doc__line--short"/>
            <div className="rd-bill-doc__sig">_________________</div>
            <div className="rd-bill-doc__sig-label">Governor's signature</div>
          </div>
          <div className="im-panel-label" style={{ marginTop: 8 }}>Awaiting decision</div>
        </div>

        <div className="im-scene-panel">
          <div className="im-stat-box im-stat-box--danger">
            <div className="im-stat-box__num">PA<br/>2012</div>
            <div className="im-stat-box__label">Governor vetoed map,<br/>court drew new lines<br/>— more competitive</div>
          </div>
          <div className="im-stat-box">
            <div className="im-stat-box__num">⅔</div>
            <div className="im-stat-box__label">Legislature vote needed<br/>to override a veto</div>
          </div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The map is on the governor's desk. Ten days to act.</h2>
        <p className="ci-story__body">{stage.shortDescription}</p>
      </div>
      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>
      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The governor must decide. <em>What's the call?</em></h3>
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
