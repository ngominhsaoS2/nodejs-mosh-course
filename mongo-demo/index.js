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
        .find({ author: 'saonm' })
        //.find({ price: { $gt: 10 } })
        //.find({ price: { $gte: 10, $lte: 20 } })
        //.find({ price: { $in: [10, 15, 20] } })
        .limit(2)
        .sort({ name: 1 }) // 1 asc -1 desc
        .select({ name: 1, tags: 1})
    console.log(courses);
}

getCourses();


