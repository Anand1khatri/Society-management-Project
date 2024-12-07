document.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch('/societies');
      const societies = await res.json();
      const list = document.getElementById('society-list');
      societies.forEach(society => {
        const li = document.createElement('li');
        li.textContent = `${society.society_name} - ${society.society_description}`;
        list.appendChild(li);
      });
    } catch (error) {
      console.error('Error loading societies:', error);
    }
  });
  