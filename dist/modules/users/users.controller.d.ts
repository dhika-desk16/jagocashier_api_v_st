import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        phone: string;
        email: string;
        isActive: boolean;
        fullName: string;
        username: string;
        password: string;
        roleId: number;
        storeId: number | null;
    }>>;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<({
        role: {
            name: string;
            description: string;
            permissions: import("generated/prisma/runtime/library").JsonValue;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        store: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            address: string;
            city: string;
            phone: string;
            email: string;
            isActive: boolean;
            code: string;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        phone: string;
        email: string;
        isActive: boolean;
        fullName: string;
        username: string;
        password: string;
        roleId: number;
        storeId: number | null;
    })[]>>;
    findOne(id: string): Promise<import("../../common/dto/response.dto").ResponseDto<({
        role: {
            name: string;
            description: string;
            permissions: import("generated/prisma/runtime/library").JsonValue;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        store: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            address: string;
            city: string;
            phone: string;
            email: string;
            isActive: boolean;
            code: string;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        phone: string;
        email: string;
        isActive: boolean;
        fullName: string;
        username: string;
        password: string;
        roleId: number;
        storeId: number | null;
    }) | null>>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
