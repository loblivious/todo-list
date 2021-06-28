
let allOnList = [];
const addButton = document.querySelector('#btn-add');
const list = document.querySelector('.list');
const tabs = document.querySelector('.tabs');
const tabLinks = document.querySelectorAll('.tab-link');
const todoCounts = document.querySelector('.todo-counts');
const clearAllDones = document.querySelector('.clearAllDones');

todoCounts.innerHTML = `${allOnList.filter(item => item.status == 'todo').length} 個待完成項目`;

clearAllDones.addEventListener('click', function (e) {
    allOnList = allOnList.filter(item => item.status == 'todo');
    renderData();
});

tabs.addEventListener('click', function (e) {
    let tabName = e.target.textContent;
    removeActive();
    e.target.classList.add('active')
    if (tabName == '全部') {
        renderData();
    } else if (tabName == '待完成') {
        renderTodoData();
    } else {
        renderDoneData();
    }
});

addButton.addEventListener('click', function (e) {
    const todoInput = document.querySelector('.add-todo');
    if (todoInput.value == '') {
        alert('請輸入內容');
        return;
    }
    allOnList.push({ status: 'todo', content: todoInput.value });
    todoInput.value = '';
    removeActive();
    tabLinks[0].classList.add('active');
    renderData();
});

function removeActive() {
    tabLinks.forEach(function (item) {
        item.classList.remove('active');
    });
}

function renderData() {
    let str = '';
    allOnList.forEach(function (item, index) {
        if (item.status == 'todo') {
            str += `<li class="d-flex align-items-center show-x-when-hover">
            <input data-id="checkbox" type="checkbox" class="checkbox m-0" data-index="${index}"><label class="mx-3 ls-1 w-392 bb-gray py-3">${item.content}</label><button class="bg-white b-0 m-0 p-0 wh-3 hover-pointer" data-index="${index}"><img data-id="cancel" src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="cancel"></button></li>`;
        } else {
            str += `<li class="d-flex align-items-center show-x-when-hover"><span class="text-yellow wh-20">&#10004;</span><del class="mx-3 ls-2 w-392 bb-gray py-3 text-lightgray">${item.content}</del><button class="bg-white b-0 m-0 p-0 wh-3 hover-pointer" data-index="${index}"><img data-id="cancel" src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="cancel"></button></li>`;
        }

    })
    list.innerHTML = str;
    todoCounts.innerHTML = `${allOnList.filter(item => item.status == 'todo').length} 個待完成項目`;
};

function renderTodoData() {
    let str = '';
    allOnList.forEach(function (item, index) {
        if (item.status == 'todo') {
            str += `<li class="d-flex align-items-center show-x-when-hover"><input data-id="checkbox" type="checkbox" class="checkbox m-0" data-index="${index}"><label class="mx-3 ls-1 w-392 bb-gray py-3">${item.content}</label><button class="bg-white b-0 m-0 p-0 wh-3 hover-pointer" data-index="${index}"><img data-id="cancel" src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="cancel"></button></li>`;
        }
    });
    list.innerHTML = str;
};

function renderDoneData() {
    let str = '';
    allOnList.forEach(function (item, index) {
        if (item.status == 'done') {
            str += `<li class="d-flex align-items-center show-x-when-hover"><span class="text-yellow wh-20">&#10004;</span><del class="mx-3 ls-2 w-392 bb-gray py-3 text-lightgray">${item.content}</del><button class="bg-white b-0 m-0 p-0 wh-3 hover-pointer" data-index="${index}"><img data-id="cancel" src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="cancel"></button></li>`;
        }
    });
    list.innerHTML = str;
};

document.addEventListener('click', function(e) {
    console.log(e.target);
    if (e.target && e.target.getAttribute("data-id") == 'checkbox') {
        allOnList[e.target.getAttribute("data-index")].status = 'done';
        renderData();
    } else if (e.target && e.target.getAttribute("data-id") == 'cancel') {
        allOnList.splice(e.target.getAttribute("data-index"), 1);
        renderData();
    }
});