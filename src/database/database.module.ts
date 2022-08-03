import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: true, // Will run migrations every time the app starts
        migrations: ['dist/database/migrations/*.js'], // Links to the migrations (in /dist because: after build)
        ...(configService.get('DB_SSL') ? {
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false
            }
          },
        } : {})
      }),
    }),
  ],
})
export class DatabaseModule {}
