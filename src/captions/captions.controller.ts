import { Controller, Get, Param } from '@nestjs/common';
import { CaptionsService } from './captions.service';

@Controller('captions')
export class CaptionsController {
  constructor(private readonly captionsService: CaptionsService) {}

  @Get('/:videoID')
  getCaptions(@Param('videoID') videoID: string): Promise<any> {
    return this.captionsService.getCaptions(videoID);
  }
}
