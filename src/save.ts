import { PathLike } from "fs";
import { writeFile } from "fs/promises";

export default async function save(path: PathLike, data: string) {
    await writeFile(path, data, { encoding: "utf-8" });
}
