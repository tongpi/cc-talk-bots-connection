/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsDate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { IsJSONValue } from "@app/custom-validators";
import { GraphQLJSON } from "graphql-type-json";
import { JsonValue } from "type-fest";
import { OpenApp } from "../../openApp/base/OpenApp";

@ObjectType()
class BotApp {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  apiEndPoint!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  apiSecret!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  appDesc!: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  appName!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
  })
  @IsJSONValue()
  @IsOptional()
  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  inputs!: JsonValue;

  @ApiProperty({
    required: false,
    type: () => OpenApp,
  })
  @ValidateNested()
  @Type(() => OpenApp)
  @IsOptional()
  openApps?: OpenApp | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  welcome!: string | null;
}

export { BotApp as BotApp };
