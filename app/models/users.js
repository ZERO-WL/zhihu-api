const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    __v: { type: Number, select: false},
    name: { type: String, required: true },
    password: { type: String, required: true, select: false},//select:false  默认隐藏
    avatar_url:{ type: String },
    gender: { type: String, enum: ['male', 'female'], default: 'female', required: true },//enum:[] 枚举
    headline: { type: String},
    locations: { type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],select: false},//数组类型
    business: { type: Schema.Types.ObjectId, ref: 'Topic', select: false },
    employments: { 
        type: [{
            company: { type: Schema.Types.ObjectId, ref: 'Topic'},
            job: { type: Schema.Types.ObjectId, ref: 'Topic' },
        }],
        select: false
    },//数组中的对象
    educations: { 
        type: [{
            school: { type: Schema.Types.ObjectId, ref: 'Topic' },
            major: { type: Schema.Types.ObjectId, ref: 'Topic' },
            diploma: { type: Number, eunm: [1,2,3,4,5] },
            entrance_year: { type: Number },
            graduation_year: { type: Number },
        }], 
        select: false
    },
    following: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}],// mongodb定义的id类型，关联User，引用
        select: false,
    },
    followingTopics: {
        type: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
        select: false,
    },
    likingAnswers: {
        type: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
        select: false,
    },
    dislikingAnswers: {
        type: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
        select: false,
    },
    collectingAnswers: {
        type: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
        select: false,
    },
}, { timestamps: true });

module.exports = model('User', userSchema);