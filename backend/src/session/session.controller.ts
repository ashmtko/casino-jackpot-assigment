import { Controller, Get, Post, Res } from '@nestjs/common';
import { Cookie } from '@app/common/decorators/cookie.decorator';
import { SessionService } from '@session/session.service';
import { Response } from 'express';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('start')
  async startSession(@Res() res: Response) {
    const { sessionId, credits } = await this.sessionService.startSession();
    res.cookie('sessionId', sessionId, { httpOnly: true, sameSite: 'lax' });
    res.json({ credits });
  }

  @Get('')
  async checkSession(@Cookie('sessionId') sessionId: string) {
    const session = await this.sessionService.getSession(sessionId);
    return { active: !!session?.active, user: session?.user ?? '', credits: session?.credits ?? 0 };
  }
}
