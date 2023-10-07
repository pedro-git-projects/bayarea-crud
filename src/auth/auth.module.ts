import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, PrismaService]
})
export class AuthModule {}
