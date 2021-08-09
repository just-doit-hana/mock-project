let urlParam = new URLSearchParams(window.location.search);
let id = urlParam.get("id");
let userId = urlParam.get("userId");
let token = localStorage.getItem('USER_TOKEN');
function loadViewFeedBack(){
    axios({
        url: `http://localhost:8082/api/userau/exam-detail/${id}`,
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (resp) {
           let  listQuestion = resp.data;
           console.log(listQuestion);
           let  content  = ``;
           let No = 1;
           for ( let feedback of  listQuestion ){
              let contentAnswer = '';
              for (let answer of feedback.questionDTO.listAns)
              {
                  if (answer.is_right == true){
                      contentAnswer +=`

                     <li className="content-item">
                                
                                   <span> ${answer.ans_content}</span>
                     </li>`;
                  }
               }
               content+=  `
                          <div >
                            <h5 class="question-number">${No}</h5>
                           
                            <p >
                             ${feedback.status_ans === true ? `<p style="color:#6aec6a;font-size: 2rem;"> ${feedback.questionDTO.question_content}</p>`
                                            :`<p style="color:#ea7b7b;font-size: 2rem;">${feedback.questionDTO.question_content}</p>`}
            
                            </p>
                        </div>
                        <ul class="content-list" style="font-size: 1.4rem; color: black; font-weight: 400" >
                         `+contentAnswer+`
                        </ul>
                    </div>
                `;
               No++;
              }
           document.getElementById('view-feedback').innerHTML = content;
        })
        .catch(function (err) {
            console.log(err.response);


        });
        }
loadViewFeedBack();


