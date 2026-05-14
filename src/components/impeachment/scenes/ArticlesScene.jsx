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
        {/* Left: Constitution */}
        <div className="im-scene-panel">
          <div className="im-const-book">📜</div>
          <div className="im-panel-label">U.S. Constitution</div>
          <div className="im-const-clause">Art. II, §4</div>
          <div className="im-const-quote">"High Crimes and<br/>Misdemeanors"</div>
        </div>

        {/* Center: Draft document */}
        <div className="im-scene-panel im-scene-panel--center">
          <div className="im-article-doc">
            <div className="im-article-doc__title">ARTICLES OF IMPEACHMENT</div>
            <div className="im-article-doc__line"/>
            <div className="im-article-doc__line"/>
            <div className="im-article-doc__line im-article-doc__line--short"/>
            <div className="im-article-doc__line"/>
            <div className="im-article-doc__line im-article-doc__line--short"/>
            <div className="im-article-doc__pen">✍️</div>
          </div>
          <div className="im-panel-label">Drafting the charges</div>
        </div>

        {/* Right: Legal stakes */}
        <div className="im-scene-panel">
          <div className="im-stat-box im-stat-box--danger">
            <div className="im-stat-box__num">⚖️</div>
            <div className="im-stat-box__label">Every word on trial<br/>in the Senate</div>
          </div>
          <div className="im-stat-box im-stat-box--warn">
            <div className="im-stat-box__num">Scope</div>
            <div className="im-stat-box__label">Too broad = dismissed<br/>Too narrow = incomplete</div>
          </div>
          <div className="im-stat-box">
            <div className="im-stat-box__num">📚</div>
            <div className="im-stat-box__label">Legal scholars will<br/>scrutinize every clause</div>
          </div>
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
