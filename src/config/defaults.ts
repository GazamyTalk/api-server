import { assertValue } from "./helpers";

export const defaultImagePaths = {
    user: process.env.DEFAULT_USER_IMAGE_PATH!,
    room: process.env.DEFAULT_ROOM_IMAGE_PATH!,
}
assertValue(defaultImagePaths, "imagePaths");
