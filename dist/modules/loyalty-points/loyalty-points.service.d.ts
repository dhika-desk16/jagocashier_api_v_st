import { CreateLoyaltyPointDto } from './dto/create-loyalty-point.dto';
import { UpdateLoyaltyPointDto } from './dto/update-loyalty-point.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class LoyaltyPointsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createLoyaltyPointDto: CreateLoyaltyPointDto): string;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        customerId: string;
        balance: number;
        lifetimePoints: number;
        lastEarned: Date | null;
        lastRedeemed: Date | null;
    }[]>>;
    findOne(id: number): string;
    update(id: number, updateLoyaltyPointDto: UpdateLoyaltyPointDto): string;
    remove(id: number): string;
}
