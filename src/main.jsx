
'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import ImpactForm from './ImpactForm.js';
import FormActions from './formActions.js';

export class ReadingImpactQuestionnaire {

  constructor(version) {
    console.log('setting questionnaire version ' + version)
    FormActions.setVersion(version);
    FormActions.setSentenceServer("/api/reading_impact");
    ReactDOM.render(
      <ImpactForm apiUrl="/api/reading_impact" />,
      document.getElementById('reading-impact-questionnaire')
    );

  }

}
