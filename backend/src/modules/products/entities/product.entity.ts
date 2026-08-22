export class ProductEntity {
  id!: string;
  slug!: string;
  name!: string;
  brand!: string;
  sku!: string | null;
  shortDescription!: string;
  description!: string;
  category!: string;
  priceFrom!: number | null;
  inStock!: boolean;
  featured!: boolean;
  imageUrl!: string;
  specs!: Record<string, string> | null;
}
