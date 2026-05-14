import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'call-witnesses':  { icon: '🎙️', tags: [{ label: '+Evidence', color: 'green' }, { label: '+Public', color: 'blue' }] },
  'document-case':   { icon: '📁', tags: [{ label: '+Legal', color: 'green' }, { label: '+Integrity', color: 'blue' }] },
  'emotional-case':  { icon: '❤️', tags: [{ label: '+Public', color: 'blue' }, { label: '−Legal', color: 'red' }] },
};

export default function SenateTrialScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (choice) => { if (selectedId) return; setSelectedId(choice.id); setTimeout(() => onChoiceSelect(choice), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage im-senate-trial-stage">
        {/* Left: Prosecution */}
        <div className="im-scene-panel">
          <div className="im-trial-team">
            {[0, 1, 2].map(i => (
              <div key={i} className="im-trial-figure">
                <div className="im-trial-figure__head"/>
                <div className="im-trial-figure__body im-trial-figure__body--dem"/>
              </div>
            ))}
          </div>
          <div className="im-panel-label">House Managers</div>
          <div className="im-panel-sub">Prosecution</div>
        </div>

        {/* Center: Chief Justice + Senate */}
        <div className="im-scene-panel im-scene-panel--center">
          <div className="im-cj-big">
            <div className="im-cj-big__head"/>
            <div className="im-cj-big__robe"/>
          </div>
          <div className="im-panel-label">Chief Justice Presiding</div>
          <div className="im-senate-dots">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="im-sdot"/>
            ))}
          </div>
          <div className="im-panel-sub">100 Senators as jury</div>
        </div>

        {/* Right: Defense + threshold */}
        <div className="im-scene-panel">
          <div className="im-trial-team">
            {[0, 1, 2].map(i => (
              <div key={i} className="im-trial-figure">
                <div className="im-trial-figure__head"/>
                <div className="im-trial-figure__body im-trial-figure__body--rep"/>
              </div>
            ))}
          </div>
          <div className="im-panel-label">Defense Team</div>
          <div className="im-stat-box im-stat-box--danger" style={{ marginTop: 10 }}>
            <div className="im-stat-box__num">67</div>
            <div className="im-stat-box__label">Votes needed<br/>to convict</div>
          </div>
        </div>

        <div className="im-trial-badge">⚖️ 67 votes needed to convict</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The Chief Justice calls the Senate to order. The trial begins.</h2>
        <p className="ci-story__body">
          You lead the House Managers — the prosecutors presenting the case to 100 senators.
          The rules give each side equal time. The evidence is the same as the House heard.
          But these are 100 senators, not 435 members of the House — and you need 67 of them
          to reach a verdict that has never happened in American history.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The Senate is your jury. <em>How do you present the case?</em></h3>
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
