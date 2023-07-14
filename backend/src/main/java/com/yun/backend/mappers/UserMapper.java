package com.yun.backend.mappers;

import com.yun.backend.dtos.SignUpDto;
import com.yun.backend.dtos.UserDto;
import com.yun.backend.entites.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}
