import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { StudentsModule } from '../students.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule,StudentsModule,
    JwtModule.register({
      secret : 'key',
      signOptions : {
        expiresIn : '60s'
      }
    })
  ],
  providers: [LocalStrategy,JwtStrategy,AuthService],
  exports : [AuthService]
})
export class AuthModule {}