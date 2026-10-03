/**
 * Unit tests for {@link EfficiencyLabModel}: a Measure-mode verdict only ever
 * describes the answer that was actually checked.
 */

import { describe, expect, it } from "vitest";
import { EfficiencyLabModel } from "../src/efficiency-lab/model/EfficiencyLabModel.js";
import { LabMode } from "../src/efficiency-lab/model/LabMode.js";

describe("EfficiencyLabModel Measure verdict", () => {
  it("withdraws a checked verdict when the answer is edited", () => {
    const model = new EfficiencyLabModel();
    model.modeProperty.value = LabMode.MEASURE;
    model.revealEfficiency();
    expect(model.isEfficiencyRevealedProperty.value).toBe(true);

    model.enteredEfficiencyPercentProperty.value += 1;
    expect(model.isEfficiencyRevealedProperty.value).toBe(false);
    expect(model.isEfficiencyVisibleProperty.value).toBe(false);
    model.dispose();
  });

  it("keeps the verdict when nothing changes after Check", () => {
    const model = new EfficiencyLabModel();
    model.modeProperty.value = LabMode.MEASURE;
    model.revealEfficiency();
    model.step(1 / 60);
    expect(model.isEfficiencyRevealedProperty.value).toBe(true);
    model.dispose();
  });
});
