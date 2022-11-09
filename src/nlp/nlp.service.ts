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
      patterns: ['[PROPN|NOUN|ADJ] [PROPN|NOUN]'],
    },
  ];

  findNouns(captionText: string): any[] {
    const doc = this.nlp.readDoc(captionText);

    const filteredText = doc
      .tokens()
      .filter(
        (t) =>
          (t.out(this.its.pos) === 'NOUN' && !t.out(this.its.stopWordFlag)) ||
          (t.out(this.its.pos) === 'PROPN' && !t.out(this.its.stopWordFlag)) ||
          (t.out(this.its.pos) === 'ADJ' && !t.out(this.its.stopWordFlag)),
      )
      .out();

    const filteredString = filteredText.toString().replaceAll(',', ' ');

    this.nlp.learnCustomEntities(this.oneWordPattern, {
      matchValue: true,
      usePOS: true,
      useEntity: true,
    });

    let filteredDoc = this.nlp.readDoc(filteredString);
    const nouns = filteredDoc.customEntities().out();

    this.nlp.learnCustomEntities(this.twoWordPattern, {
      matchValue: true,
      usePOS: true,
      useEntity: true,
    });
    filteredDoc = this.nlp.readDoc(filteredString);
    const twoWordList = filteredDoc.customEntities().out();
    let i = twoWordList.length;
    while (--i) {
      const words = twoWordList[i].split(' ');
      if (words[0] === words[1]) {
        twoWordList.splice(i);
      }
    }
    // eslint-disable-next-line prefer-spread
    nouns.push.apply(nouns, twoWordList);

    // remove duplicate elements
    const uniqueNouns = [...new Set(nouns)];
    return uniqueNouns;
  }
}
