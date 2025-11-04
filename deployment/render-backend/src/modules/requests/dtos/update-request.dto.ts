import { IsOptional, IsString, IsEnum } from "class-validator";
import { RequestStatus, Priority } from "@prisma/client";

export class UpdateRequestDto {
  @IsOptional()
  @IsString()
  subjectName?: string;

  @IsOptional()
  @IsString()
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
  @IsEnum(RequestStatus)
  status?: RequestStatus;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;
}
