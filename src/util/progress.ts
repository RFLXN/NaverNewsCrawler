import { SingleBar } from "cli-progress";

export default function initProgress(name: string) {
    return new SingleBar({
        format: `${name} [{bar}] {value}/{total} ({percentage}%)`
    });
}
