import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class RolesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRoleDto: CreateRoleDto): Promise<import("../../common/dto/response.dto").ResponseDto<{
        name: string;
        description: string;
        permissions: import("generated/prisma/runtime/library").JsonValue;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>>;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        name: string;
        description: string;
        permissions: import("generated/prisma/runtime/library").JsonValue;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>>;
    findOne(id: number): string;
    update(id: number, updateRoleDto: UpdateRoleDto): string;
    remove(id: number): string;
}
