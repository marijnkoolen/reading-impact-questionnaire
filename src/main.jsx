
'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import ImpactForm from './ImpactForm.js';
import FormActions from './formActions.js';
import SentenceAPI from './sentenceAPI.js';

export class ReadingImpactQuestionnaire {

  constructor(version) {
    console.log('setting questionnaire version ' + version)
    FormActions.setVersion(version);
    FormActions.setSentenceServer("/api/reading_impact");
    SentenceAPI.loadVersionData((error, versionData) => {
      console.log(versionData);
      ReactDOM.render(
        <ImpactForm apiUrl="/api/reading_impact" readme={versionData.readme} boilerplate={versionData.boilerplate}/>,
        document.getElementById('reading-impact-questionnaire')
      );
    })
  }
}
