import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateShippingDto {
  @ApiProperty({ example: "Giao hang nhanh" })
  @IsString()
  name: string;

  @ApiProperty({
    example: {
      "district": "Huyện Mèo Vạc",
      "wards": "Xã Pải Lủng",
      "city": "Tỉnh Hà Giang",
      "address": "123 Đường"
    }
  })
  address?: Object;

  @ApiProperty({ example: 4465465465 })
  phone?: number;

  @ApiProperty({ example: "Test@gmail.com" })
  @IsString()
  email?: string;
}
