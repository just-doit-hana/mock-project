
let UrlParam = new URLSearchParams(window.location.search);
let id = UrlParam.get("id");
let token = localStorage.getItem('USER_TOKEN');

function loadTarget() {
  axios({
    url: `http://localhost:8082/api/user/target/by-course/${id}`,
    method: "GET",
  })
    .then(function (resp) {
      let listTarget = resp.data;
      let content = "";
      for (let target of listTarget) {
        content += `
            <li>
                                        <i class="fa fa-check"></i>
                                        <span>${target.target_title}
                                            </span>
            </li>
            `;
      }

      document.getElementById("showTarget").innerHTML = content;
    })
    .catch(function (err) {
      console.log(err);
    });
}
loadTarget();

function loadCourse() {
  axios({
    url: `http://localhost:8082/api/user/course/${id}`,
    method: "GET",

  })
    .then((resp) => {
      // console.log(resp.data);
      document.getElementById("titleCourse").innerHTML = `
        <div class="container">
            <div class="banner-content">
                <h1>${resp.data.title}</h1>

                <h6 class = "mt-3">
                <span><i class="fa fa-user m-1"></i> Created by </span>
                <span class = "mr-3">${resp.data.full_name}</span>
                <span> <i class="fa fa-calendar-check-o mr-1"></i>Last updated ${resp.data.last_update}</span>
                </h6>
        </div>
        </div>        
        `;
      document.getElementById("showDescription").innerHTML = `
                   ${resp.data.description}
        `;
    })
    .catch((err) => {
      console.log(err);

    });
}
loadCourse();


function loadButtonADD() {
    let userID = document.getElementById('useID123').value;
  axios({
    url: `http://localhost:8082/api/userau/userEnroll/check/${userID}/${id}`,
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })

    .then((resp) => {
      console.log(resp.data.length)
      if (resp.data.length == 0){
        document.getElementById("button-addCourse").innerHTML = `
            <div class="course-buy">
                <h2 class="mb-4 font-weight-bold" >
                    FREE
                </h2>
                <button class="btn btn-danger w-100" type="button" onclick="addUserEnroll(${userID})">Add your course</button>
            </div>  
        `;

      }else{
        document.getElementById("button-addCourse").innerHTML = `
            <div class="course-buy">
                <h2 class="mb-4 font-weight-bold" >
                    FREE
                </h2>
                <a href="../EleaningLayoutuser/course.html?id=${userID}" class="btn btn-success w-100" >View your course</a>
            </div> 
        `;
      }
    })
    .catch((err) => {
      console.log(err);

    });
}
// loadButtonADD();


function addUserEnroll(userCheck){
  let userEnroll = {
    "course_id": id,
    "date_enroll": new Date().toJSON(),
    "user_id": userCheck
  }
  console.log(userEnroll)

  axios({
    url: `http://localhost:8082/api/userau/userEnroll`,
    method: "POST",
    data: userEnroll,
      headers: {
          "Authorization": `Bearer ${token}`
      }
  })
    .then(function (resp) {
      window.location.href = `../EleaningLayoutuser/course.html?id=`+userCheck;
    })
    .catch(function (err) {
      console.log(err);
    });
}
