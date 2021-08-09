
function SearchCourse() {
    let keyWordSearch = document.querySelector('#search').value;
    axios({
        url: `http://localhost:8082/api/user/course/by-name/${keyWordSearch}`,
        method: 'get',

    })
        .then(function(resp) {
            let listCourse = resp.data;
            console.log(listCourse);
            let content = '';
            for (let course of listCourse) {
                content += `
            <div class="col-md-2" >
            <div class="course">
            <img src="/static/img/${course.image}" alt="" />
            <h6 class="course-title">${course.title}</h6>
            <small class="course-content">
            ${course.description}
            </small>
            <div class="seller-label">Hot</div>
            <div class="course-overlay">
                <a href="./details.html?id=${course.course_id}">
                    <h6 class="course-title">
                    ${course.title}
                    </h6>
                    <div class="course-author">
                        <b>${course.full_name}</b>
                        <span class="mx-1"> | </span>
                        <b> ${course.category_name}</b>
                    </div>
                    <small class="course-content">
                    ${course.description}
                    </small>
                </a>
                <a href="./details.html?id=${course.course_id}" class="btn btn-sm btn-danger text-white w-100">View Course</a>
            </div>
        </div>
       </div>
            `;
            }
            document.getElementById('hot-course').innerHTML = content;
        })
        .catch(function(err){

        })
}


function SearchCourse1() {
    let keyWordSearch = document.querySelector('#search1').value;
    axios({
        url: `http://localhost:8082/api/user/course/by-name/${keyWordSearch}`,
        method: 'get',

    })
        .then(function(resp) {
            let listCourse = resp.data;
            // console.log(listCourse);
            let content = '';
            for (let course of listCourse) {
                content += `
            <div class="col-md-2" >
            <div class="course">
            <img src="/static/img/${course.image}" alt=""/>
            <h6 class="course-title">${course.title}</h6>
            <small class="course-content">
            ${course.description}
            </small>
            <div class="seller-label">Hot</div>
            <div class="course-overlay">
                <a href="./details.html?id=${course.course_id}">
                    <h6 class="course-title">
                    ${course.title}
                    </h6>
                    <div class="course-author">
                        <b>${course.full_name}</b>
                        <span class="mx-1"> | </span>
                        <b> ${course.category_name}</b>
                    </div>
                    <small class="course-content">
                    ${course.description}
                    </small>
                </a>
                <a href="./details.html?id=${course.course_id}" class="btn btn-sm btn-danger text-white w-100">View Course</a>
            </div>
        </div>
       </div>
            `;
            }
            document.getElementById('hot-course').innerHTML = content;
        })
        .catch(function(err){

        })
}

