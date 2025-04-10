import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class UserDtoPersonal {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  username: string;
  
  @Exclude()
  password: string;

  @IsInt()
  group_id: number;
  
  @IsInt()
  place_id: number;

  createdAt: Date;
  updatedAt: Date;
}