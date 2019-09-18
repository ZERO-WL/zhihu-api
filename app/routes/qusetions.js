// const jsonwebtoken = require('jsonwebtoken');
const jwt = require('koa-jwt');
const Router  = require('koa-router');
const router = new Router({prefix:'/questions'});
const {find, findById,create,update,checkQuestionExist,delete:del,checkQuestioner} = require('../controllers/questions')

const {secret} = require('../config');

// 登录认证
const auth = jwt({secret});

router.get('/',find);
router.post('/',auth, create);
router.get('/:id',checkQuestionExist, findById);
router.patch('/:id', auth, checkQuestionExist, checkQuestioner, update);
router.delete('/:id', auth, checkQuestionExist, checkQuestioner, del);

module.exports = router;