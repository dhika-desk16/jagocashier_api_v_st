type CodePrefix = 'STR' | 'PRD' | 'TRX' | 'CUST' | 'ORD' | 'INV' | 'TRF';
export declare class generateCode {
    private readonly prefix;
    constructor(prefix: CodePrefix);
    generate(): string;
    short(): string;
    long(): string;
    tag(value: string): string;
    private today;
    private random;
    private sanitize;
    private compose;
}
export {};
