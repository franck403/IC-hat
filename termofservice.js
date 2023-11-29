var mm = document.getElementsByClassName("mm")[0];
var span = document.getElementsByClassName("cls")[0];
var checked = 'no'
if (checked === "yes") {
    mm.style.display = "none";
} else {
    mm.style.display = "block";
};

function acpt() {
    mm.style.display = "none";
};
if (mm.innerHTML != `  <div id="mm" class="mm">
<h2>Terms of service</h2>
<p>Welcome to Ic-hat! These Terms of Service govern your use and outline the rights and responsibilities between you
  and us. By accessing or using the Application, you agree to be bound by these Terms. Please take note that the
  By accepting you are obligated to be a benevole
</p>
<span class="cls" onclick="acpt()">Accept</span>
</div>
`) {
    console.log("no accpetet")
    location.replace(location.href)
}