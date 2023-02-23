import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { PrismaService } from "./prisma/prisma.service"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  const config = new DocumentBuilder()
    .setTitle("Book Store")
    .setDescription("bookStore API ")
    .setVersion("1.0")
    .addTag("books")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)
  await app.listen(3000, () => {
    console.log(`App Starting to port : ${3000}`)
  })
}

bootstrap()
