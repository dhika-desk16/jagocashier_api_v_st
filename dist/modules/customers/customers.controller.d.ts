import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(createCustomerDto: CreateCustomerDto): string;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        address: string | null;
        phone: string;
        email: string;
        isActive: boolean;
        code: string;
        fullName: string;
        birthDate: Date | null;
        gender: string | null;
        registeredAt: Date;
        lastVisit: Date | null;
    }[]>>;
    findOne(id: string): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        address: string | null;
        phone: string;
        email: string;
        isActive: boolean;
        code: string;
        fullName: string;
        birthDate: Date | null;
        gender: string | null;
        registeredAt: Date;
        lastVisit: Date | null;
    } | null>>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        address: string | null;
        phone: string;
        email: string;
        isActive: boolean;
        code: string;
        fullName: string;
        birthDate: Date | null;
        gender: string | null;
        registeredAt: Date;
        lastVisit: Date | null;
    }>>;
    remove(id: string): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        address: string | null;
        phone: string;
        email: string;
        isActive: boolean;
        code: string;
        fullName: string;
        birthDate: Date | null;
        gender: string | null;
        registeredAt: Date;
        lastVisit: Date | null;
    }>>;
}
