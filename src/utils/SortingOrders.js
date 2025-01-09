
export function sortOrders({data, key, order}) {
    const result = data.sort({key: order});
    return result;
}