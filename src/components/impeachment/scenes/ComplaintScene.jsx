import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'immediate-referral':        { icon: '⚡', tags: [{ label: '+Evidence', color: 'green' }, { label: '+Public', color: 'blue' }] },
  'preliminary-investigation': { icon: '🔍', tags: [{ label: '+Evidence', color: 'green' }, { label: '+Legal', color: 'blue' }] },
  'bipartisan-inquiry':        { icon: '🫱🫲', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '+Integrity', color: 'blue' }] },
};

export default function ComplaintScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (choice) => { if (selectedId) return; setSelectedId(choice.id); setTimeout(() => onChoiceSelect(choice), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage im-complaint-stage">
        {/* Left: Capitol */}
        <div className="im-scene-panel">
          <div className="im-capitol-big">🏛️</div>
          <div className="im-panel-label">U.S. Capitol</div>
          <div className="im-panel-sub">House Intelligence<br/>Committee</div>
        </div>

        {/* Center: Whistleblower document */}
        <div className="im-scene-panel im-scene-panel--center">
          <div className="im-wbdoc">
            <div className="im-wbdoc__stamp">⚠️ WHISTLEBLOWER COMPLAINT</div>
            <div className="im-wbdoc__line"/>
            <div className="im-wbdoc__line"/>
            <div className="im-wbdoc__line im-wbdoc__line--short"/>
            <div className="im-wbdoc__classified">CONFIDENTIAL</div>
            <div className="im-wbdoc__line"/>
            <div className="im-wbdoc__line im-wbdoc__line--short"/>
          </div>
          <div className="im-panel-label">Credible Complaint Filed</div>
        </div>

        {/* Right: Stakes */}
        <div className="im-scene-panel">
          <div className="im-stat-box">
            <div className="im-stat-box__num">Art. I</div>
            <div className="im-stat-box__label">Sole power to impeach</div>
          </div>
          <div className="im-stat-box im-stat-box--warn">
            <div className="im-stat-box__num">218</div>
            <div className="im-stat-box__label">House votes needed</div>
          </div>
          <div className="im-stat-box im-stat-box--hi">
            <div className="im-stat-box__num">67</div>
            <div className="im-stat-box__label">Senate votes to convict</div>
          </div>
        </div>

        <div className="im-ticker">
          <span>📺 BREAKING: Whistleblower complaint alleges presidential abuse of power</span>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">A whistleblower complaint lands in Congress.</h2>
        <p className="ci-story__body">
          A credible complaint has arrived at the House Intelligence Committee. A senior official
          alleges the President used the powers of the office to pressure a foreign government
          for personal political benefit. The evidence is serious — but incomplete. As a senior
          House Judiciary member, you decide how the investigation begins.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">A credible complaint has arrived. <em>How do you open the investigation?</em></h3>
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
