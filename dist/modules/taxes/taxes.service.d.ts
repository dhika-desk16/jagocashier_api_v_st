import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
export declare class TaxesService {
    create(createTaxDto: CreateTaxDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTaxDto: UpdateTaxDto): string;
    remove(id: number): string;
}
