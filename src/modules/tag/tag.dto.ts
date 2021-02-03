import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from "class-validator";

export class TagDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
