import React, { useEffect, useState } from 'react';

export default function BudgetFeedbackBox({ feedback, onContinue, isLastStage }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (!feedback) return null;

  return (
    <div className={`feedback-box card${visible ? ' feedback-box--visible' : ''}`}>
      <div className="feedback-box__header">
        <span className="feedback-box__icon">💰</span>
        <h3 className="feedback-box__title">What Happened</h3>
      </div>
      <p className="feedback-box__text">{feedback.text}</p>

      {feedback.changes.length > 0 && (
        <div className="feedback-box__changes">
          <p className="feedback-box__changes-title">Budget Impact:</p>
          <div className="feedback-box__change-list">
            {feedback.changes.map(({ key, label, delta, direction }) => (
              <span
                key={key}
                className={`feedback-change ${direction === 'good' ? 'change--good' : 'change--bad'}`}
              >
                {label}: {delta > 0 ? '+' : ''}{delta}
              </span>
            ))}
          </div>
        </div>
      )}

      <button className="btn btn--primary feedback-box__continue" onClick={onContinue}>
        {isLastStage ? 'See the Outcome →' : 'Continue →'}
      </button>
    </div>
  );
}
