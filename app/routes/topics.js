// const jsonwebtoken = require('jsonwebtoken');
const jwt = require('koa-jwt');
const Router  = require('koa-router');
const router = new Router({prefix:'/topics'});
const {find, findById,create,update,listTopicFollowers,checkTopicExist,listQuestions} = require('../controllers/topics')

const {secret} = require('../config');

// 登录认证
const auth = jwt({secret});

router.get('/',find);
router.post('/',auth, create);
router.get('/:id',checkTopicExist, findById);
router.patch('/:id', auth, checkTopicExist, update);
router.get('/:id/followers', checkTopicExist, listTopicFollowers);
router.get('/:id/questions', checkTopicExist, listQuestions);


module.exports = router;