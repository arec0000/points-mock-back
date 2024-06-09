import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getMany(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async get({ id, userId }: { id: string; userId: number }) {
    return this.prisma.task.findUnique({ where: { id, userId } });
  }

  async create(data: { id: string; userId: number; file?: string }) {
    return this.prisma.task.create({ data });
  }

  async update({ id, file }: { id: string; file: string }) {
    return this.prisma.task.update({
      where: { id },
      data: { file },
    });
  }
}
