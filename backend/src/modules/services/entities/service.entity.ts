export class ServiceEntity {
  id!: string;
  slug!: string;
  name!: string;
  shortDescription!: string;
  description!: string;
  durationMin!: number | null;
  priceFrom!: number | null;
  category!: string;
  featured!: boolean;
  imageUrl!: string;
  includes!: string[];
}
