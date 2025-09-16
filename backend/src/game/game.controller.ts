import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SessionGuard } from '@app/common/guards/session.guard';
import { Cookie } from '@app/common/decorators/cookie.decorator';
import { GameService } from '@game/game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}


  @Post('spin')
  @UseGuards(SessionGuard)
  async spin(@Cookie('sessionId') sessionId: string) {
    return this.gameService.spin(sessionId);
  }

  @Post('cashout')
  @UseGuards(SessionGuard)
  async cashOut(@Cookie('sessionId') sessionId: string, @Res() res: Response) {
    const result = await this.gameService.cashOut(sessionId);
    
    res.clearCookie('sessionId');
    res.json(result);
  }
}



