import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class CreateQuoteItemDto {
  @IsIn(['SERVICE', 'PRODUCT'])
  kind: 'SERVICE' | 'PRODUCT';

  @ValidateIf((item: CreateQuoteItemDto) => item.kind === 'SERVICE')
  @IsUUID()
  serviceId?: string;

  @ValidateIf((item: CreateQuoteItemDto) => item.kind === 'PRODUCT')
  @IsUUID()
  productId?: string;

  @IsInt()
  @Min(1)
  @Max(24)
  quantity: number;
}

export class CreateQuoteDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  vehicleMake?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  vehicleModel?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1985)
  @Max(new Date().getFullYear() + 1)
  vehicleYear?: number;

  @IsOptional()
  @IsString()
  @MaxLength(800)
  message?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateQuoteItemDto)
  items: CreateQuoteItemDto[];
}
