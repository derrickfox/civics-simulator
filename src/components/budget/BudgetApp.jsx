import React, { useReducer, useCallback } from 'react';
import { budgetStages, INITIAL_BUDGET_STATE } from '../../data/budgetData';
import {
  applyBudgetChoice,
  determinePassed,
  generateBudgetFeedback,
} from '../../engine/budgetEngine';

import BudgetProcessMap from './BudgetProcessMap';
import BudgetCard from './BudgetCard';
import BudgetMetricsPanel from './BudgetMetricsPanel';
import BudgetFeedbackBox from './BudgetFeedbackBox';
import BudgetFinalOutcome from './BudgetFinalOutcome';

import PresidentRequestScene from './scenes/PresidentRequestScene';
import CboScoreScene from './scenes/CboScoreScene';
import HouseCommitteeScene from './scenes/HouseCommitteeScene';
import SenateResolutionScene from './scenes/SenateResolutionScene';
import DefenseAppropScene from './scenes/DefenseAppropScene';
import DomesticAppropScene from './scenes/DomesticAppropScene';
import FloorAmendmentScene from './scenes/FloorAmendmentScene';
import ConferenceScene from './scenes/ConferenceScene';
import ReconciliationScene from './scenes/ReconciliationScene';
import PresidentSignScene from './scenes/PresidentSignScene';

const sceneComponents = [
  PresidentRequestScene,
  CboScoreScene,
  HouseCommitteeScene,
  SenateResolutionScene,
  DefenseAppropScene,
  DomesticAppropScene,
  FloorAmendmentScene,
  ConferenceScene,
  ReconciliationScene,
  PresidentSignScene,
];

function budgetReducer(state, action) {
  switch (action.type) {
    case 'MAKE_CHOICE': {
      const { choice } = action;
      const oldState = {
        publicSupport:     state.publicSupport,
        bipartisanSupport: state.bipartisanSupport,
        deficitControl:    state.deficitControl,
        programFunding:    state.programFunding,
        economicOutlook:   state.economicOutlook,
        passageChance:     state.passageChance,
      };
      const nextMetrics = applyBudgetChoice(oldState, choice.effects || {});
      const feedback = generateBudgetFeedback(choice, oldState, nextMetrics);
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
      const isLastStage = state.currentStage >= budgetStages.length - 1;
      if (isLastStage) {
        const passed = determinePassed(state);
        return {
          ...state,
          feedbackVisible: false,
          completedStages: [...state.completedStages, state.currentStage],
          isComplete: true,
          passed,
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
      return { ...INITIAL_BUDGET_STATE };
    default:
      return state;
  }
}

export default function BudgetApp({ onBack }) {
  const [state, dispatch] = useReducer(budgetReducer, INITIAL_BUDGET_STATE);

  const handleChoiceSelect = useCallback((choice) => {
    dispatch({ type: 'MAKE_CHOICE', choice });
  }, []);

  const handleContinue = useCallback(() => {
    dispatch({ type: 'ADVANCE_STAGE' });
  }, []);

  const handlePlayAgain = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const currentStageData = budgetStages[state.currentStage];
  const SceneComponent = sceneComponents[state.currentStage];

  return (
    <div className="app budget-app">
      <header className="app-header budget-header">
        <div className="app-header__inner">
          <div className="app-header__title-group">
            {onBack && (
              <button className="court-back-btn" onClick={onBack}>
                ← Back to Modules
              </button>
            )}
            <h1 className="app-header__title">
              <span className="app-header__icon">💰</span> How the Federal Budget Gets Made
            </h1>
            <p className="app-header__subtitle">
              Navigate a $7 trillion budget from White House proposal to presidential signature.
            </p>
          </div>
          <div className="app-header__mission">
            <div className="mission-badge">
              <span className="mission-badge__icon">🎯</span>
              <div>
                <p className="mission-badge__label">Your Mission</p>
                <p className="mission-badge__text">
                  Can you pass a federal budget that funds key priorities without triggering a government shutdown?
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="process-map-section">
        <BudgetProcessMap
          stages={budgetStages}
          currentStage={state.currentStage}
          completedStages={state.completedStages}
        />
      </section>

      {state.isComplete ? (
        <BudgetFinalOutcome
          budgetState={state}
          passed={state.passed}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <main className="app-main">
          <div className="app-main__left">
            {!state.feedbackVisible && SceneComponent ? (
              <SceneComponent
                stage={currentStageData}
                onChoiceSelect={handleChoiceSelect}
              />
            ) : state.feedbackVisible ? (
              <BudgetFeedbackBox
                feedback={state.feedback}
                onContinue={handleContinue}
                isLastStage={state.currentStage >= budgetStages.length - 1}
              />
            ) : null}
          </div>
          <div className="app-main__right">
            <BudgetCard budgetState={state} stageName={currentStageData.title} />
            <BudgetMetricsPanel budgetState={state} />
          </div>
        </main>
      )}

      <footer className="app-footer">
        <p>Civics Simulator — Building informed citizens, one choice at a time.</p>
      </footer>
    </div>
  );
}
