const noteInput = document.getElementById('noteInput');
const titleInput = document.getElementById('titleInput');
const addBtn = document.getElementById('addBtn');
const notesCon = document.getElementById('notesCon');
const categoryInput = document.getElementById('categoryInput');

let notes = [];

const savedNotes = localStorage.getItem('notes');                
if (savedNotes) {
  notes = JSON.parse(savedNotes);
}

renderNotes();                           

function addNote() {
  const text = noteInput.value.trim();
  const title = titleInput.value.trim();
  const date = parseDate();

  if (text !== '' && title !== '') {
    notes.push({
      title: title,
      text: text,
      date: date,
      category: categoryInput.value
    });
    noteInput.value = '';    
    titleInput.value = '';                                       
    renderNotes();          
  }
}
  
function renderNotes() {
  notesCon.innerHTML = '';

  for (let i = 0; i < notes.length; i++) {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';

    const noteText = document.createElement('span');
    noteText.textContent = notes[i].category + ' | ' + notes[i].title + ': ' + notes[i].text + ' (' + notes[i].date + ')';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', function () {
      notes.splice(i, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      renderNotes();
    });

    const archiveBtn = document.createElement('button');
    archiveBtn.textContent = 'Архивировать';                                    
    archiveBtn.addEventListener('click', function () {
      const parent = this.parentNode;
      parent.style.opacity = '0.5';
      parent.querySelector('span').style.textDecoration = 'line-through';
    });                                                                                                       

    noteDiv.appendChild(archiveBtn);                                      
    noteDiv.appendChild(noteText);
    noteDiv.appendChild(deleteBtn);
    notesCon.appendChild(noteDiv);
  } 
}

addBtn.addEventListener('click', addNote);

function parseDate(){
    const date = new Date();
    const ht = date.getHours();
    const mt = date.getMinutes();

    return `${ht}:${mt}`;
}
