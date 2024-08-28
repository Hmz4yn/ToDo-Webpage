document.addEventListener('DOMContentLoaded', function () {

    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('title');
    const popupDescription = document.getElementById('description');

    const editPopup = document.getElementById('editPopup');
    const editPopupTitle = document.getElementById('editTitle');
    const editPopupDescription = document.getElementById('editDescription');
    const editId = document.getElementById('editId');

    const notification = document.createElement('div'); 
    let count = 0;
    let currentEditingRow = null;



    notification.style.display = 'none'; 
    notification.style.color = 'red';
    notification.style.marginTop = '10px';
    popup.querySelector('.card-body').appendChild(notification); 

    
    function showPopup(type) {
        if (type === "add") {
            popup.style.display = 'block';
            popupTitle.value = "";
            popupDescription.value = "";

        }
        else if (type === "edit") {
            editPopup.style.display = 'block';

        }
    }

    
    function closePopup(type) {
        if (type === "add") {
            popup.style.display = 'none';
            notification.style.display = 'none'; 
        }
        else if (type === "edit") {
            editPopup.style.display = 'none';
        }
    }


    document.getElementById('search-bar').addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const tasks = document.querySelectorAll('.task-row'); 

        tasks.forEach(task => {
            const taskName = task.querySelector('.title').textContent.toLowerCase();

            
            if (taskName.includes(query)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    });

    document.addEventListener('click', function (event) {
        
        if(event.target.matches('#addTask')){
            
            showPopup("add");
        }

        if (event.target.matches('#addSaveBtn')) {

            event.preventDefault();
            let taskName = popupTitle.value.toLowerCase();
            let description = popupDescription.value.toLowerCase();
            let newDate = new Date();
            
            const tasks = document.querySelectorAll('.task-row');
            let duplicateFound = false;
            
            if(taskName.length === 0 || description.length === 0)
            {
                return;

            }
            tasks.forEach(task => {

                const existingTaskName = task.querySelector('.title').textContent.toLowerCase();

                if (existingTaskName === taskName) {

                    duplicateFound = true;

                }

            });

            if (duplicateFound) {

                notification.textContent = 'Title already exists!';
                notification.style.display = 'block';

            }
            else {

                count++;
                const rowDiv = document.createElement('div');
                rowDiv.classList.add('row', 'task-row', 'mt-2'); 
                rowDiv.dataset.id = count;

                function createColumn(content, colClass, className, isCentered = true) {
                    const column = document.createElement('div');
                    column.classList.add(colClass);
                    if (className) column.classList.add(className);
                    column.style.textAlign = isCentered ? 'center' : 'left';
                    column.style.color = 'white';
                    column.textContent = content;
                    return column;
                }

                
                const serialNumber = createColumn(count, 'col-sm-2', 'serialNumber');
                const taskNameElement = createColumn(taskName, 'col-sm-3', 'title');
                const descriptionElement = createColumn(description, 'col-sm-3', 'description');
                const dateTime = createColumn(newDate.toLocaleString(), 'col-sm-2');
                dateTime.style.fontSize = '15px';

                const actionColumn = document.createElement('div');
                actionColumn.classList.add('col-sm-2', 'd-flex', 'justify-content-center', 'align-items-center', 'mb-3'); // Center buttons
                actionColumn.style.textAlign = 'center';

                const dBtn = document.createElement('button');
                dBtn.classList.add('delBtn');
                dBtn.innerText = 'Delete';

                const eBtn = document.createElement('button');
                eBtn.classList.add('edtBtn');
                eBtn.innerText = 'Edit';

                actionColumn.appendChild(eBtn);
                actionColumn.appendChild(dBtn);

                rowDiv.appendChild(serialNumber);
                rowDiv.appendChild(taskNameElement);
                rowDiv.appendChild(descriptionElement);
                rowDiv.appendChild(dateTime);
                rowDiv.appendChild(actionColumn);

                const container = document.querySelector('.container');
                container.appendChild(rowDiv);


                
                closePopup("add");

                taskName = " ";
                description = " ";

            }
        }

        if (event.target.matches('.delBtn')) {

            const rowDiv = event.target.closest(".row");
            
            const nextRows = rowDiv.nextElementSibling;
            let siblingRow = nextRows;
            let currentSerial = parseInt(rowDiv.dataset.id);
            console
            while (siblingRow) {
                const serialCol = siblingRow.querySelector('.serialNumber');
                serialCol.textContent = currentSerial++;
                siblingRow = siblingRow.nextElementSibling;
            }
            
            rowDiv.remove();
            count--;
        }

        if (event.target.matches(".edtBtn")) {
            event.preventDefault();

            const row = event.target.closest(".row");

            const title = row.querySelector('.title');
            const description = row.querySelector('.description');

            editPopupTitle.value = title.textContent;
            editPopupDescription.value = description.textContent;
            editId.value = row.dataset.id;

            showPopup("edit");

        }

        if (event.target.matches("#editSaveBtn")) {
            event.preventDefault();

            const row = document.querySelector(`[data-id="${editId.value}"]`);

            const title = row.querySelector('.title');
            const description = row.querySelector('.description');
            title.textContent = editPopupTitle.value;
            description.textContent = editPopupDescription.value;

            closePopup('edit');
        }

        if (event.target.matches("#editCloseBtn")) {
            event.preventDefault();
            closePopup('edit');
        }

        if (event.target.matches("#removeAllTask")) {
            document.querySelectorAll('.task-row').forEach(row => row.remove());
            count = 0;
        }

        if (event.target.matches("#addCloseBtn")) {
            event.preventDefault();
            closePopup('add');
        }
        
    })

})