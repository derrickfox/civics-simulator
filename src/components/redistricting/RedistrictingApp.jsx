import React, { useReducer, useCallback } from 'react';
import { redistrictingStages, INITIAL_REDISTRICTING_STATE } from '../../data/redistrictingData';
import {
  applyRedistrictingChoice,
  determineApproved,
  generateRedistrictingFeedback,
} from '../../engine/redistrictingEngine';

import RedistrictingProcessMap from './RedistrictingProcessMap';
import RedistrictingCard from './RedistrictingCard';
import RedistrictingMetricsPanel from './RedistrictingMetricsPanel';
import RedistrictingFeedbackBox from './RedistrictingFeedbackBox';
import RedistrictingFinalOutcome from './RedistrictingFinalOutcome';

import CensusScene from './scenes/CensusScene';
import DrawingCriteriaScene from './scenes/DrawingCriteriaScene';
import FirstDraftScene from './scenes/FirstDraftScene';
import VRAComplianceScene from './scenes/VRAComplianceScene';
import PublicHearingsScene from './scenes/PublicHearingsScene';
import RivalMapScene from './scenes/RivalMapScene';
import LegislativeVoteScene from './scenes/LegislativeVoteScene';
import GovernorsDeskScene from './scenes/GovernorsDeskScene';
import LegalChallengeScene from './scenes/LegalChallengeScene';
import CourtRulingScene from './scenes/CourtRulingScene';

const sceneComponents = [
  CensusScene,
  DrawingCriteriaScene,
  FirstDraftScene,
  VRAComplianceScene,
  PublicHearingsScene,
  RivalMapScene,
  LegislativeVoteScene,
  GovernorsDeskScene,
  LegalChallengeScene,
  CourtRulingScene,
];

function redistrictingReducer(state, action) {
  switch (action.type) {
    case 'MAKE_CHOICE': {
      const { choice } = action;
      const oldState = {
        fairness:           state.fairness,
        competitiveness:    state.competitiveness,
        vraCompliance:      state.vraCompliance,
        publicSupport:      state.publicSupport,
        legalDefensibility: state.legalDefensibility,
        bipartisanSupport:  state.bipartisanSupport,
      };
      const nextMetrics = applyRedistrictingChoice(oldState, choice.effects || {});
      const feedback = generateRedistrictingFeedback(choice, oldState, nextMetrics);
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
      const isLastStage = state.currentStage >= redistrictingStages.length - 1;
      if (isLastStage) {
        const mapApproved = determineApproved(state);
        return {
          ...state,
          feedbackVisible: false,
          completedStages: [...state.completedStages, state.currentStage],
          isComplete: true,
          mapApproved,
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
      return { ...INITIAL_REDISTRICTING_STATE };
    default:
      return state;
  }
}

export default function RedistrictingApp({ onBack }) {
  const [state, dispatch] = useReducer(redistrictingReducer, INITIAL_REDISTRICTING_STATE);

  const handleChoiceSelect = useCallback((choice) => dispatch({ type: 'MAKE_CHOICE', choice }), []);
  const handleContinue    = useCallback(() => dispatch({ type: 'ADVANCE_STAGE' }), []);
  const handlePlayAgain   = useCallback(() => dispatch({ type: 'RESET' }), []);

  const currentStageData = redistrictingStages[state.currentStage];
  const SceneComponent   = sceneComponents[state.currentStage];

  return (
    <div className="app redistricting-app">
      <header className="app-header redistricting-header">
        <div className="app-header__inner">
          <div className="app-header__title-group">
            {onBack && (
              <button className="court-back-btn" onClick={onBack}>
                ← Back to Modules
              </button>
            )}
            <h1 className="app-header__title">
              <span className="app-header__icon">🗺️</span> How Congressional Redistricting Works
            </h1>
            <p className="app-header__subtitle">
              Draw the lines that determine who represents 15 districts for the next decade.
            </p>
          </div>
          <div className="app-header__mission">
            <div className="mission-badge">
              <span className="mission-badge__icon">🎯</span>
              <div>
                <p className="mission-badge__label">Your Mission</p>
                <p className="mission-badge__text">
                  Can you draw a map that survives legal challenge while balancing fairness, VRA compliance, and political reality?
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="process-map-section">
        <RedistrictingProcessMap
          stages={redistrictingStages}
          currentStage={state.currentStage}
          completedStages={state.completedStages}
        />
      </section>

      {state.isComplete ? (
        <RedistrictingFinalOutcome
          redistrictingState={state}
          mapApproved={state.mapApproved}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <main className="app-main">
          <div className="app-main__left">
            {!state.feedbackVisible && SceneComponent ? (
              <SceneComponent stage={currentStageData} onChoiceSelect={handleChoiceSelect} />
            ) : state.feedbackVisible ? (
              <RedistrictingFeedbackBox
                feedback={state.feedback}
                onContinue={handleContinue}
                isLastStage={state.currentStage >= redistrictingStages.length - 1}
              />
            ) : null}
          </div>
          <div className="app-main__right">
            <RedistrictingCard redistrictingState={state} stageName={currentStageData.title} />
            <RedistrictingMetricsPanel redistrictingState={state} />
          </div>
        </main>
      )}

      <footer className="app-footer">
        <p>Civics Simulator — Building informed citizens, one choice at a time.</p>
      </footer>
    </div>
  );
}
