export default function removeDuplicatedSpace(str: string) {
    return str.replace(/\s+/g,' ').trim();
}
