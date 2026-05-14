import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'broad-subpoenas':   { icon: '📬', tags: [{ label: '+Evidence', color: 'green' }, { label: '−Integrity', color: 'red' }] },
  'focused-subpoenas': { icon: '🎯', tags: [{ label: '+Legal', color: 'green' }, { label: '+Bipartisan', color: 'blue' }] },
  'proceed-without':   { icon: '📢', tags: [{ label: '+Public', color: 'blue' }, { label: '−Bipartisan', color: 'red' }] },
};

export default function HouseInvestigationScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (choice) => { if (selectedId) return; setSelectedId(choice.id); setTimeout(() => onChoiceSelect(choice), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage im-invest-stage">
        {/* Investigation office */}
        <div className="im-inv-office">
          <div className="im-inv-office__desk"/>
          <div className="im-inv-office__files">
            {[0,1,2].map(i=><div key={i} className={`im-inv-file im-inv-file--${i}`}>📁</div>)}
          </div>
          <div className="im-inv-office__screen">💻</div>
        </div>
        {/* Subpoena stack */}
        <div className="im-subpoena-stack">
          <div className="im-subpoena">📄 SUBPOENA</div>
          <div className="im-subpoena im-subpoena--2">📄 SUBPOENA</div>
          <div className="im-subpoena im-subpoena--3">📄 SUBPOENA</div>
        </div>
        {/* Stonewalling */}
        <div className="im-stonewall-badge">🚫 White House: No cooperation</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The White House refuses to cooperate.</h2>
        <p className="ci-story__body">
          The Judiciary Committee has launched its investigation — but the White House has announced
          it will not produce documents or allow officials to testify voluntarily. Witnesses are being
          identified. The subpoena strategy will determine how strong the evidentiary record is when
          the public hearings begin.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The White House is stonewalling. <em>How do you get the evidence?</em></h3>
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
