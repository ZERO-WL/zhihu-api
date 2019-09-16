const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    __v: { type: Number, select: false},
    name: { type: String, required: true },
    password: { type: String, required: true, select: false},//select:false  默认隐藏
    avatar_url:{ type: String },
    gender: { type: String, enum: ['male', 'female'], default: 'female', required: true },//enum:[] 枚举
    headline: { type: String},
    locations: { type: [{ type: String }],select: false},//数组类型
    business: { type: String, select: false },
    employments: { 
        type: [{
            company: { type: String},
            job: { type: String },
        }],
        select: false
    },//数组中的对象
    educations: { 
        type: [{
            school: { type: String },
            major: { type: String },
            diploma: { type: Number, eunm: [1,2,3,4,5] },
            entrance_year: { type: Number },
            graduation_year: { type: Number },
        }], 
        select: false
    },
});

module.exports = model('User', userSchema);