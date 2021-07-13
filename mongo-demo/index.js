const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to Mongodb'))
    .catch(err => console.error('Could not connect to Mongodb: ', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /some-pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: { 
        type: Number,
        required: function() { // can not use arrow function
            return this.isPublished;
        },
        min: 10,
        max: 200
    },
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'VueJs course',
        category: '--',
        author: 'saonm',
        tags: ['vue', 'frontend'],
        isPublished: true,
        price: 10
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (ex) {
        console.log(ex.message);
    }
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: /.*sao.*/i }) // Contains with sao
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 }) // 1 asc -1 desc
        .count()
    console.log(courses);
}

async function updateCourse(id) {
    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'saonm updated twice',
            isPublished: true,
        }
    });
    
    console.log(result);
}

async function updateCourse_2(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'saonm updated 3 times',
            isPublished: true,
        }
    });
    
    console.log(course); // course here is original document
}

async function updateCourse_3(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'saonm updated 3 times',
            isPublished: true,
        }
    }, { new: true });
    
    console.log(course); // course here is updated document
}

async function removeCourse(id) {
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

createCourse();


