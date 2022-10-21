
export function createRandomId() {
    const randId = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
    return randId;
}
