const dropdown = document.getElementById('dropdown');
const dropdownItems = document.getElementById('dropdown-items');
dropdown.addEventListener('click', () => {
    dropdownItems.classList.toggle('hidden')
})