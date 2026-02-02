// Get input elements safely
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const tagInput = document.getElementById("tag");
const statusInput = document.getElementById("status");
const notesInput = document.getElementById("notes");

const form = document.getElementById("contactForm");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");

let contacts = getContacts();

// 🔹 Fix old / broken contacts
contacts = contacts.map(c => ({
  name: c.name || "",
  phone: c.phone || "",
  email: c.email || "",
  tag: c.tag || "Lead",
  status: c.status || "Active",
  notes: c.notes || "",
  deleted: c.deleted || false
}));

saveContacts(contacts);
renderContacts(contacts);

// ADD CONTACT
form.addEventListener("submit", e => {
  e.preventDefault();

  if (!emailInput.value.includes("@") || phoneInput.value.length < 10) {
    alert("Invalid Email or Phone");
    return;
  }

  const contact = {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    tag: tagInput.value,
    status: statusInput.value,
    notes: notesInput.value,
    deleted: false
  };

  contacts.push(contact);
  saveContacts(contacts);
  renderContacts(contacts);
  form.reset();
});

// SOFT DELETE
function removeContact(i) {
  contacts[i].deleted = true;
  saveContacts(contacts);
  renderContacts(contacts);
}

// EXPORT CSV
exportBtn.onclick = () => {
  let csv = "name,phone,email,tag,status,notes\n";
  contacts.filter(c => !c.deleted).forEach(c => {
    csv += `${c.name},${c.phone},${c.email},${c.tag},${c.status},${c.notes}\n`;
  });

  const blob = new Blob([csv]);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "contacts.csv";
  a.click();
};

// IMPORT CSV
importFile.onchange = e => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const rows = reader.result.split("\n").slice(1);

    rows.forEach(r => {
      const [n, p, em, t, s, no] = r.split(",");
      if (n) {
        contacts.push({
          name: n,
          phone: p || "",
          email: em || "",
          tag: t || "Lead",
          status: s || "Active",
          notes: no || "",
          deleted: false
        });
      }
    });

    saveContacts(contacts);
    renderContacts(contacts);
  };

  reader.readAsText(file);
};

