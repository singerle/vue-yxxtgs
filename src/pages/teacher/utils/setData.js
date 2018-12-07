// 用户的头信息
export class User {
  constructor({name, school, learn, avater, radio}) {
    this.name = name
    this.school = school
    this.learn = learn
    this.avater = avater
    this.radio = radio
  }
}
export class UserInfo {
  constructor({examineecode, enrollcode, studentcode, idcode, birthday, graduateschool, house, room, bed}) {
    this.examineecode = examineecode //学号
    this.enrollcode = enrollcode
    this.studentcode = studentcode
    this.idcode = idcode
    this.birthday = birthday
    this.graduateschool = graduateschool
    this.house = house
    this.room = room
    this.bed = bed
  }
}