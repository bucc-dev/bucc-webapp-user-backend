const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');

const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const subjectRoutes = require('./routes/subject.routes');
const resourceRoutes = require('./routes/resource.routes');
const questionRoutes = require('./routes/question.routes');
const timetableRoutes = require('./routes/timetable.routes');
const announcementRoutes = require('./routes/announcement.routes');
const scheduleRoutes = require('./routes/schedule.routes');

const errorMiddleware = require('./middleware/error.middleware');
const AppError = require('./utils/AppError');
const limiter = require('morgan');

const app = express();

// Connect to MongoDB
connectDB();

app.use(limiter('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/timetables', timetableRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/schedules', scheduleRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`${req.originalUrl} not found!`, 404));
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
