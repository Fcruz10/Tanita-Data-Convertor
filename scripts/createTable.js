import { fileReader } from './fileReaderConverter.js';
import { csvToArray } from './fileReaderConverter.js';
import { formatDate } from './formatDate.js';

export async function createTable() {
    const inputString = document.getElementById('inputString').value;
    const csvFile = document.getElementById("csvFile");
    const input = csvFile.files[0];
    let data = {};

    //check if file or string upload
    if(inputString === '') {
        try {
            data = await fileReader(input);
        }
        catch (error) {
            alert('\u26A0 Error:\n\nEnter a valid string or file! ', error);
            return;
        }
    }
    else {
        data = csvToArray(inputString);
    }

    //delete part of info not important
    data = data.slice(12, -2);
    console.log("obj: " + data + "->" + typeof(data));

    const indexOfBt = data.indexOf('Bt');
    data.splice(indexOfBt, 2);

    //delete "" from time string
    data[data.indexOf('DT') + 1] = formatDate(data[data.indexOf('DT') + 1]);
    data[data.indexOf('Ti') + 1] = formatDate(data[data.indexOf('Ti') + 1]);

    //convert gender number to string
    const gender = parseInt(data[data.indexOf('GE') + 1]);

    switch (gender) {
        case 1:
            data[data.indexOf('GE') + 1] = "Male";
            break;

        case 2:
            data[data.indexOf('GE') + 1] = "Female";
            break;
    
        default:
            console.log("Option not valid!")
            break;
    }

    //convert acticity to String
    const acticity = parseInt(data[data.indexOf('AL') + 1]);

    switch (acticity) {
        case 1:
            data[data.indexOf('AL') + 1] = "Sedentary";
            break;

        case 2:
            data[data.indexOf('AL') + 1] = "Active";
            break;

        case 3:
            data[data.indexOf('AL') + 1] = "Athlete";
            break;
        default:
            console.log("Option not valid!")
            break;
    }

    //cypher for translate symbols
    const cypher = {
        //"0": "Unknown: 16",
        "~0": "Length unit",
        "~1": "Mass unit",
        "~2": "Unknown: 4",
        "~3": "Unknown: 3",
        "Bt": "Unknown: 2",
        "Wk": "Body mass",
        "MI": "Body mass index (BMI)",
        "MO": "Model",
        "DT": "Measurement Date",
        "Ti": "Measurement Time",
        "GE": "Gender",
        "AG": "Age",
        "Hm": "Height",
        "AL": "Activity Level",
        "FW": "Global fat %",
        "Fr": "Arm fat (right) %",
        "Fl": "Arm fat (left) %",
        "FR": "Leg fat (right) %",
        "FL": "Leg fat (left) %",
        "FT": "Torso fat %",
        "mW": "Global muscle %",
        "mr": "Arm muscle (right) %",
        "ml": "Arm muscle (left) %",
        "mR": "Leg muscle (right)%",
        "mL": "Leg muscle (left) %",
        "mT": "Torso muscle %",
        "bW": "Estimated bone mass",
        "IF": "Visceral fat rating",
        "rA": "Estimated metabolic age",
        "rD": "Daily calorie intake (DCI)",
        "ww": "Global body water %",
        "CS": "Unknown: BC, this does change per entry",
    }

    let tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = ''; // clear previous content of the table
    
    //not mandatory because alert will come from fileReader
    if (inputString.trim() === '' && input === '') {
        alert('Por favor, digite uma string válida ou insira um ficheiro válido.');
        return;
    }

    //  {0,16,~0,2,~1,2,~2,3,~3,4,MO,"BC-601",DT,"07/02/2024",Ti,"12:32:26",Bt,0,GE,2,AG,23,Hm,166.0,AL,1,Wk,57.2,MI,20.8,FW,28.4,Fr,16.5,Fl,30.8,FR,32.5,FL,30.9,FT,27.0,mW,38.9,mr,2.2,ml,1.7,mR,6.7,mL,6.7,mT,21.6,bW,2.1,IF,1,rD,2001,rA,22,ww,52.9,CS,A4

    //create table for HTML
    const table = document.createElement('table');
    const header = table.createTHead();
    const headerLine = header.insertRow();
    const headerCell1 = headerLine.insertCell();
    headerCell1.innerHTML = '<strong>Dados</strong>';
    const headerCell2 = headerLine.insertCell();
    headerCell2.innerHTML = '<strong>Valor</strong>';

    var tableBody = table.createTBody();

    for (let i = 0; i < data.length; i += 2) {
        const linha = tableBody.insertRow();
        const cellData = linha.insertCell();
        const cellValue = linha.insertCell();
        
        cellData.textContent = cypher[data[i]];
        cellValue.textContent = data[i + 1];
    }

    tableContainer.appendChild(table);
}