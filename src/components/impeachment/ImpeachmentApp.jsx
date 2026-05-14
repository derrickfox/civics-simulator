import React, { useReducer, useCallback } from 'react';
import { impeachmentStages, INITIAL_IMPEACHMENT_STATE } from '../../data/impeachmentData';
import {
  applyImpeachmentChoice,
  determineConvicted,
  generateImpeachmentFeedback,
} from '../../engine/impeachmentEngine';

import ImpeachmentProcessMap from './ImpeachmentProcessMap';
import ImpeachmentCard from './ImpeachmentCard';
import ImpeachmentMetricsPanel from './ImpeachmentMetricsPanel';
import ImpeachmentFeedbackBox from './ImpeachmentFeedbackBox';
import ImpeachmentFinalOutcome from './ImpeachmentFinalOutcome';

import ComplaintScene from './scenes/ComplaintScene';
import HouseInvestigationScene from './scenes/HouseInvestigationScene';
import PublicHearingsScene from './scenes/PublicHearingsScene';
import ArticlesScene from './scenes/ArticlesScene';
import CommitteeVoteScene from './scenes/CommitteeVoteScene';
import HouseDebateScene from './scenes/HouseDebateScene';
import HouseVoteScene from './scenes/HouseVoteScene';
import SenateTrialScene from './scenes/SenateTrialScene';
import SenateDeliberationScene from './scenes/SenateDeliberationScene';
import SenateVoteScene from './scenes/SenateVoteScene';

const sceneComponents = [
  ComplaintScene,
  HouseInvestigationScene,
  PublicHearingsScene,
  ArticlesScene,
  CommitteeVoteScene,
  HouseDebateScene,
  HouseVoteScene,
  SenateTrialScene,
  SenateDeliberationScene,
  SenateVoteScene,
];

function impeachmentReducer(state, action) {
  switch (action.type) {
    case 'MAKE_CHOICE': {
      const { choice } = action;
      const oldState = {
        evidenceStrength:    state.evidenceStrength,
        publicSupport:       state.publicSupport,
        bipartisanSupport:   state.bipartisanSupport,
        legalGrounding:      state.legalGrounding,
        senateSentiment:     state.senateSentiment,
        proceduralIntegrity: state.proceduralIntegrity,
      };
      const nextMetrics = applyImpeachmentChoice(oldState, choice.effects || {});
      const feedback = generateImpeachmentFeedback(choice, oldState, nextMetrics);
      return {
        ...state,
        ...nextMetrics,
        feedbackVisible: true,
        lastChoice: choice,
        oldState,
        feedback,
        stageChoices: { ...state.stageChoices, [state.currentStage]: choice.id },
      };
    }
    case 'ADVANCE_STAGE': {
      const isLastStage = state.currentStage >= impeachmentStages.length - 1;
      if (isLastStage) {
        const convicted = determineConvicted(state);
        return {
          ...state,
          feedbackVisible: false,
          completedStages: [...state.completedStages, state.currentStage],
          isComplete: true,
          convicted,
        };
      }
      return {
        ...state,
        feedbackVisible: false,
        currentStage: state.currentStage + 1,
        completedStages: [...state.completedStages, state.currentStage],
        lastChoice: null,
        feedback: null,
      };
    }
    case 'RESET':
      return { ...INITIAL_IMPEACHMENT_STATE };
    default:
      return state;
  }
}

export default function ImpeachmentApp({ onBack }) {
  const [state, dispatch] = useReducer(impeachmentReducer, INITIAL_IMPEACHMENT_STATE);

  const handleChoiceSelect = useCallback((choice) => dispatch({ type: 'MAKE_CHOICE', choice }), []);
  const handleContinue    = useCallback(() => dispatch({ type: 'ADVANCE_STAGE' }), []);
  const handlePlayAgain   = useCallback(() => dispatch({ type: 'RESET' }), []);

  const currentStageData = impeachmentStages[state.currentStage];
  const SceneComponent   = sceneComponents[state.currentStage];

  return (
    <div className="app impeachment-app">
      <header className="app-header impeachment-header">
        <div className="app-header__inner">
          <div className="app-header__title-group">
            {onBack && (
              <button className="court-back-btn" onClick={onBack}>
                ← Back to Modules
              </button>
            )}
            <h1 className="app-header__title">
              <span className="app-header__icon">⚖️</span> How Presidential Impeachment Works
            </h1>
            <p className="app-header__subtitle">
              Navigate the constitutional process from complaint to Senate verdict.
            </p>
          </div>
          <div className="app-header__mission">
            <div className="mission-badge">
              <span className="mission-badge__icon">🎯</span>
              <div>
                <p className="mission-badge__label">Your Mission</p>
                <p className="mission-badge__text">
                  Can you build a case strong enough to win the two-thirds Senate supermajority required to convict and remove?
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="process-map-section">
        <ImpeachmentProcessMap
          stages={impeachmentStages}
          currentStage={state.currentStage}
          completedStages={state.completedStages}
        />
      </section>

      {state.isComplete ? (
        <ImpeachmentFinalOutcome
          impeachmentState={state}
          convicted={state.convicted}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <main className="app-main">
          <div className="app-main__left">
            {!state.feedbackVisible && SceneComponent ? (
              <SceneComponent stage={currentStageData} onChoiceSelect={handleChoiceSelect} />
            ) : state.feedbackVisible ? (
              <ImpeachmentFeedbackBox
                feedback={state.feedback}
                onContinue={handleContinue}
                isLastStage={state.currentStage >= impeachmentStages.length - 1}
              />
            ) : null}
          </div>
          <div className="app-main__right">
            <ImpeachmentCard impeachmentState={state} stageName={currentStageData.title} />
            <ImpeachmentMetricsPanel impeachmentState={state} />
          </div>
        </main>
      )}

      <footer className="app-footer">
        <p>Civics Simulator — Building informed citizens, one choice at a time.</p>
      </footer>
    </div>
  );
}
