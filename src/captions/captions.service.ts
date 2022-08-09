import { Injectable } from '@nestjs/common';
import { getSubtitles } from 'youtube-captions-scraper';

@Injectable()
export class CaptionsService {
  async getCaptions(videoID: string): Promise<any> {
    let captionText = '';
    await getSubtitles({
      videoID: videoID,
      lang: 'en',
    }).then((captions) => {
      for (let i = 0; i < captions.length; i++) {
        captionText += captions[i].text + ' ';
      }
    });
    return captionText;
  }
}
