import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async auth(email: string, pass: string): Promise<{ access_token: string; user: any }> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const fixedHash = user.password.replace(/^\$2y\$/, '$2b$');
    const isMatch = await bcrypt.compare(pass, fixedHash);

    if (!isMatch) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = { sub: user._id, email: user.email };
    const { password, ...userWithoutPassword } = user.toObject();

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutPassword,
    };
  }
}