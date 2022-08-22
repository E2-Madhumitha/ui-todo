const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const studentName = document.querySelector('#studentName')
const studentAge = document.querySelector('#studentAge')
const btn = document.querySelector('#btn')

let items
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')
  id=undefined;

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    
    studentName.value = items[index].studentName
    studentAge.value = items[index].studentAge
    
    id = index
    initEdit();
  } else {
    studentName.value = ''
    studentAge.value = ''
   
  }
  
}
function initEdit(){

  items = getItemsBD()
  tbody.innerHTML = ''
  items.forEach((item, index) => {
    insertItem(item, index)
  })
  
}

function closeModal ()  {
  
  modal.classList.remove('active')
}


function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
 
  items.splice(index, 1)
 
  setItemsBD()
  loadItems()
  closedDltForm();
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.studentName}</td>
    <td>${item.studentAge}</td>
   
    <td class="functions">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="functions">
      <button onclick="dltForm(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btn.onclick = e => {
  
  if (studentName.value == '' || studentAge.value == '' ) {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    items[id].studentName = studentName.value
    items[id].studentAge = studentAge.value
   
  } else {
    items.push({'studentName': studentName.value, 'studentAge': studentAge.value})
  }

  setItemsBD()

  modal.classList.remove('active')
  loadItems()
  id = undefined
}

function loadItems() {
  items = getItemsBD()
  tbody.innerHTML = ''
  items.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItemsBD = () => JSON.parse(localStorage.getItem('details')) ?? []
const setItemsBD = () => localStorage.setItem('details', JSON.stringify(items))

loadItems()


document.getElementById('modalClose')
    .addEventListener('click', closeModal)

    function errorMessage(){

      var sname = document.getElementById("error")
      if ((document.getElementById("studentName").value==""))
      {
          sname.textContent = "Please enter password"
          
        
      }
      else {
          sname.textContent = ""
      } 
  
  }
  
  function errorMsg(){
  
      var sage = document.getElementById("error1")
      if ((document.getElementById("studentAge").value==""))
      {
          sage.textContent = "Please enter password"
         
        
      }
      else {
          sage.textContent = ""
      } 
  
  }



  function dltForm(index) {

    document.getElementById('id01').style.display = 'block';
    var d=index;
    const m = document.getElementById('check');
    m.innerHTML='<button onclick="deletepop('+d+');">delete</button>'
}


function deletepop(d){
 
  
  
  items.splice(d, 1);
 
  setItemsBD()
  loadItems()
  closedDltForm();


}
function closedDltForm() {
    document.getElementById('id01').style.display = 'none';
}

