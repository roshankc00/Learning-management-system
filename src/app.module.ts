import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from 'database/db.connection';
import { UserModule } from './user/user.module';
import { CoursesModule } from './courses/courses.module';
import { SectionsModule } from './sections/sections.module';
import { CategoryModule } from './category/category.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { LecturesModule } from './lectures/lectures.module';
import { currentUserMiddleware } from './utils/middlewares/currentUser.middleware';
import { CloudinaryProvider } from './Cloudinary/providers/clodinary.provider';

@Module({
  imports: [TypeOrmModule.forRoot(datasourceOptions), UserModule, CoursesModule, SectionsModule, CategoryModule, OrdersModule, CartModule, LecturesModule],
  controllers: [],
  providers: [CloudinaryProvider],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(currentUserMiddleware)
      .forRoutes({path:'*',method:RequestMethod.ALL});
  }
}
