let UrlParam = new URLSearchParams(window.location.search);
let id = UrlParam.get("id");
let userId = UrlParam.get("userId");
let token = localStorage.getItem('USER_TOKEN');
let listUserEnroll;
function loadLessonDetail() {
    axios({
      url: `http://localhost:8082/api/userau/course-detail/by-course/${id}`,
      method: "get",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
      .then(function (resp) {
        listUserEnroll = resp.data;
        let content = ``;
        let no =0;
        for (let course of listUserEnroll) {
            
          content += `

          <li>
        <a class="video-btn" type="button"  onclick="changeUrlVideo(${no})">  
            <span> <i class="fa fa-play-circle mr-1"></i>
                ${course.title}
            </span>
            
        </a>
    </li>
            `;
            no++;
        }
        content += `
        <li>
              <a class="btn btn-outline-info w-100" style="text-align: center;" href="../EleaningLayoutUser/quiz.html?id=${id}&userId=${userId}">QUIZ</a>
        </li>
        `;
        document.getElementById("list-content").innerHTML = content;
        document.getElementById("showVideo").innerHTML = `
        <iframe width="992" height="500" src="https://www.youtube.com/embed/${listUserEnroll[0].url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
      })
      .catch(function (err) {
        console.log(err);

      });
  }
  loadLessonDetail();

  function changeUrlVideo(numberA){
    let aa= listUserEnroll[numberA].url;
    document.getElementById("showVideo").innerHTML = `
        <iframe width="992" height="500" src="https://www.youtube.com/embed/${aa}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
  }

function loadTitleCourse() {
    axios({
        url: `http://localhost:8082/api/user/course/${id}`,
        method: "get",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (resp) {
            console.log(resp.data);
                document.getElementById('section-name').innerHTML= `
              
                <h3 class="ml-4" style="position: relative;
                bottom: 18px;;">${resp.data.title} </h3>
          
                `
        })
        .catch(function (err) {
            console.log(err);

        });
}
loadTitleCourse();