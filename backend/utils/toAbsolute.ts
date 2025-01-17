import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const toAbsolute = (p: string) => path.resolve(__dirname, "..", p);

export const usersDir = toAbsolute("publish/users")
