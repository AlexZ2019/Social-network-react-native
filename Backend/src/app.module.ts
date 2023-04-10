import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import UserModule from './user/user.module';
import { CommonModule } from './common/common.module';
import AuthModule from './auth/auth.module';
import DbModule from './db/db.module';
import PostModule from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    AuthModule,
    DbModule,
    UserModule,
    CommonModule,
    PostModule,
  ],
  providers: [],
})
export class AppModule {}
