import { getPaginationInfo } from '../lib/util';

export const getUserDTO = (user) => ({
  id: user._id,
  username: user.username,
  email:user.email,
  keycloakId:user.keycloakId,
  roles:user.roles,
  idTownAuthorise:user.idTownAuthorise
});

export const getUserResponseDTO = (users, page, limit, count) => ({
  users: users.map(getUserDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getUserByIdResponseDTO = (user) => ({
  data: getUserDTO(user),
});

export const getCreateUserResponseDTO = (user) => ({
  message: "User was registered successfully!",
  id: user._id,
});

export const getDeleteUserResponseDTO = (user) => ({
  message: 'Success delete user',
  id: user._id,
});
export const getDeleteUsersResponseDTO = (users) => ({
  message: 'Success delete users',
});
export const getUpdateUserResponseDTO = (user) => ({
  message: 'Success update user',
  id: user._id,
  username: user.username,
  email:user.email,
  keycloakId:user.keycloakId,
  roles:user.roles,
  idTownAuthorise:user.idTownAuthorise
});
