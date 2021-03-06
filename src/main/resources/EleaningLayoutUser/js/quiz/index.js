let urlParam = new URLSearchParams(window.location.search);
let id = urlParam.get("id");
let userId = urlParam.get("userId");
let token = localStorage.getItem('USER_TOKEN');
function loadQuestion() {
    axios({
        url: `http://localhost:8082/api/userau/question/${id}`,
        method: "get",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (resp) {
            let listQuestion = resp.data;
            //so luong cau hoi --> chay for
            document.getElementById("numberQuestion").value = listQuestion.length;
            // console.log(listQuestion.length);
            let content = "";
            let No = 1;
            for (let question of listQuestion) {
                let contentAnswer = "";
                for (let answer of question.listAns) {
                    contentAnswer += `
      <li class="content-item">
<!--      radio cua  cau hoi  -->
      <input type="radio" name="answer${No}" value="${answer.is_right}"/>
      <span>
      ${answer.ans_content}
      </span>
      </li>
          `;
                }
                content +=
                    ` 
    <div class="content">
    <h5 class="question-number">${No}.</h5>
     <input  type="hidden" id="question${No}" value="${question.question_id}">
     
    <p class="question-content">
    ${question.question_content}
    </p>
</div>
<ul class="content-list">
` +
                    contentAnswer +
                    `
</ul>
        `;
                No++;
            }
            document.getElementById("question-list").innerHTML = content;
        })
        .catch(function (err) {
     console.log(err);
        });
}

loadQuestion();

function loadCourse() {
    axios({
        url: `http://localhost:8082/api/user/course/${id}`,
        method: "get",
        // headers: {
        //     "Authorization": `Bearer ${token}`
        // }
    })
        .then(function (resp) {
            document.getElementById('name-course').innerHTML = `<div class="quiz-msg">
                            <h1 style="color: white" >${resp.data.title}</h1>
                        </div>
                        
                           <input type="hidden" name="timeDo" value="${resp.data.time_do}" id="timeDo"> 
                            <p id="timer"><script>countDown();</script></p>
                        <h3 class="text-title" style="color: white" id="count">${resp.data.time_do}</h3>`;

        })
        .catch(function (err) {
            console.log(err);

        });
}

loadCourse();

function loadTitleQuiz() {
    axios({
        url: `http://localhost:8082/api/user/course/${id}`,
        method: "get",
        // headers: {
        //     "Authorization": `Bearer ${token}`
        // }
    })
        .then(function (resp) {
            document.getElementById('title').innerHTML = `
               
                            <h1 style="font-size: 4rem">${resp.data.title}  </h1>
                               <h2 style="font-size: 3rem; color: white" class="text-title">Quiz ${resp.data.time_do} min</h2>
                `;
        })
        .catch(function (err) {
            console.log(err);

        });
}

loadTitleQuiz();

function loadExam() {
    axios({
        url: ` http://localhost:8082/api/userau/exam/check/${id}/${userId}`,
        method: "get",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (resp) {
            let listExam = resp.data;
            let content = ``;
            for (let exam of listExam) {
                content += `
                <tr class="title-body">
                      <th scope="row">Final Quiz</th>
                            <td>${exam.grade}</td>
                            <td style="color: #17a2b8; font-weight: 400;"> <a href="../EleaningLayoutUser/view-feedback.html?id=${exam.exam_id}">View Feedback</a></td>
                            <td>${exam.grade}</td>
                      <td>${exam.time_need}</td>
                </tr>           
                    `;
            }
            document.getElementById('list-exam').innerHTML = content;
        })
        .catch(err => {
            console.log(err);
        });
}
loadExam();

function QuizShow(){
     window.location.href ="../EleaningLayoutUser/quiz-show.html?id="+id +'&userId='+userId;
}

function submitQuestion() {
    let numberQuestion = document.getElementById("numberQuestion").value;
    let numberQuiz = 0;
    let examDetail = [];
    for(let i=1; i<=numberQuestion;i++){
        examDetail.push({
            "question_id": document.getElementById("question"+i).value,
            "status_ans": Array.from(document.getElementsByName("answer"+i)).find(r => r.checked).value
        });
        if(Array.from(document.getElementsByName("answer"+i)).find(r => r.checked).value == "true"){
            numberQuiz++;
        }
    }

    let examDetailDTO = {
        "course_id": id,
         "examDetailDTO": examDetail,
        "grade": (numberQuiz / numberQuestion) * 10,
        "number_quiz": numberQuiz,
        "time_need": 22,
        "user_id": userId
    }

    axios({
        url: 'http://localhost:8082/api/userau/exam',
        method: 'POST',
        data: examDetailDTO,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (resp) {
            swal("Successfully !", "You clicked the button!", "success").then(function(resp){
                window.location.href = `../EleaningLayoutUser/quiz.html?id=${id}&userId=${userId}`;
            })
        })
        .catch(function (err) {
            console.log(err.response);
            swal("Unsuccessfully !", "You clicked the button!", "error");
        })
}

function Cancel (){
    window.location.href = `../EleaningLayoutUser/quiz.html?id=${id}&userId=${userId}`;
}





