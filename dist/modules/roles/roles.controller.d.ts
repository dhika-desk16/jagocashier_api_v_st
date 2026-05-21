import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
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
    findOne(id: string): string;
    update(id: string, updateRoleDto: UpdateRoleDto): string;
    remove(id: string): string;
}
