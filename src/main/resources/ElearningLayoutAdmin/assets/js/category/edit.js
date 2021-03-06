// LẤY TOKEN TỪ LOCALSTORAGE
let token = localStorage.getItem('USER_TOKEN');
let url_str = window.location.href;
let url = new URL(url_str);
let id = url.searchParams.get('id');

function loadCate() {
    axios({
        url: `http://localhost:8082/api/admin/category/${id}`,
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(function (resp) {
        document.getElementById('title').value = resp.data.title;
        document.getElementById('icon').value = resp.data.icon;
    })
    .catch(function (err) {
        let data = err.response.data;
        if(data.status == 401){
            document.location.href = "./login.html";
        }
        else if(data.status == 403){
            if(token != null){
                // XÓA TOKEN KHỎI LOCALSTORAGE
                localStorage.removeItem('USER_TOKEN');
                document.location.href = "./login.html";
            }
        }
    })
}
loadCate();

function save() {

    let flag = true;
    let title = document.getElementById('title').value;

    if (flag === true) {
        // TẠO ĐỐI TƯỢNG USER
        let cate = {
          
            "category_id": id,
            "title": title
        }

        // GỌI API THÊM MỚI
        axios({
            url: 'http://localhost:8082/api/admin/category',
            method: 'put',
            data: cate,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(function (resp) {
                swal("Successfully !", "You clicked the button!", "success").then(function(resp){
                    window.location.href = '../ElearningLayoutAdmin/category-index.html';
                })
                
            })
            .catch(function (err) {
                let data = err.response.data;
                if(data.status == 401){
                    document.location.href = "./login.html";
                }
                else if(data.status == 403){
                    if(token != null){
                        // XÓA TOKEN KHỎI LOCALSTORAGE
                        localStorage.removeItem('USER_TOKEN');
                        document.location.href = "./login.html";
                    }
                }else{
                    swal("Unsuccessfully !", "You clicked the button!", "error");
                }

            })
    }
}

