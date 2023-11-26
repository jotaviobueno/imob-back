import { Global, Module, forwardRef } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { UserRoleRepository } from 'src/repositories/user-role';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [forwardRef(() => RoleModule), UserModule],
  controllers: [UserRoleController],
  providers: [UserRoleService, UserRoleRepository],
  exports: [UserRoleService],
})
export class UserRoleModule {}
