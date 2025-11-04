import { IsString, IsNotEmpty, IsEmail, IsOptional, IsEnum, IsPhoneNumber } from "class-validator";
import { RequestType, Priority } from "@prisma/client";

export class CreateRequestDto {
  @IsEnum(RequestType)
  @IsNotEmpty()
  type!: RequestType;

  @IsString()
  @IsNotEmpty()
  requesterId!: string;

  @IsOptional()
  @IsString()
  clientOrgId?: string;

  @IsString()
  @IsNotEmpty()
  subjectName!: string;

  @IsOptional()
  @IsPhoneNumber()
  subjectPhone?: string;

  @IsOptional()
  @IsString()
  subjectAddress?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  pincode?: string;

  @IsOptional()
  @IsString()
  loanRefNo?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;
}
