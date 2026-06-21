const UNITS = ['B', 'KB', 'MB', 'GB'];

export const formatSize = (bytes: number): string => {
    let value = bytes;
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < UNITS.length - 1) {
        value /= 1024;
        unitIndex++;
    }

    const formatted = unitIndex === 0 ? value.toString() : value.toFixed(1);
    return `${formatted} ${UNITS[unitIndex]}`;
};
