console.log("Script loaded successfully!");

console.log(document.querySelectorAll('.edit-btn'));

    async function openAddModal(type) {
      const addModal = document.getElementById('addModal');
      const response = await fetch(`/admin/${type}/schema`);
      if (!response.ok) {
        alert(`Failed to load schema for ${type}`);
        return;
      }
      const schema = await response.json();
      const fields = schema
        .filter(field => field.name !== 'id')
        .map(
          field =>
            `<label>${field.name} (${field.type}): 
              <input type="text" name="${field.name}" required></label>`
        )
        .join('');
      document.getElementById('addFields').innerHTML = fields;
      addModal.style.display = 'flex';
    }

    async function openEditModal(type, button) {
        console.log('Edit modal triggered for:', type);
      const item = JSON.parse(button.getAttribute('data-item'));
      console.log('Item data:', item);

      const editModal = document.getElementById('editModal');
      const response = await fetch(`/admin/${type}/schema`);
      if (!response.ok) {
        alert(`Failed to load schema for ${type}`);
        return;
      }
      const schema = await response.json();
      const form = document.getElementById('editForm');
      form.action = `/admin/${type}/edit/${item.id}`;
      const fields = schema
        .filter(field => field.name !== 'id')
        .map(
          field =>
            `<label>${field.name} (${field.type}): 
              <input type="text" name="${field.name}" value="${item[field.name] || ''}" required></label>`
        )
        .join('');
      document.getElementById('editFields').innerHTML = fields;
      editModal.style.display = 'flex';
    }

    function confirmDelete(type, button) {
      const item = JSON.parse(button.getAttribute('data-item'));
      const idField = Object.keys(item).find(key => key.includes('id'));
      const id = item[idField];
      const confirmModal = document.getElementById('confirmDeleteModal');
      document.getElementById('deleteMessage').innerText = `Do you really want to delete ${type} with ID ${id}?`;
      document.getElementById('confirmDeleteYes').onclick = function () {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/admin/${type}/delete/${id}`;
        document.body.appendChild(form);
        form.submit();
      };
      confirmModal.style.display = 'flex';
    }

    function closeModal(modalId) {
      document.getElementById(modalId).style.display = 'none';
    }

    document.addEventListener('DOMContentLoaded', function () {
  // Log loaded elements
  console.log('DOM fully loaded and parsed');

  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function () {
      console.log('Edit button clicked');
      openEditModal('<%= type %>', this);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function () {
      console.log('Delete button clicked');
      confirmDelete('<%= type %>', this);
    });
  });

  const addButton = document.querySelector('.add-btn');
  if (addButton) {
    addButton.addEventListener('click', function () {
      console.log('Add button clicked');
      openAddModal('<%= type %>');
    });
  } else {
    console.warn('Add button not found!');
  }

  window.openAddModal = openAddModal;
  window.openEditModal = openEditModal;
  window.confirmDelete = confirmDelete;
  window.closeModal = closeModal;
});