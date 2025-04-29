import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './ticket/infrastructure/database/datasource';
import * as bodyParser  from 'body-parser'
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json())

  await AppDataSource.initialize()

  .then(() => {
    console.log('✅ Database connected successfully');
  })

  .catch((error) => {
    console.error('❌ Database connection failed:', error);
  });


  app.connectMicroservice<MicroserviceOptions>({
    transport:Transport.RMQ,
    options:{
      urls:['amqp://localhost:5672'],
      queue:'ticket_queue',
      queueOptions:{
        durable:true
      }
    }
  });

  // Add a log to confirm microservice setup
  console.log('Microservice connected to ticket_queue');

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
