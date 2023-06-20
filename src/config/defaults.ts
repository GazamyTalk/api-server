import { assertValue } from "./helpers";

export const defaultImagePaths = {
    user: process.env.DEFAULT_USER_IMAGE_PATH!,
    room: process.env.DEFAULT_ROOM_IMAGE_PATH!,
}
assertValue(defaultImagePaths, "defaultImagePaths");

export const defaultNames = {
    roomname: process.env.DEFAULT_ROOM_NAME ?? "Gazamy Room",
}
assertValue(defaultNames, "defaultNames");

export const defaultServerConfig = {
    usernameMaxLength: Number.parseInt(process.env.DEFAULT_USERNAME_MAX_LENGTH!),
}
assertValue(defaultServerConfig, "defaultServerConfig", [ undefined, NaN ]);
