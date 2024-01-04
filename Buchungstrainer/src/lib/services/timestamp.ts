function fromDate(date: Date): number {
    // Code source: https://stackoverflow.com/a/11893157/16747568$
    return Math.floor(date.getTime() / 1000);
}

function toDate(timestamp: number): Date {
    return new Date(timestamp * 1000);
}

const timestamp = {
    fromDate,
    toDate
};

export default timestamp;
