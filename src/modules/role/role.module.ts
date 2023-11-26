import { Global, Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from 'src/repositories/role';
import { RoleGuard } from './guards';
import { UserRoleModule } from '../user-role/user-role.module';

@Global()
@Module({
  imports: [forwardRef(() => UserRoleModule)],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, RoleGuard],
  exports: [RoleService, RoleGuard],
})
export class RoleModule {}
