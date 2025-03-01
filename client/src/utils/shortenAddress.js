export function shortenAddress(address, chars = 4) {
    if (!address || address.length < 2 * chars + 2) return address;
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
