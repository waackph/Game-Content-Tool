// ***
// General helper methods. For now it only contains a function to 
// generate a random number between 1 and 10000 to be used as an ID for a newly created object.
// ***

export function createRandomId() {
    const randId = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
    return randId;
}
