(async ()=>{
    const userInfo = document.querySelector('#userInfo');
    let currentUser = localStorage.getItem('currentUser');//{username,age,gender,authorization}
    //前端浏览器用对象
    currentUser = JSON.parse(currentUser);
    if(!currentUser){
        location.href = '../log.html'
    }else{
        // 校验token的有效性

        const result = await fetch(`http://localhost:2003/api/jwtverify?authorization=${currentUser.authorization}`).then(res => res.json());

        if (result.code === 0) {
            localStorage.removeItem('currentUser');
            location.href = '../log.html'
        }else{
            // 显示用户信息
            userInfo.innerText = currentUser.username;
        }
    }


    // 退出
    const btnLogout = document.querySelector('#btnLogout');

    btnLogout.onclick = ()=>{
        //老师的
        // localStorage.removeItem('authorization');
        localStorage.removeItem('currentUser');
        location.href = '../log.html';
    }
})();