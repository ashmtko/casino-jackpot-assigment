import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from '@game/game.module';
import { SessionModule } from '@session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  GameModule,
  SessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
