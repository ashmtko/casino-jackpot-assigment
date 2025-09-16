import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionStore } from '@store/session-store.interface';
import { RedisSessionStore } from '@store/redis-session-store';

@Module({
  controllers: [SessionController],
  providers: [
    SessionService,
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
  exports: [SessionService],
})
export class SessionModule {}
