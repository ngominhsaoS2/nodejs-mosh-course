const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to Mongodb'))
    .catch(err => console.error('Could not connect to Mongodb: ', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'VueJs course',
        author: 'saonm',
        tags: ['vue', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course
        .find({ author: /.*sao.*/i }) // Contains with sao
        .limit(10)
        .sort({ name: 1 }) // 1 asc -1 desc
        .count()
    console.log(courses);
}

getCourses();


