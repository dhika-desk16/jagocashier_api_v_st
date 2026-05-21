import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class StoresService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateStoreDto): Promise<import("../../common/dto/response.dto").ResponseDto<{
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
    }>>;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
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
    }[]>>;
    findOne(id: number): string;
    update(id: number, updateStoreDto: UpdateStoreDto): string;
    remove(id: number): string;
}
