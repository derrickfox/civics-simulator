import React from 'react';

export default function RedistrictingFeedbackBox({ feedback, onContinue, isLastStage }) {
  if (!feedback) return null;
  return (
    <div className="ci-feedback">
      <h3 className="ci-feedback__title">What Happened</h3>
      <p className="ci-feedback__text">{feedback.text}</p>
      {feedback.changes?.length > 0 && (
        <div className="ci-feedback__changes">
          <div className="ci-feedback__changes-label">CASE IMPACT:</div>
          <div className="ci-feedback__tags">
            {feedback.changes.map(({ label, delta }) => (
              <span key={label} className={`ci-feedback__tag ci-feedback__tag--${delta > 0 ? 'pos' : 'neg'}`}>
                {label}: {delta > 0 ? '+' : ''}{delta}
              </span>
            ))}
          </div>
        </div>
      )}
      <button className="btn btn--primary ci-feedback__btn" onClick={onContinue}>
        {isLastStage ? 'See Outcome →' : 'Continue →'}
      </button>
    </div>
  );
}
