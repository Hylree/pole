import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreatePoleDto {

  @IsString()
  @IsNotEmpty()
  public codePostal: string;

  @IsString()
  @IsNotEmpty()
  public ville: string;
}