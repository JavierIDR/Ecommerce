import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from './roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    ) {}
  
  @ApiBearerAuth()  
  @Get() 
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query("page") page: string, @Query("limit") limit: string) {
    !page ? (page = "1") : page;
    !limit ? (limit = "5") : limit;
    if (page && limit) return this.usersService.getUsers(Number(page), Number(limit));
  }
  
  @ApiBearerAuth()
  @Get(":id")
  @UseGuards(AuthGuard)
  getUser(@Param("id", ParseUUIDPipe) id: string) {
    return this.usersService.getUser(id);
  }
  
  @ApiBearerAuth()
  @Put(":id")
  @UseGuards(AuthGuard)
  updateUser(@Param("id", ParseUUIDPipe) id: string, @Body() user: any) {
    return this.usersService.updateUser(id, user);
  }
  
  @ApiBearerAuth()
  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteUser(@Param("id", ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}

