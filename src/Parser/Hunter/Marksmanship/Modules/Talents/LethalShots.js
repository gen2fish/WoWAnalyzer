import React from 'react';

import Analyzer from 'Parser/Core/Analyzer';

import SPELLS from 'common/SPELLS';
import StatisticBox from 'Main/StatisticBox';
import SpellIcon from 'common/SpellIcon';

/**
 * Steady Shot has a 25% chance to cause your next Aimed Shot or Rapid Fire to be guaranteed critical strikes.
 */
class LethalShots extends Analyzer {

  procs = 0;
  overwrittenProcs = 0;
  usedProcs = 0;
  aimedUsage = 0;
  RFUsage = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTalent(SPELLS.PIERCING_SHOT_TALENT.id);
  }

  on_byPlayer_applybuff(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.LETHAL_SHOTS_BUFF.id) {
      return;
    }
    this.procs++;
  }

  on_byPlayer_refreshbuff(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.LETHAL_SHOTS_BUFF.id) {
      return;
    }
    this.overwrittenProcs++;
  }

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    if ((spellId !== SPELLS.AIMED_SHOT.id && spellId !== SPELLS.RAPID_FIRE.id) && this.selectedCombatant.hasBuff(SPELLS.LETHAL_SHOTS_BUFF.id)) {
      return;
    }
    if (spellId === SPELLS.AIMED_SHOT.id) {
      this.aimedUsage++;
    }
    if (spellId === SPELLS.RAPID_FIRE.id) {
      this.RFUsage++;
    }
  }

  get totalProcs() {
    return this.procs + this.overwrittenProcs;
  }

  get totalUsage() {
    return this.RFUsage + this.aimedUsage;
  }

  statistic() {
    let tooltipText = `You gained a total of ${this.totalProcs} procs, and utilised ${this.totalUsage} of them.<ul>`;
    tooltipText += this.aimedUsage > 0 ? `<li>Out of the total procs, you used ${this.aimedUsage} of them on Aimed Shots.</li>` : ``;
    tooltipText += this.RFUsage > 0 ? `<li>Out of the total procs, you used ${this.RFUsage} of them on Rapid Fire.</li>` : ``;
    tooltipText += `</ul>`;
    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.LETHAL_SHOTS_TALENT.id} />}
        value={`${this.totalUsage}/${this.totalProcs}`}
        label="utilised LS procs"
        tooltip={tooltipText} />
    );
  }
}

export default LethalShots;
