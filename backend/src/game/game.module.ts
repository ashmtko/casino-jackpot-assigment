import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GameController } from '@game/game.controller';
import { GameService } from '@game/game.service';
import { SessionStore } from '@store/session-store.interface';
import { RedisSessionStore } from '@store/redis-session-store';
import { SessionGuard } from '@app/common/guards/session.guard';

@Module({
  imports: [ConfigModule],
  controllers: [GameController],
  providers: [
    GameService,
    SessionGuard,
    {
      provide: SessionStore,
      useFactory: async () => {
        const url = process.env.REDIS_URL;
        if (!url) {
          throw new Error('REDIS_URL is required');
        }
        const store = new RedisSessionStore(url);
        await store.connect();
        return store;
      },
    },
  ],
})
export class GameModule {}


