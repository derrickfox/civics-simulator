import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'negotiate-swing-votes': { icon: '🚪', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '+Senate', color: 'blue' }] },
  'public-pressure':       { icon: '📣', tags: [{ label: '+Public', color: 'blue' }, { label: '−Senate', color: 'red' }] },
  'accept-censure':        { icon: '📝', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '−Senate', color: 'red' }] },
};

export default function SenateDeliberationScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (choice) => { if (selectedId) return; setSelectedId(choice.id); setTimeout(() => onChoiceSelect(choice), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage im-deliberation-stage">
        {/* Closed-door room */}
        <div className="im-delib-room">
          <div className="im-delib__door">
            <div className="im-door__panel"/>
            <div className="im-door__knob"/>
            <div className="im-door__sign">CLOSED SESSION</div>
          </div>
          <div className="im-delib__table">
            {[0,1,2,3,4].map(i => (
              <div key={i} className={`im-delib__senator${i === 2 ? ' im-delib__senator--undecided' : ''}`}>
                <div className="im-delib__head"/>
                <div className="im-delib__body"/>
                {i === 2 && <div className="im-delib__question">?</div>}
              </div>
            ))}
          </div>
        </div>
        {/* Count display */}
        <div className="im-count-display">
          <div className="im-count__row"><span className="im-count__num im-count__num--yes">55</span><span className="im-count__lbl"> leaning convict</span></div>
          <div className="im-count__row"><span className="im-count__num im-count__num--no">42</span><span className="im-count__lbl"> leaning acquit</span></div>
          <div className="im-count__row"><span className="im-count__num im-count__num--unk">3</span><span className="im-count__lbl"> undecided</span></div>
        </div>
        <div className="im-math-badge">🔢 Need 67 — 12 short</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">55 senators leaning conviction. 12 short. Three undecided.</h2>
        <p className="ci-story__body">
          The Senate has retired to closed deliberations. The whip count shows you 12 votes short
          of the 67 needed to convict. Three Republican senators are genuinely undecided. This is
          the last 72 hours before the final vote — every choice now shapes whether this presidency
          ends today or continues.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">72 hours remain. <em>How do you close the gap?</em></h3>
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
