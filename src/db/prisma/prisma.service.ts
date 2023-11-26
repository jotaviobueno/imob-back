import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: ['error', 'query', 'info', 'warn'] });
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      if (params.action === 'delete') {
        params = {
          ...params,
          action: 'update',
          args: {
            ...params.args,
            data: {
              updatedAt: new Date(),
              deletedAt: new Date(),
            },
          },
        };
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
