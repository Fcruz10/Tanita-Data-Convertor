export async function fileReader(input) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
    
        reader.readAsText(input);

        reader.onload = (event) => {
            const content = event.target.result;
            const data = csvToArray(content);
            resolve(data);
        };

        reader.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

//convert input string to Array
export function csvToArray(stringVal) {
    const arr = stringVal.split(',');
    return arr
}