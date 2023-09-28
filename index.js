const authModule = require('./auth.js');
const studentModule = require('./student.js')
// const readLine = require('readline')

// // const rl = readLine.createInterface({
// //     input: process.stdin,
// //     output: process.stdout
// // })

var studentUser
var teacherUser

const main = () => {
    if (!studentUser && !teacherUser){
        console.log('Авторизація: \n1: Я вчитель\n2: Я учень')
        authModule.rl.question('',(select)=>{
            switch(select){
                case '1':
                    authModule.authTeacher((teacher) => {
                        teacherUser = teacher
                        main()
                    })
                    break;
                case '2':
                    authModule.authStudent((student) => {
                        studentUser = student
                        main()
                    })
                    break;
            } 
        })
        
    } else if (teacherUser ){
        console.log('You are teacher ')
        console.log('1: Показати оцiнки')
        authModule.rl.question(' ', (select) => {
              switch(select) {
                case '1':
                    for(let i = 0; i < studentModule.students.length; i++){
                        console.log(`${i}: `,studentModule.students.at(i).name, studentModule.students.at(i).surname) 
                        console.log(studentModule.students.at(i).marks)
                    }        
                    authModule.rl.question(' 1: Поставити оцiнки ', (selek) => {
                        switch(selek){
                            case '1':
                                authModule.rl.question(' Оберiть Учня ', (studentID) => {
                                    let studentMarks = studentModule.students.at(parseInt(studentID))

                                    authModule.rl.question(' Введiть назву уроку ', (className) => {
                                        authModule.rl.question(' Введiть оцiнку ', (newMark) => {
                                            studentMarks.marks[className].push(newMark)
                                            authModule.rl.question(' 1: Повернутися до оцiнок ', (select) => {
                                                if(select == '1'){
                                                    for(let i = 0; i < studentModule.students.length; i++){
                                                        console.log(`${i}: `,studentModule.students.at(i).name, studentModule.students.at(i).surname) 
                                                        console.log(studentModule.students.at(i).marks)
                                                    }
                                                }
                                            })
                                        })
                                        
                                    })
                            
                    })
            }
            })
              }
            })
    } else if (studentUser){
        console.log('You are student ')
        console.log(studentUser.name, studentUser.surname)
        authModule.rl.question('1: Дивитися оцiнки ', (select) => { 
            switch(select){
                case '1':
                    console.log(studentUser.printMarks())
            }
        })
    }
    
}

main()
