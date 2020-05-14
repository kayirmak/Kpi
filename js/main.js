$(document).ready(() => {

    $('.kpi-table').hide()

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
        
        let late = $('.late').val()
        let tasks = $('.tasks').val()
        let interview = $('.interview').val()
        let bonus = ($('.bonus').val())
        
        if(!inpName.val() || !inpLastName.val() || !inpAge.val() || !inpEmail.val() || !inpPhone.val() || !inpPhoto.val()){
            alert('Заполните все данные студента')
            return
        }
        
        
        
        const inpObj = {
            name: inpName.val(),
            lastName: inpLastName.val(),
            age: inpAge.val(),
            email: inpEmail.val(),
            phone: inpPhone.val(),
            photo: inpPhoto.val(),
            
            
            late: late,
            lateScore: (late / 10).toFixed(),
            tasks: tasks,
            tasksScore: (tasks / 2.4).toFixed(2),
            interview: interview,
            interviewScore: (interview / 2.5).toFixed(),
            bonus: bonus,
            totalScore: Math.round((late / 10) + (tasks / 2.4) + (interview / 2.5) + (bonus / 1)).toFixed()
        }
        
        
        $('input').val('')
        
        setItemToStorage(inpObj)
        renderData()
        $('.back-form').hide()
        $('.form').hide()
    })
// /Добавление студента
    
    
// Функция обновления данных в localStorage
    const setItemToStorage = (inpObj) => {
        if(!localStorage.getItem('data')){
            localStorage.setItem('data', '[]');
        }
    
        const storageTasksData = JSON.parse(localStorage.getItem('data'));
        storageTasksData.push(inpObj);

        localStorage.setItem('data', JSON.stringify(storageTasksData));
    
    }
// /Функция обновления данных в localStorage


//Функция отображения на экране
    const renderData = () => {
        let data = JSON.parse(localStorage.getItem('data'));
        
       
        if(!data) return;

        $('.students-tbody').html('');
        $('.kpi-tbody').html('');

        data.forEach((item, i) => {
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


        data.forEach((item, i) => {
            
           //if(i >= 2) return
           
            $('.students-tbody').append(`
                <tr class = "${i}">
                    <td>${item.name}</td>
                    <td>${item.lastName}</td>
                    <td>${item.age}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td class = 'img-td' width = 100px height = 100px style = "background: url(${item.photo})"></td>
                    <td><button class = 'btn-view ${i}'><i class="fas fa-info"></i></button></td>
                    <td><button class = 'btn-change'><i class="fas fa-pencil-alt"></i></button></td>
                    <td><button class = 'btn-delete'><i class="fas fa-trash-alt"></i></button></td>
                </tr>
            `)
            
            $('.img-td').css('background-size', `cover`)
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
    $('body').on('click',`.btn-view`, function(e){
        let data = JSON.parse(localStorage.getItem('data'));
        let index = $(this).parent().parent().index();
       //console.log(e.target.className)

    

        data.forEach((item, i) => {
            console.log(item.id)
            //if(e.target.className != (`btn-view ${item.id}`)) return
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
                        late: $('.late').val(),
                        lateScore: ($('.late').val() / 10).toFixed(),
                        tasks: $('.tasks').val(),
                        tasksScore: ($('.tasks').val() / 2.4).toFixed(2),
                        interview: $('.interview').val(),
                        interviewScore: ($('.interview').val() / 2.5).toFixed(),
                        bonus: $('.bonus').val(),
                        totalScore: Math.round(($('.late').val() / 10) + ($('.tasks').val() / 2.4) + ($('.interview').val() / 2.5) + ($('.bonus').val() / 1)).toFixed()
                        
                    }
                )
           
            $('.back-form').hide()
            $('.form').hide()

            
            localStorage.setItem('data', JSON.stringify(data));
            
            renderData()
           
         })
    })
// /Изменение студента



    $('.kpi-link').on('click', () => {
        $('.students-table').hide()
        $('.btn-add').hide()
        $('.kpi-table').fadeIn()
        $('body').css('overflow-y', 'scroll')
        $('.kpi-link').css({'background': 'rgb(138, 58, 58)', 'color': '#fff'})
        $('.students-link').css({'background': '#fff', 'color': 'rgb(138, 58, 58)'})
        
    })

    $('.students-link').on('click', () => {
        $('.kpi-table').hide()
        $('.students-table').fadeIn(300)
        $('.btn-add').fadeIn(300)
        $('.students-link').css({'background': 'rgb(138, 58, 58)', 'color': '#fff'})
        $('.kpi-link').css({'background': '#fff', 'color': 'rgb(138, 58, 58)'})
    })




    $('.search').on('keyup', function(){
        let data = JSON.parse(localStorage.getItem('data'));
        $('.students-tbody').html('')
        let value = $(this).val().toLowerCase()
        data.filter(item => {
            if(item.name.toLowerCase().includes(value) || item.lastName.toLowerCase().includes(value)){
                $('.students-tbody').append(`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.lastName}</td>
                    <td>${item.age}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td class = 'img-td' width = 100px height = 100px style = "background: url(${item.photo})"></td>
                    <td><button class = 'btn-view'><i class="fas fa-info"></i></button></td>
                    <td><button class = 'btn-change'><i class="fas fa-pencil-alt"></i></button></td>
                    <td><button class = 'btn-delete'><i class="fas fa-trash-alt"></i></button></td>
                </tr>
                `)
                $('.img-td').css('background-size', `cover`)

            }
        })

    })




    let l = 2
    // $('.next').click(() => {

    //     let data = JSON.parse(localStorage.getItem('data'));

       
    //     if(!data || l > data.length) return;
        

    //     $('.students-tbody').html('');
        

    //     data.forEach((item, i) => {
    //         if(i < l || i >= l+2) return
    //         $('.students-tbody').append(`
    //         <tr>
    //             <td>${item.name}</td>
    //             <td>${item.lastName}</td>
    //             <td>${item.age}</td>
    //             <td>${item.email}</td>
    //             <td>${item.phone}</td>
    //             <td class = 'img-td' width = 100px height = 100px style = "background: url(${item.photo})"></td>
    //             <td><button class = 'btn-view ${i}'><i class="fas fa-info"></i></button></td>
    //             <td><button class = 'btn-change'><i class="fas fa-pencil-alt"></i></button></td>
    //             <td><button class = 'btn-delete'><i class="fas fa-trash-alt"></i></button></td>
    //         </tr>
    //         `)
    //         $('.img-td').css('background-size', `cover`)
    //     });
    //     l = l + 2
        

        
        
    // })


    // $('.prev').click(() => {

    //     let data = JSON.parse(localStorage.getItem('data'));

       
    //     if(!data || l <= 2) return;
        

    //     $('.students-tbody').html('');
        
    //     l = l - 2
    //     data.forEach((item, i) => {
            
    //         if(i < l-2 || i >= l) return
    //         $('.students-tbody').append(`
    //         <tr>
    //         <td>${item.name}</td>
    //         <td>${item.lastName}</td>
    //         <td>${item.age}</td>
    //         <td>${item.email}</td>
    //         <td>${item.phone}</td>
    //         <td class = 'img-td' width = 100px height = 100px style = "background: url(${item.photo})"></td>
    //         <td><button class = 'btn-view'><i class="fas fa-info"></i></button></td>
    //         <td><button class = 'btn-change'><i class="fas fa-pencil-alt"></i></button></td>
    //         <td><button class = 'btn-delete'><i class="fas fa-trash-alt"></i></button></td>
    //         </tr>
    //         `)
    //         $('.img-td').css('background-size', `cover`)
    //     });
        
        
    // })
        
   
})