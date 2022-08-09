import { Injectable } from '@nestjs/common';

@Injectable()
export class NlpService {
  // Load wink-nlp package, helpers, model; instantiate winkNLP
  winkNLP = require('wink-nlp');
  its = require('wink-nlp/src/its.js');
  as = require('wink-nlp/src/as.js');
  model = require('wink-eng-lite-web-model');
  nlp = this.winkNLP(this.model);

  // Custom entity patterns (for learnCustomEntities())
  oneWordPattern = [
    {
      name: 'one word',
      patterns: ['[PROPN|NOUN]'],
    },
  ];
  twoWordPattern = [
    {
      name: 'two word',
      patterns: ['[PROPN|NOUN] [PROPN|NOUN]'],
    },
  ];

  findNouns(captionText: string): any[] {
    this.nlp.learnCustomEntities(this.oneWordPattern, {
      matchValue: true,
      usePOS: true,
      useEntity: true,
    });

    let doc = this.nlp.readDoc(captionText);
    const nouns = doc.customEntities().out();

    this.nlp.learnCustomEntities(this.twoWordPattern, {
      matchValue: true,
      usePOS: true,
      useEntity: true,
    });

    doc = this.nlp.readDoc(captionText);
    const twoWordList = doc.customEntities().out();

    // eslint-disable-next-line prefer-spread
    nouns.push.apply(nouns, twoWordList);

    // remove duplicate elements
    const uniqueNouns = [...new Set(nouns)];
    return uniqueNouns;
  }
}
