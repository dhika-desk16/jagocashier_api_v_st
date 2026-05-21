import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoresController {
    private readonly storesService;
    constructor(storesService: StoresService);
    create(createStoreDto: CreateStoreDto): Promise<import("../../common/dto/response.dto").ResponseDto<{
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
    findOne(id: string): string;
    update(id: string, updateStoreDto: UpdateStoreDto): string;
    remove(id: string): string;
}
