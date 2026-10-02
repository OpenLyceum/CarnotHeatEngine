/**
 * readouts.ts
 *
 * Helpers for the numeric readout rows that appear on all three screens:
 * a right-aligned label column, then the value, so a column of readouts lines
 * up regardless of how wide the individual labels are.
 *
 * Values are built as `DerivedProperty<string>` rather than formatted at call
 * time so they stay live and stay localized — the unit suffix is a
 * StringProperty like everything else.
 */

import { DerivedProperty, type TReadOnlyProperty } from "scenerystack/axon";
import { Bounds2, toFixed } from "scenerystack/dot";
import { StringUtils } from "scenerystack/phetcommon";
import { AlignBox, HBox, type Node, RichText, type TPaint, VBox } from "scenerystack/scenery";
import CarnotHeatEngineColors from "../../CarnotHeatEngineColors.js";
import { READOUT_FONT } from "../../CarnotHeatEngineConstants.js";
import { StringManager } from "../../i18n/StringManager.js";
import { formatSignificant } from "./chartUtils.js";

/** Width of the label column in a readout block, px. */
const READOUT_LABEL_WIDTH = 96;

/** Height a readout row is aligned within, px. */
const READOUT_ROW_HEIGHT = 18;

/** Widest a readout value may draw before it scales down, px. */
const READOUT_VALUE_MAX_WIDTH = 130;

/** J → kJ, the unit the energy readouts are labelled in. */
export const toKilojoules = (energyJ: number): number => energyJ / 1000;

/** A live "<value> <units>" string with a fixed number of decimals. */
export const valueWithUnits = (
  valueProperty: TReadOnlyProperty<number>,
  unitsProperty: TReadOnlyProperty<string>,
  decimalPlaces = 1,
): TReadOnlyProperty<string> =>
  new DerivedProperty(
    [valueProperty, unitsProperty, StringManager.getInstance().getReadouts().valueUnitsPatternStringProperty],
    (value, units, pattern) =>
      Number.isFinite(value)
        ? StringUtils.fillIn(pattern, { value: toFixed(value, decimalPlaces), units: units })
        : "—",
  );

/** A live "<value> <units>" string rounded to `digits` significant figures. */
export const significantValueWithUnits = (
  valueProperty: TReadOnlyProperty<number>,
  unitsProperty: TReadOnlyProperty<string>,
  digits = 3,
): TReadOnlyProperty<string> =>
  new DerivedProperty(
    [valueProperty, unitsProperty, StringManager.getInstance().getReadouts().valueUnitsPatternStringProperty],
    (value, units, pattern) => StringUtils.fillIn(pattern, { value: formatSignificant(value, digits), units: units }),
  );

/**
 * One readout row: label on the left in a fixed-width column, value on the
 * right. Both are `RichText`, since most of the labels carry `<sub>` markup.
 */
export const createReadoutRow = (
  labelProperty: TReadOnlyProperty<string>,
  valueProperty: TReadOnlyProperty<string>,
  options?: { labelFill?: TPaint; valueFill?: TPaint },
): HBox => {
  const label = new RichText(labelProperty, {
    font: READOUT_FONT,
    fill: options?.labelFill ?? CarnotHeatEngineColors.secondaryTextColorProperty,
    maxWidth: READOUT_LABEL_WIDTH,
  });
  const value = new RichText(valueProperty, {
    font: READOUT_FONT,
    fill: options?.valueFill ?? CarnotHeatEngineColors.textColorProperty,
    maxWidth: READOUT_VALUE_MAX_WIDTH,
  });
  return new HBox({
    children: [
      new AlignBox(label, {
        alignBounds: new Bounds2(0, 0, READOUT_LABEL_WIDTH, READOUT_ROW_HEIGHT),
        xAlign: "right",
        yAlign: "center",
      }),
      value,
    ],
    spacing: 8,
    align: "center",
  });
};

/** A left-aligned column of readout rows. */
export const createReadoutColumn = (rows: readonly Node[]): VBox =>
  new VBox({ children: [...rows], align: "left", spacing: 4 });
