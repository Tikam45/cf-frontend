
export function filterContents ({data, key, value}) {
    console.log("filtering", data, key, value);
    const resultantData = data.filter((d) => d.key === value);
    return resultantData;
}