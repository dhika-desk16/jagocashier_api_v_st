import { LoyaltyPointsService } from './loyalty-points.service';
import { CreateLoyaltyPointDto } from './dto/create-loyalty-point.dto';
import { UpdateLoyaltyPointDto } from './dto/update-loyalty-point.dto';
export declare class LoyaltyPointsController {
    private readonly loyaltyPointsService;
    constructor(loyaltyPointsService: LoyaltyPointsService);
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
    findOne(id: string): string;
    update(id: string, updateLoyaltyPointDto: UpdateLoyaltyPointDto): string;
    remove(id: string): string;
}
