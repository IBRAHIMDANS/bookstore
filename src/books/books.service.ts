import { Injectable } from "@nestjs/common";
import { CreateBookDTO } from "./dto/createBookDTO";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.book.findMany();
  }

  findById(id: number) {
    return this.prisma.book.findUnique({ where: { id: Number(id) } });
  }

  async create(book: CreateBookDTO) {
    return await this.prisma.book.create({ data: book });
  }

  async delete(id: number) {
    return await this.prisma.book.delete({ where: { id: id } });
  }
}
