const Router = require('koa-router')
const fs = require('fs')
const fsPromises = fs.promises;
const path = require('path')
var router = new Router()
const {
  fetchStudent,fetchStudentDetail,saveStudent
} = require('../controllers/student')

const {saveInfo,fetchInfo} = require('../controllers/info')
const { saveCourse, fetchCourse } = require('../controllers/course')

router.prefix('/stu')

router.post('/savestudent', saveStudent)
router.get('/student', fetchStudent)
router.get('/studentInfo', fetchStudentDetail)
router.post('/savescourse', saveCourse)
router.get('/course', fetchCourse)

router.get('/info', fetchInfo)
router.post('/saveinfo', saveInfo)

module.exports = router
