import React from 'react';

import { Abelito75, Putro, Zeboot } from 'CONTRIBUTORS';
import { change, date } from 'common/changelog';

export default [
  change(date(2020, 12, 15), 'Bumped level of support to 9.0.2', Putro),
  change(date(2020, 10, 18), 'Updated Talents', Abelito75),
  change(date(2020, 10, 18), 'Converted legacy listeners to new event filters', Zeboot),
  change(date(2020, 10, 14), <>Fixed checklist and updated spellbook to prevent crashes.</>, Abelito75),
];
