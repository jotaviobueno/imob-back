import { Global, Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/config';
import { AccessGuard } from './guards';
import { UserModule } from '../user/user.module';
import { AccessController } from './access.controller';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: '20d' },
    }),
  ],
  controllers: [AccessController],
  providers: [AccessService, AccessGuard],
})
export class AccessModule {}
