// Function to remove duplicates based on a specified property
export default function removeDuplicates(array, property) {
    return array.filter(
        (obj, index, self) => index === self.findIndex((o) => o[property] === obj[property])
    );
}
