import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async getById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: { email: string; name?: string; avatar?: string }) {
    const users = await this.getUsers();

    return this.prisma.user.create({
      data: {
        id: users.length + 1,
        ...data,
      },
    });
  }

  async updateAvatar({ id, avatar }: { id: number; avatar: string }) {
    return this.prisma.user.update({
      where: { id },
      data: { avatar },
    });
  }

  async update({
    id,
    name,
    email,
  }: {
    id: number;
    email: string;
    name: string;
  }) {
    return this.prisma.user.update({
      where: { id },
      data: { name, email },
    });
  }
}
