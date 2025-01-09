
export function sortOrders({ data, key, order }) {
    const result = data.sort((a, b) => {
        if (order === 1) {
            return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
        } else if (order === -1) {
            return a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0;
        }
        return 0; 
    });
    return result;
}
