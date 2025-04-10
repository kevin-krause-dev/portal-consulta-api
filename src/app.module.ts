import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { NotificationGateway } from './notification/notification.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { LogModule } from './log/log.module';
import { ConsultModule } from './consult/consult.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule,
    MongooseModule.forRoot(
      'mongodb+srv://contatokevinkrause:9WBC3yKBPaBOPd6l@portal-consulta.pcl981m.mongodb.net/portal-consulta?retryWrites=true&w=majority&appName=cluster-0&authSource=admin',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LogModule,
    ConsultModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    NotificationGateway,
  ],
})
export class AppModule {}
