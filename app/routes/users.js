// const jsonwebtoken = require('jsonwebtoken');
const jwt = require('koa-jwt');
const Router  = require('koa-router');
const router = new Router({prefix:'/users'});
const {find, findById,create,update,delete:del,login,checkOwner,listFollowing,checkUserExist,follow,unfollow,listFollowers,listFollowingTopics,followTopic,unfollowTopic,listQuestions,listLikingAnswer,likeAnswer,unlikeAnswer,listDisLikingAnswer,dislikeAnswer,undislikeAnswer,listCollectingAnswer,collectAnswer,uncollectAnswer} = require('../controllers/users')
const {checkTopicExist} = require('../controllers/topics');
const {checkAnswerExist} = require('../controllers/answers');
const {secret} = require('../config');

// 登录认证
const auth = jwt({secret});

router.get('/',find);
router.post('/',create);
router.get('/:id',findById);
router.patch('/:id', auth, checkOwner, update);
router.delete('/:id', auth, checkOwner, del);
router.post('/login',login);
router.get('/:id/following',listFollowing);
router.get('/:id/followers',listFollowers);
router.put('/following/:id', auth, checkUserExist, follow);
router.delete('/following/:id', auth, checkUserExist, unfollow);
router.get('/:id/followingTopics',listFollowingTopics);
router.put('/followingTopics/:id', auth, checkTopicExist, followTopic);
router.delete('/followingTopics/:id', auth, checkTopicExist, unfollowTopic);
router.get('/:id/questions',listQuestions);
router.get('/:id/likingAnswers',listLikingAnswer);
router.put('/likingAnswers/:id', auth, checkAnswerExist, likeAnswer,undislikeAnswer);//赞和踩互斥
router.delete('/likingAnswers/:id', auth, checkAnswerExist, unlikeAnswer);
router.get('/:id/dislikingAnswers',listDisLikingAnswer);
router.put('/dislikingAnswers/:id', auth, checkAnswerExist, dislikeAnswer,unlikeAnswer);//赞和踩互斥
router.delete('/dislikingAnswers/:id', auth, checkAnswerExist, undislikeAnswer);
router.get('/:id/collectingAnswers',listCollectingAnswer);
router.put('/collectingAnswers/:id', auth, checkAnswerExist, collectAnswer);
router.delete('/collectingAnswers/:id', auth, checkAnswerExist, uncollectAnswer);

module.exports = router;