import { TaxesService } from './taxes.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
export declare class TaxesController {
    private readonly taxesService;
    constructor(taxesService: TaxesService);
    create(createTaxDto: CreateTaxDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTaxDto: UpdateTaxDto): string;
    remove(id: string): string;
}
