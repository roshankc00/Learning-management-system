import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from 'database/db.connection';
import { UserModule } from './features/user/user.module';
import { CoursesModule } from './features/courses/courses.module';
import { SectionsModule } from './features/sections/sections.module';
import { CategoryModule } from './features/category/category.module';
import { OrdersModule } from './features/orders/orders.module';
import { CartModule } from './features/cart/cart.module';
import { LecturesModule } from './features/lectures/lectures.module';
import { CloudinaryProvider } from './config/Cloudinary/providers/clodinary.provider';
import { ReviewsModule } from './features/reviews/reviews.module';
import { currentUserMiddleware } from './core/middlewares/currentUser.middleware';


@Module({
  imports: [TypeOrmModule.forRoot(datasourceOptions), UserModule, CoursesModule, SectionsModule, CategoryModule, OrdersModule, CartModule, LecturesModule, ReviewsModule],
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
