export function lcFirst(str?: string | null) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}