async function getUsers() {
    let url = 'https://api.binance.com/api/v3/ticker/24hr';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
let data = getUsers()
console.log(data)
async function renderUsers() {
    let datas = await getUsers();
    console.log(datas);
    let html = '';
    let segment = `<div>${datas[0].symbol}</div>`;
    html += segment;

    let container = document.querySelector('body');
    container.innerHTML = html

}

renderUsers();


