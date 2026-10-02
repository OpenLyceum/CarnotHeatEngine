/**
 * IntroKeyboardHelpContent.ts
 *
 * Content for the keyboard-help dialog (the "?" button in the navigation bar).
 * The Intro screen's interactions are slider adjustments (the two reservoir
 * temperatures), radio buttons for the gas, and the stage-stepper push buttons,
 * so the standard slider and basic-actions sections cover everything.
 */

import {
  BasicActionsKeyboardHelpSection,
  SliderControlsKeyboardHelpSection,
  TimeControlsKeyboardHelpSection,
  TwoColumnKeyboardHelpContent,
} from "scenerystack/scenery-phet";

export class IntroKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    // Radio groups (gas, speed, direction) are covered by Basic Actions' "move between items in a group".
    super(
      [new SliderControlsKeyboardHelpSection()],
      [new TimeControlsKeyboardHelpSection(), new BasicActionsKeyboardHelpSection()],
    );
  }
}
