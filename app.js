let role = "";

const DEMO = {
  principal: { username: "principal", password: "Dera@123" }
};

function showLogin(type){
  role = type;
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
  document.getElementById("principalDashboard").classList.add("hidden");
  document.getElementById("loginTitle").textContent =
    type.charAt(0).toUpperCase()+type.slice(1)+" Login";
  document.getElementById("username").value="";
  document.getElementById("password").value="";
  document.getElementById("loginMsg").textContent="";
}

function goHome(){
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("principalDashboard").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
}

function login(){
  const u=document.getElementById("username").value.trim();
  const p=document.getElementById("password").value;
  const msg=document.getElementById("loginMsg");

  if(role==="principal" && u===DEMO.principal.username && p===DEMO.principal.password){
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("principalDashboard").classList.remove("hidden");
    refresh();
    return;
  }
  msg.textContent = role==="principal"
    ? "Invalid Principal ID or Password."
    : "Student/Teacher accounts will be enabled after backend setup.";
  msg.style.color="#dc3545";
}

function logout(){ goHome(); }

function getStudents(){return JSON.parse(localStorage.getItem("dera_students")||"[]")}
function getTeachers(){return JSON.parse(localStorage.getItem("dera_teachers")||"[]")}

function addStudent(){
  const name=sName.value.trim(), uid=sUid.value.trim(), cls=sClass.value.trim(), user=sUser.value.trim(), pass=sPass.value;
  if(!name||!uid||!cls||!user||!pass){studentMsg.textContent="Please fill all fields.";studentMsg.style.color="#dc3545";return}
  const a=getStudents();
  if(a.some(x=>x.user===user)){studentMsg.textContent="This Student Login ID already exists.";studentMsg.style.color="#dc3545";return}
  a.push({name,uid,cls,user,pass,created:new Date().toLocaleString()});
  localStorage.setItem("dera_students",JSON.stringify(a));
  ["sName","sUid","sClass","sUser","sPass"].forEach(id=>document.getElementById(id).value="");
  studentMsg.textContent="Student saved successfully.";
  studentMsg.style.color="#16803c";
  refresh();
}

function addTeacher(){
  const name=tName.value.trim(), cls=tClass.value.trim(), user=tUser.value.trim(), pass=tPass.value;
  if(!name||!cls||!user||!pass){teacherMsg.textContent="Please fill all fields.";teacherMsg.style.color="#dc3545";return}
  const a=getTeachers();
  if(a.some(x=>x.user===user)){teacherMsg.textContent="This Teacher Login ID already exists.";teacherMsg.style.color="#dc3545";return}
  a.push({name,cls,user,pass,created:new Date().toLocaleString()});
  localStorage.setItem("dera_teachers",JSON.stringify(a));
  ["tName","tClass","tUser","tPass"].forEach(id=>document.getElementById(id).value="");
  teacherMsg.textContent="Teacher saved successfully.";
  teacherMsg.style.color="#16803c";
  refresh();
}

function openTab(name){
  ["students","teachers","list"].forEach(x=>document.getElementById(x+"Tab").classList.add("hidden"));
  document.getElementById(name+"Tab").classList.remove("hidden");
  if(name==="list") renderRecords();
}

function renderRecords(){
  const s=getStudents(), t=getTeachers();
  records.innerHTML =
    `<h4>Students (${s.length})</h4>`+
    (s.length?s.map(x=>`<div class="record"><b>${escapeHtml(x.name)}</b><br>Child UID: ${escapeHtml(x.uid)}<br>Class: ${escapeHtml(x.cls)}<br>Login ID: ${escapeHtml(x.user)}</div>`).join(""):"<p>No students yet.</p>")+
    `<h4>Teachers (${t.length})</h4>`+
    (t.length?t.map(x=>`<div class="record"><b>${escapeHtml(x.name)}</b><br>Class: ${escapeHtml(x.cls)}<br>Login ID: ${escapeHtml(x.user)}</div>`).join(""):"<p>No teachers yet.</p>");
}

function refresh(){
  studentCount.textContent=getStudents().length;
  teacherCount.textContent=getTeachers().length;
}

function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

window.addEventListener("load",refresh);