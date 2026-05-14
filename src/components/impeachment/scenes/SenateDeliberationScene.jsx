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
        {/* Left: Current count */}
        <div className="im-scene-panel">
          <div className="im-panel-label">SENATE WHIP COUNT</div>
          <div className="im-delib-count">
            <div className="im-delib-num im-delib-num--yes">55</div>
            <div className="im-delib-lbl">leaning convict</div>
          </div>
          <div className="im-delib-count">
            <div className="im-delib-num im-delib-num--no">42</div>
            <div className="im-delib-lbl">leaning acquit</div>
          </div>
          <div className="im-delib-count">
            <div className="im-delib-num im-delib-num--unk">3</div>
            <div className="im-delib-lbl">undecided</div>
          </div>
        </div>

        {/* Center: Gap visualization */}
        <div className="im-scene-panel im-scene-panel--center">
          <div className="im-gap-visual">
            <div className="im-gap-visual__label">Need 67 to convict</div>
            <div className="im-gap-visual__bar">
              <div className="im-gap-visual__fill" style={{ width: '55%' }}/>
              <div className="im-gap-visual__marker">67</div>
            </div>
            <div className="im-gap-visual__current">55 leaning yes</div>
          </div>
          <div className="im-stat-box im-stat-box--danger" style={{ marginTop: 12 }}>
            <div className="im-stat-box__num">−12</div>
            <div className="im-stat-box__label">Votes short of<br/>conviction threshold</div>
          </div>
        </div>

        {/* Right: Undecided senators */}
        <div className="im-scene-panel">
          <div className="im-panel-label">UNDECIDED SENATORS</div>
          {[1, 2, 3].map(i => (
            <div key={i} className="im-undecided-senator">
              <div className="im-undecided-senator__head"/>
              <div className="im-undecided-senator__body"/>
              <div className="im-undecided-senator__q">?</div>
            </div>
          ))}
          <div className="im-panel-sub">72 hours to decide</div>
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
