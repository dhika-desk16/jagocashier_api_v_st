import { randomBytes } from 'crypto';

type CodePrefix = 'STR' | 'PRD' | 'TRX' | 'CUST' | 'ORD' | 'INV' | 'TRF';

export class generateCode {
  constructor(private readonly prefix: CodePrefix) {}

  /** PREFIX-YYYYMMDD-XXXX */
  generate(): string {
    return this.compose(this.prefix, this.today(), this.random(2));
  }

  /** PREFIX-XXXX */
  short(): string {
    return this.compose(this.prefix, this.random(2));
  }

  /** PREFIX-YYYYMMDD-XXXXXX */
  long(): string {
    return this.compose(this.prefix, this.today(), this.random(3));
  }

  /** PREFIX-YYYYMMDD-TAG-XXXX */
  tag(value: string): string {
    return this.compose(
      this.prefix,
      this.today(),
      this.sanitize(value),
      this.random(2),
    );
  }

  // =========================
  // INTERNAL
  // =========================

  private today(): string {
    return new Date().toISOString().slice(0, 10).replace(/-/g, '');
  }

  private random(bytes: number): string {
    return randomBytes(bytes).toString('hex').toUpperCase();
  }

  private sanitize(value: string): string {
    return value
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');
  }

  private compose(...parts: string[]): string {
    return parts.join('-');
  }
}
