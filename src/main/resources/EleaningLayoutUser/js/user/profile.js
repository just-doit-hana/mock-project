let UrlParam = new URLSearchParams(window.location.search);
let id = UrlParam.get("id");
let token = localStorage.getItem('USER_TOKEN');
function loadProfile() {
    axios({
        url:`http://localhost:8082/api/user/userU/${id}`,
        method: 'get',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (resp) {
            document.getElementById('name').value = resp.data.full_name;
            document.getElementById('phone').value = resp.data.phone;
            document.getElementById('password').value = resp.data.password;
            document.getElementById('address').value = resp.data.address;
            document.getElementById('imgUrl').value = resp.data.avatar;
            document.getElementById('image-edit').innerHTML = `<img src="/static/img/${resp.data.avatar}" alt="" width="100" height="100">`;
            document.getElementById('userId').value = resp.data.user_id;
        })
        .catch(function (err) {
            console.log(err);

        });
}
loadProfile();

//Hien  thi  thong tin user
function  userInfo(){
    axios({
        url:`http://localhost:8082/api/user/userU/${id}`,
        method: 'get',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (resp) {
            document.getElementById('user-info').innerHTML= `
              <h1 >${resp.data.full_name}</h1>
               <h5 >${resp.data.email}</h5>
            `
        })
        .catch(function (err) {
            console.log(err);
            // let data = err.response.data;
            // if(data.status == 401){
            //     document.location.href = "../EleaningLayout/index.html";
            // }
            // else if(data.status == 403){
            //     if(token != null){
            //         // XÓA TOKEN KHỎI LOCALSTORAGE
            //         localStorage.removeItem('USER_TOKEN');
            //         document.location.href = "../EleaningLayout/index.html";
            //     }
            // }
        });
}
userInfo();

function EditProfile() {
    let fullName = document.getElementById('name').value ;
    let phone   =  document.getElementById('phone').value ;
    let avatar=   document.getElementById('imgUrl').value ;
    let password  =  document.getElementById('password').value ;
    let address =  document.getElementById('address').value ;
    let userID =  document.getElementById('userId').value ;
    let  user = {
        "address": address,
        "avatar": avatar,
        "full_name": fullName,
        "password": password,
        "phone": phone,
        "user_id":userID
    }
    axios({
        url: `http://localhost:8082/api/user/userU`,
        method: "PUT",
        data:user,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (resp) {

        })
        .then(function (resp) {
            swal("Successful !", "Edit SuccessFull!!", "success").then(function(resp){
                window.location.href = '../EleaningLayoutUser/index.html';
            })
        })
        .catch(function (err) {
            console.log(err.response);
            swal("Unsuccessful !", "UnSuccessFull!!", "error");
        })
}

function uploadAvatar() {
    let avatarInput = document.getElementById("avatar");
    // ADD FILE VÀO ĐỐI TƯỢNG FORMDATA
    let formData = new FormData();
    formData.append('file', avatarInput.files[0]);

    axios({
        url: 'http://localhost:8082/api/file/upload',
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function(resp){
            let imageUrl = resp.data;
            document.getElementById('imgUrl').value = imageUrl;
            document.getElementById('image-edit').innerHTML = `<img src="/static/img/${imageUrl}" alt="" width="100" height="100">`;
        })
        .catch(function(err){
            console.log(err)
        })
}

