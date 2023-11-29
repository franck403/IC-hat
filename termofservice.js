var mm = document.getElementsByClassName("mm")[0];
var span = document.getElementsByClassName("cls")[0];
var checked = localStorage.getItem("checked");
if (checked === "yes") {
    mm.style.display = "none";
} else {
    mm.style.display = "block";
};

function acpt() {
    localStorage.setItem("checked", "yes")
    mm.style.display = "none";
};