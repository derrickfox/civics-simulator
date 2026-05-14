import React from 'react';

export default function ModuleSelector({ onSelect }) {
  return (
    <div className="ms-root">
      <div className="ms-hero">
        <div className="ms-title-group">
          <h1 className="ms-title">🏛️ Civics Simulator</h1>
          <p className="ms-subtitle">Choose a lesson to begin.</p>
        </div>

        <div className="ms-cards">
          {/* Bill Module */}
          <button className="ms-card" onClick={() => onSelect('bill')}>
            <div className="ms-card__icon">📜</div>
            <div className="ms-card__content">
              <h2 className="ms-card__title">How a Bill Becomes a Law</h2>
              <p className="ms-card__subtitle">
                Guide a student safety bill through 10 stages of the legislative process.
              </p>
            </div>
            <div className="ms-card__badge ms-card__badge--play">PLAY</div>
          </button>

          {/* Court Module */}
          <button className="ms-card ms-card--court" onClick={() => onSelect('court')}>
            <div className="ms-card__icon">⚖️</div>
            <div className="ms-card__content">
              <h2 className="ms-card__title">How a Supreme Court Case Is Decided</h2>
              <p className="ms-card__subtitle">
                Fight a constitutional rights case from incident to landmark ruling.
              </p>
            </div>
            <div className="ms-card__badge ms-card__badge--play">PLAY</div>
          </button>

          {/* Election Module */}
          <button className="ms-card ms-card--election" onClick={() => onSelect('election')}>
            <div className="ms-card__icon">🗳️</div>
            <div className="ms-card__content">
              <h2 className="ms-card__title">How a Presidential Election Works</h2>
              <p className="ms-card__subtitle">
                Run a campaign from exploratory committee to inauguration day.
              </p>
            </div>
            <div className="ms-card__badge ms-card__badge--play">PLAY</div>
          </button>

          {/* Budget Module */}
          <button className="ms-card ms-card--budget" onClick={() => onSelect('budget')}>
            <div className="ms-card__icon">💰</div>
            <div className="ms-card__content">
              <h2 className="ms-card__title">How the Federal Budget Gets Made</h2>
              <p className="ms-card__subtitle">
                Navigate a $7 trillion budget from White House proposal to presidential signature.
              </p>
            </div>
            <div className="ms-card__badge ms-card__badge--play">PLAY</div>
          </button>

          {/* Impeachment Module */}
          <button className="ms-card ms-card--impeachment" onClick={() => onSelect('impeachment')}>
            <div className="ms-card__icon">🔨</div>
            <div className="ms-card__content">
              <h2 className="ms-card__title">How Presidential Impeachment Works</h2>
              <p className="ms-card__subtitle">
                Lead an impeachment from whistleblower complaint to Senate conviction vote.
              </p>
            </div>
            <div className="ms-card__badge ms-card__badge--play">PLAY</div>
          </button>

          {/* Redistricting Module */}
          <button className="ms-card ms-card--redistricting" onClick={() => onSelect('redistricting')}>
            <div className="ms-card__icon">🗺️</div>
            <div className="ms-card__content">
              <h2 className="ms-card__title">How Congressional Redistricting Works</h2>
              <p className="ms-card__subtitle">
                Draw district lines after the census — balancing law, politics, and voters' rights.
              </p>
            </div>
            <div className="ms-card__badge ms-card__badge--new">
              <span className="ms-badge-pulse" />
              NEW
            </div>
          </button>
        </div>

        <p className="ms-footer-note">
          Interactive civics education — learn government by making the decisions.
        </p>
      </div>
    </div>
  );
}
