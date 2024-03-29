import * as pageUtils from './utils.js';

const specifiedDriveLetter = (window.localStorage.getItem('specifiedDriveLetter')) ? window.localStorage.getItem('specifiedDriveLetter') + ':\\' : 'X:';

const watchDBFile = (fileName) => {
    window.api.watchFile(fileName, specifiedDriveLetter);

    window.api.onFileChange((path) => {
        const fileName = path.split('.')[0];
        getDBFileAddToLocal(fileName);
        console.log('file changed', path, fileName);
    });
}

const populatePageWithSessionStorage = (dataName) => {
    const sessionData = window.sessionStorage;
    const projects= sessionData.getItem(dataName);
    const cardList = document.createElement('div');
    const cardListId = 'cardList';
    const JSONprojects = JSON.parse(projects);

    cardList.setAttribute('id', cardListId);

    for(let each in JSONprojects) {
        const card = pageUtils.makeCard(JSONprojects[each]);

        cardList.appendChild(card);
    }

    return cardList;
}

export { watchDBFile, populatePageWithSessionStorage }