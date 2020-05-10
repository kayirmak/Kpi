$(document).ready(() => {

    $('.btn-add').on('click', () => {
        $('.back-form').show()
        $('.form').fadeIn(300)
        $('.btn-form').show()
        $('.btn-form__change').hide()
        $('input').val('')
    })

// Добавление студента
    $('.btn-form').on('click', () => {
        let inpName = $('.name')
        let inpLastName = $('.last-name')
        let inpAge = $('.age')
        let inpEmail = $('.email')
        let inpPhone = $('.phone')
        let inpPhoto = $('.photo')

        let late = Number($('.late').val())
        let tasks = $('.tasks').val()
        let interview = $('.interview').val()
        let bonus = Number($('.bonus').val())

        
        if(!inpName.val() || !inpLastName.val() || !inpAge.val() || !inpEmail.val() || !inpPhone.val() || !inpPhoto.val()){
            alert('Заполните все поля')
            return
        }

        const inpObj = {
            name: inpName.val(),
            lastName: inpLastName.val(),
            age: inpAge.val(),
            email: inpEmail.val(),
            phone: inpPhone.val(),
            photo: inpPhoto.val()
        }

        const kpiObj = {
            name: inpName.val(),
            late: late,
            lateScore: late / 10,
            tasks: tasks,
            tasksScore: tasks / 2.4,
            interview: interview,
            interviewScore: interview / 2.5,
            bonus: bonus,
            totalScore: (late / 10) + (tasks / 2.4) + (interview / 2.5) + bonus
        }
        console.log(kpiObj)
        
        $('.students-tbody').append(`
            <tr>
                <td>${inpObj.name}</td>
                <td>${inpObj.lastName}</td>
                <td>${inpObj.age}</td>
                <td>${inpObj.email}</td>
                <td>${inpObj.phone}</td>
                <td>${inpObj.photo}</td>
            </tr>
        `)

        $('.kpi-tbody').append(`
            <tr>
                <td>${kpiObj.name}</td>
                <td>${kpiObj.late}</td>
                <td>${kpiObj.lateScore}</td>
                <td>${kpiObj.tasks}</td>
                <td>${kpiObj.tasksScore}</td>
                <td>${kpiObj.interview}</td>
                <td>${kpiObj.interviewScore}</td>
                <td>${kpiObj.bonus}</td>
                <td>${kpiObj.totalScore}</td>
            </tr>
        `)


        $('input').val('')
        
        setItemToStorage(inpObj, kpiObj)
        renderData()
        $('.back-form').hide()
        $('.form').hide()
    })
// /Добавление студента
    
    
// Функция обновления данных в localStorage
    const setItemToStorage = (inpObj, kpiObj) => {
        if(!localStorage.getItem('data')){
            localStorage.setItem('data', '[]');
        }

        if(!localStorage.getItem('data-kpi')){
            localStorage.setItem('data-kpi', '[]');
        }

        const storageKpiData = JSON.parse(localStorage.getItem('data-kpi'));
        storageKpiData.push(kpiObj);

        const storageTasksData = JSON.parse(localStorage.getItem('data'));
        storageTasksData.push(inpObj);

        localStorage.setItem('data-kpi', JSON.stringify(storageKpiData));

        localStorage.setItem('data', JSON.stringify(storageTasksData));
    
    }
// /Функция обновления данных в localStorage


//Функция отображения на экране
    const renderData = () => {
        let data = JSON.parse(localStorage.getItem('data'));
        let dataKpi = JSON.parse(localStorage.getItem('data-kpi'));

       
        if(!data || !dataKpi) return;

        $('.students-tbody').html('');
        $('.kpi-tbody').html('');

        dataKpi.forEach(item => {
            $('.kpi-tbody').append(`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.late}</td>
                    <td>${item.lateScore}</td>
                    <td>${item.tasks}</td>
                    <td>${item.tasksScore}</td>
                    <td>${item.interview}</td>
                    <td>${item.interviewScore}</td>
                    <td>${item.bonus}</td>
                    <td>${item.totalScore}</td>
                </tr>
            `);
        })

        data.forEach(item => {
            $('.students-tbody').append(`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.lastName}</td>
                    <td>${item.age}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td><img src = ${item.photo} width = 100px></td>
                    <td><button class = 'btn-view'><i class="fas fa-info"></i></button></td>
                    <td><button class = 'btn-change'><i class="fas fa-pencil-alt"></i></button></td>
                    <td><button class = 'btn-delete'><i class="fas fa-trash-alt"></i></button></td>
                </tr>
            `)
        });
    }
// /Функция отображения на экране

    renderData()

//Удаление студента
    $('body').on('click','.btn-delete', function(){
        let data = JSON.parse(localStorage.getItem('data'));

        let index = $(this).parent().parent().index();

        data.splice(index, 1);

        localStorage.setItem('data', JSON.stringify(data));

        renderData()
    })
// /Удаление студента

// Просмотр студента
    $('body').on('click','.btn-view', function(){
        let data = JSON.parse(localStorage.getItem('data'));
        let index = $(this).parent().parent().index();

        
        data.forEach((item, i) => {
            if(index != i) return
            $('.modal-view').append(`
                <p class = "img-back"></p>
                <p class = "modal-view__text">Имя - <span>${item.name}</span></p>
                <p class = "modal-view__text">Фамилия - <span>${item.lastName}</span></p>
                <p class = "modal-view__text">Возраст - <span>${item.age}</span></p>
                <p class = "modal-view__text">Почта - <span>${item.email}</span></p>
                <p class = "modal-view__text">Телефон - <span>${item.phone}</span></p>
                
            `)
            $('.img-back').css('background-image', `url(${item.photo})`)
           
        })

        $('.back-modal__view').show()
        $('.modal-view').fadeIn(300)


      
    })
// /Просмотр студента    
$('.close-modal__view').click(() => {
    $('.back-form').hide()
    $('.form').hide()
    $('.back-modal__view').hide()
    $('.modal-view').hide()
    $('.modal-view').text('')
   })

// Изменение студента
    $('body').on('click','.btn-change', function(){
        let data = JSON.parse(localStorage.getItem('data'));
        let dataKpi = JSON.parse(localStorage.getItem('data-kpi'));


        let index = $(this).parent().parent().index();
        
        $('.btn-form').hide()
        $('.back-form').show()
        $('.btn-form__change').show()
        $('.form').fadeIn(300)
        
        data.forEach((item, i) => {
            if(index != i) return

            $('.name').val(item.name)
            $('.last-name').val(item.lastName)
            $('.age').val(item.age)
            $('.email').val(item.email)
            $('.phone').val(item.phone)
            $('.photo').val(item.photo)
        })

        dataKpi.forEach((item, i) => {
            if(index != i) return

            $('.late').val(item.late)
            $('.tasks').val(item.tasks)
            $('.interview').val(item.interview)
            $('.bonus').val(item.bonus)
            
        })


        


        $('.btn-form__change').on('click', function(){
            
                data.splice(index, 1,
                    {
                        name: $('.name').val(),
                        lastName: $('.last-name').val(),
                        age: $('.age').val(),
                        email: $('.email').val(),
                        phone: $('.phone').val(),
                        photo: $('.photo').val(),
                        
                    }
                )

                dataKpi.splice(index, 1,
                    {
                        late: $('.late').val(),
                        tasks: $('.tasks').val(),
                        interview: $('.interview').val(),
                        bonus: $('.bonus').val()
                    }
                )

                
                
           
            $('.back-form').hide()
            $('.form').hide()

            localStorage.setItem('data-kpi', JSON.stringify(dataKpi));
            localStorage.setItem('data', JSON.stringify(data));
            
            renderData()
           
         })
    })
// /Изменение студента





$('.kpi').on('click', function() {
    // $('.students-table').fadeOut(300)
    // $('.btn-add').fadeOut(300)

    


})



})