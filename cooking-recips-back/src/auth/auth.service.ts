import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    dto: LoginDto,
  ): Promise<{ accessToken: string; user: Omit<User, 'password'> }> {
    const user = await this.userRepository.findOne({
      where: { login: dto.login },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordIsValid = dto.password === user.password;

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      login: user.login,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const { password, ...userWithoutPassword } = user;

    return {
      accessToken,
      user: userWithoutPassword,
    };
  }
}
