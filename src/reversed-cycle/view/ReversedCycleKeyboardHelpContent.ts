/**
 * ReversedCycleKeyboardHelpContent.ts
 *
 * Content for the keyboard-help dialog (the "?" button in the navigation bar).
 * The Reversed Cycle screen's interactions are the three cycle-parameter
 * sliders, the framing radio buttons, and the stage-stepper push buttons — all
 * covered by the standard slider and basic-actions sections.
 */

import {
  BasicActionsKeyboardHelpSection,
  SliderControlsKeyboardHelpSection,
  TimeControlsKeyboardHelpSection,
  TwoColumnKeyboardHelpContent,
} from "scenerystack/scenery-phet";

export class ReversedCycleKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    // Radio groups (gas, speed, direction) are covered by Basic Actions' "move between items in a group".
    super(
      [new SliderControlsKeyboardHelpSection()],
      [new TimeControlsKeyboardHelpSection(), new BasicActionsKeyboardHelpSection()],
    );
  }
}
