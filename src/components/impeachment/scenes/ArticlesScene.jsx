import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'broad-articles':  { icon: '📋', tags: [{ label: '+Public', color: 'blue' }, { label: '−Legal', color: 'red' }] },
  'single-article':  { icon: '🎯', tags: [{ label: '+Legal', color: 'green' }, { label: '+Bipartisan', color: 'blue' }] },
  'two-articles':    { icon: '📜', tags: [{ label: '+Legal', color: 'green' }, { label: '+Integrity', color: 'blue' }] },
};

export default function ArticlesScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, []);
  const handleSelect = (choice) => { if (selectedId) return; setSelectedId(choice.id); setTimeout(() => onChoiceSelect(choice), 300); };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage im-articles-stage">
        {/* Drafting table */}
        <div className="im-drafting-table">
          <div className="im-draft__surface"/>
          <div className="im-draft__doc">
            <div className="im-draft__title">ARTICLES OF IMPEACHMENT</div>
            <div className="im-draft__line"/>
            <div className="im-draft__line im-draft__line--short"/>
            <div className="im-draft__pen">✍️</div>
          </div>
          {/* Legal books */}
          <div className="im-draft__books">
            <div className="im-book im-book--1">📚</div>
            <div className="im-book im-book--2">⚖️</div>
          </div>
        </div>
        {/* Constitution */}
        <div className="im-constitution">
          <div className="im-constitution__cover">📜 Constitution</div>
          <div className="im-constitution__clause">Art. II, §4</div>
          <div className="im-constitution__text">"High Crimes and Misdemeanors"</div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Every word of the articles will be on trial in the Senate.</h2>
        <p className="ci-story__body">
          You must now draft the formal Articles of Impeachment — the specific charges the Senate
          will try. The scope and precision of the articles is everything. Too broad and they're
          dismissed as vague. Too narrow and you miss the full picture. Legal scholars will scrutinize
          every clause.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The pen is in your hand. <em>How do you frame the charges?</em></h3>
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
