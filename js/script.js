const qrDiv = document.getElementById("qr_code");
const resetQRDiv = document.getElementById("reset");
const saveBtnElementStr =
  '<button type="button" id="save-btn" class="btn btn-success mt-4 mx-2" onclick="saveImage()">Save Image</button>';
const copyBtnElementStr =
  '<button type="button" id="copy-btn" class="btn btn-success mt-4 mx-2" onclick="copyImage()">Copy Image</button>';
const clearBtnElementStr =
  '<button type="button" id="clear-btn" class="btn btn-danger mt-4 w-50" onclick="clearImage()">Clear QR</button>';
const darkReaderCSS = '../css/DarkReader.css';
let themeMode = 0;

function addDarkReaderCSS() {
 let head = document.getElementsByTagName('head')[0];

 let style = document.createElement('link');
 style.href = darkReaderCSS;
 style.type = 'text/css';
 style.rel = 'stylesheet';
 head.append(style);
}

function removeDarkReaderCSS() {
  let el = document.querySelector("[href=" + CSS.escape(darkReaderCSS) + "]")
  el.remove()
 }

const input = document.getElementById("text-input-group");

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13 || event.key === 13 ) {
    event.preventDefault();
    document.getElementById("button-addon").click();
  }
});

document.getElementById("cpr-year").innerHTML = new Date().getFullYear();

function toggleMode() {
  let darkModeIcon = document.getElementById("dark-mode-icon")
  let lightModeIcon = document.getElementById("light-mode-icon")

  if (themeMode === 0) {
    addDarkReaderCSS();
    darkModeIcon.setAttribute("hidden", true);
    lightModeIcon.removeAttribute("hidden");  
    themeMode = 1;
  }
  else {
    removeDarkReaderCSS();
    lightModeIcon.setAttribute("hidden", true);
    darkModeIcon.removeAttribute("hidden");  
    themeMode = 0;
  }
}

function create(htmlStr) {
  let fragment = document.createDocumentFragment(),
    temp = document.createElement("div");
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
    fragment.appendChild(temp.firstChild);
  }
  return fragment;
}

function getVal(elementId) {
  let textVal = document.getElementById(elementId).value;
  return textVal;
}

function addClass(elementId, _class) {
  let element = document.getElementById(elementId);
  element.classList.add(_class);
}

function removeClass(elementId, _class) {
  let element = document.getElementById(elementId);
  element.classList.remove(_class);
}

function initQRCode(text) {
  let QR_CODE = new QRCode("qr_code", {
    width: 230,
    height: 230,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
  QR_CODE.makeCode(text);
}

function removeChildElements() {
  while (qrDiv.children.length > 0) {
    qrDiv.removeChild(qrDiv.lastChild);
  }
  while (resetQRDiv.children.length > 0) {
    resetQRDiv.removeChild(resetQRDiv.lastChild);
  }
}

function getQRCode() {
  let text = getVal("text-input");

  removeChildElements();
  addClass("text-input-group", "mb-4");

  initQRCode(text);

  let saveBtn = create(saveBtnElementStr);
  let copyBtn = create(copyBtnElementStr);
  let clearBtn = create(clearBtnElementStr);
  qrDiv.appendChild(saveBtn);
  qrDiv.appendChild(copyBtn);
  resetQRDiv.appendChild(clearBtn);
}

function saveImage() {
  let canvas = document.getElementsByTagName("canvas")[0];
  let dataURL = canvas.toDataURL("png");

  let a = document.createElement("a");
  a.href = dataURL;
  a.download = "QRCode.png";

  a.click();
}

function copyImage() {
  let canvas = document.getElementsByTagName("canvas")[0];
  canvas.toBlob((blob) =>
    navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
  );
  $("#copy-btn").show();
}

function clearImage() {
  removeChildElements();
  removeClass("text-input-group", "mb-4")
  document.getElementById("text-input").value = "";
}
