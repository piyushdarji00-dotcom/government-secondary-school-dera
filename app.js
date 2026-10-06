let role='';
function openLogin(r){role=r;document.getElementById('loginTitle').textContent=r+' Login';document.getElementById('modal').classList.remove('hidden');}
function closeLogin(){document.getElementById('modal').classList.add('hidden')}
function demoLogin(e){e.preventDefault();alert(role+' login demo opened. Database authentication will be connected in the next setup.');closeLogin();}
