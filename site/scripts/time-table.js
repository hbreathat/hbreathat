// grab the table
const table = document.querySelector('#time-table');
const timeTable = [
    {'semester': '25W', 'code':'CSD-228', 'name':'Mobile Applications', 'hours':4},
    {'semester': '25W', 'code':'CSD-112', 'name':'Intro to Web Development', 'hours':4},
    {'semester': '25S', 'code':'CSD-112', 'name':'Intro to Web Development', 'hours':4},
];

function getTotalHours(timeTable) {
    let hours = 0;
    for (let entry of timeTable) {
        hours += entry.hours;
    }
    return hours;
}

const caption = document.createElement('caption');
caption.appendChild(document.createTextNode('My Teaching schedule'));

table.appendChild(caption);


const tableHeader = document.createElement('thead');
const thR1 = document.createElement('tr');
const tableTitle = document.createElement('th');
tableTitle.appendChild(document.createTextNode('Courses'));
tableTitle.setAttribute('colspan', '12');
thR1.appendChild(tableTitle)

function createTableHeaderSubHeader({parent, title, colSpan = 1}) {
    const subHeader = document.createElement('th');
    subHeader.appendChild(document.createTextNode(title));
    if (colSpan && colSpan > 1) {
        subHeader.setAttribute('colspan', `${colSpan}`);
    }

    parent.appendChild(subHeader);
}

const thR2 = document.createElement('tr');

const subHeaders = [{
    title: 'Semester',
}, {title: 'Code'}, {title: 'Name', colspan:10,}, {title: 'Hours/Week'}];
for (let subHeader of subHeaders) {
    createTableHeaderSubHeader({
        parent: thR2,
        title: subHeader.title,
        colSpan: subHeader.colspan,
    });
}
tableHeader.appendChild(thR1)
tableHeader.appendChild(thR2)

const tableBody = document.createElement('tbody');
function createTableBodyRow({parent, semester, code, name, hours, includeSemester = false}) {
    // <tr>
    //     <td rowSpan="2">25W</td>
    //     <td>CSD-228</td>
    //     <td>Mobile Applications</td>
    //     <td>4</td>
    // </tr>
    const row = document.createElement('tr');
    if (includeSemester) {
        const semesterNode = document.createElement('th');
        semesterNode.setAttribute('rowspan', '2');
        semesterNode.appendChild(document.createTextNode(semester));
        row.appendChild(semesterNode);
    }

    const codeNode = document.createElement('td');
    codeNode.appendChild(document.createTextNode(code))

    row.appendChild(codeNode);
    const nameNode = document.createElement('td');
    nameNode.appendChild(document.createTextNode(name))
    nameNode.setAttribute('colspan', '10');

    row.appendChild(nameNode);

    const hoursNode = document.createElement('td');
    hoursNode.appendChild(document.createTextNode(hours))

    row.appendChild(hoursNode);

    parent.appendChild(row);
}

const winter = timeTable.filter((c) => c.semester === '25W')
for (let courseIdx = 0; courseIdx < winter.length; courseIdx++) {
    createTableBodyRow({parent: tableBody, includeSemester: courseIdx === 0,...winter[courseIdx]});
}

const spring = timeTable.filter((c) => c.semester === '25S');
for (let courseIdx = 0; courseIdx < spring.length; courseIdx++) {
    createTableBodyRow({parent: tableBody, includeSemester: courseIdx === 0, ...spring[courseIdx]});
}

const tableFooter = document.createElement('tfoot');
const tFootLabel = document.createElement('th');
tFootLabel.appendChild(document.createTextNode('Total Hours'));
tFootLabel.setAttribute('colspan', '10')
const tFRow = document.createElement('tr');
tFRow.appendChild(tFootLabel);
const totalHours = document.createElement('td');
totalHours.appendChild(document.createTextNode(`${getTotalHours(timeTable)}`))
tFRow.appendChild(totalHours);
tableFooter.appendChild(tFRow);
table.appendChild(tableHeader);
table.appendChild(tableBody);
table.appendChild(tableFooter);
