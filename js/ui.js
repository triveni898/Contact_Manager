
function renderContacts(list) {
  const container = document.getElementById("contactList");
  container.innerHTML = "";

  list.forEach((c, i) => {
    if (c.deleted) return;

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${c.name}</h3>
      <p>${c.phone} | ${c.email}</p>
      <p>${c.tag} | ${c.status}</p>
      <p>${c.notes}</p>
      <button onclick="removeContact(${i})">Delete</button>
    `;

    container.appendChild(div);
  });
}
