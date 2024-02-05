export function splitSizedArray<T>(arr: T[], size: number) {
    const result: T[][] = [];

    for (let index=0; index < arr.length; index += size) {
        result.push(arr.slice(index, index + size));
    }

    return result;
}
