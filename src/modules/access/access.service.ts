import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'src/domain/utils';
import { JwtService } from '@nestjs/jwt';
import { ServiceBase } from 'src/domain/bases';
import { CreateAccessDto } from 'src/domain/dtos';
import { UserService } from '../user/user.service';

@Injectable()
export class AccessService
  implements Partial<ServiceBase<{ token: string }, CreateAccessDto>>
{
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAccessDto: CreateAccessDto) {
    const person = await this.userService.findByEmail(createAccessDto.email);

    const passwordIsEqual = await compare(
      createAccessDto.password,
      person.password,
    );

    if (!passwordIsEqual)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const token = this.jwtService.sign({
      sub: person.id,
    });

    return { token };
  }
}
