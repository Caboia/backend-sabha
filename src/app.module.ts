import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ReservarSalaService } from './reservar-sala/reservar-sala.service';
import { ReservarSalaModule } from './reservar-sala/reservar-sala.module';
import { Sala } from './reservar-sala/reservar-sala.entity'; // Importe a entidade Sala


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Sala], 
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    ReservarSalaModule,
  ],
})
export class AppModule {}