//connect to express
const express=require('express')
const fs = require('fs')
const path = require('path')

var cors = require('cors')



var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//import module form db.js
const connectDB=require('./config/db');
const app=express();
const notFoundMiddleware=require('./middleware/not-found.js');
//Connect to database
connectDB();
//set port to 5000
const PORT=process.env.PORT || 5000;

//use body parser middleware
app.use(express.json({extended:false}));
app.use(cors())
// create a write stream (in append mode) for the log file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs.log'), { flags: 'a' }
);



//Get request
app.get('/',(req,res)=>res.send('API running'))
//app.use(notFoundMiddleware);
//Define routes for users,auth,profile,posts respectively






/**
 * @swagger
 * /api/job/getjobs:
 *   get:
 *     tags:
 *          - Jobs
 *     summary: Fetching particular user jobs from database
 *     description: Fetching particular user jobs  from database
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: x-auth-token
 *         in: header
 *         description: Custom header for the request
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: To test Get Method
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *     # Add a script to retrieve the token value from local storage and send the request with the token header
 *     x-code-samples:
 *       - lang: javascript
 *         source: |
 *           const token = localStorage.getItem('myToken');
 *           fetch('https://localhost:5000/api/job/getjobs', {
 *             method: 'GET',
 *             headers: {
 *               'x-auth-token': token,
 *             },
 *           })
 *             .then(response => response.json())
 *             .then(data => console.log(data))
 *             .catch(error => console.error(error));  
 */

/**
 * @swagger
 * /api/job/getjob/{id}:
 *  get:
 *      tags:
*         - Jobs
 *      summary: fetching details of job by jobid
 *      description: fetching details of job by jobid from the database
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */
/**
* @swagger
* /api/job/addjob:
*  post:
*     summary: Post a job
*     description: Add Job
*     parameters:
*       - name: x-auth-token
*         in: header
*         description: Custom header for the request
*         required: true
*         schema:
*           type: string
*     tags: [Jobs]
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     properties:
*                         jobName:
*                             type: string
*                         price:
*                             type: integer   
*                         country:
*                             type: string
*                         experience:
*                             type: string
*                         category:
*                              type: string
*                         skills:
*                              type: string
*                         jobType:
*                              type: string
*                         description:
*                              type: string
*     responses:
*         200:
*             description: Job Added Successfully
*         404:
*             description: Not Found
*         500:
*             description: Internal Server Error
*/
/**
* @swagger
* /api/users/:
*  post:
*     summary: This API is used to login and whether the user present or not
*     description: This API is used to login and whether the user present or not
*     tags: [Users]
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     properties:
*                         username:
*                             type: string
*                         email:
*                             type: string    
*                         password:
*                             type: string
*     responses:
*         200:
*             description: Added Successfully
*         404:
*             description: Not Found
*         500:
*             description: Internal Server Error
*/
/**
* @swagger
* /api/proposal/addproposal:
*  post:
*     summary: Post a proposal
*     description: Add proposal
*     parameters:
*       - name: x-auth-token
*         in: header
*         description: uservtoken
*         required: true
*         schema:
*           type: string
*     tags: [Proposals]
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     properties:
*                         jobid:
*                             type: string
*                         bidprice:
*                             type: integer   
*                         biddescription:
*                             type: string
*                         days:
*                             type: integer
*     responses:
*         200:
*             description: Propossal Added Successfully
*         404:
*             description:  Bad token Not Found
*         500:
*             description: Internal Server Error
*/
/**
 * @swagger
 * /api/proposal/getproposals:
 *   get:
 *     tags:
 *          - Proposals
 *     summary: Fetching particular proposals of user from database
 *     description: Fetching particular proposals of user  from database
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: x-auth-token
 *         in: header
 *         description: Custom header for the request
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: To test Get Method
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *     # Add a script to retrieve the token value from local storage and send the request with the token header
 *     x-code-samples:
 *       - lang: javascript
 *         source: |
 *           const token = localStorage.getItem('myToken');
 *           fetch('https://localhost:5000/api/job/getjobs', {
 *             method: 'GET',
 *             headers: {
 *               'x-auth-token': token,
 *             },
 *           })
 *             .then(response => response.json())
 *             .then(data => console.log(data))
 *             .catch(error => console.error(error));  
 */
/**
 * @swagger
 * /api/auth/:
 *   get:
 *     tags:
 *          - Authentication
 *     summary: Fetching  of user from database
 *     description: Fetching  of user  from database by token
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: x-auth-token
 *         in: header
 *         description: Custom header for the request
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: To test Get Method
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *     # Add a script to retrieve the token value from local storage and send the request with the token header
 *     x-code-samples:
 *       - lang: javascript
 *         source: |
 *           const token = localStorage.getItem('myToken');
 *           fetch('https://localhost:5000/api/job/getjobs', {
 *             method: 'GET',
 *             headers: {
 *               'x-auth-token': token,
 *             },
 *           })
 *             .then(response => response.json())
 *             .then(data => console.log(data))
 *             .catch(error => console.error(error));  
 */
/**
* @swagger
* /api/auth/:
*  post:
*     summary: This API is used to login 
*     description: This API is used to login and whether the user present or not
*     tags: [Authentication]
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     properties:
*                         email:
*                             type: string    
*                         password:
*                             type: string
*     responses:
*         200:
*             description: Token generated Successfully
*         404:
*             description: Not Found
*         500:
*             description: Internal Server Error
*/

/**
 * @swagger
 * /api/job/getjobbyuser:
 *   get:
 *     tags:
 *          - Jobs
 *     summary: Fetching jobs of user from database
 *     description: Fetching jobs of user  from database by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: x-auth-token
 *         in: header
 *         description: Custom header for the request
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: To test Get Method
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *     # Add a script to retrieve the token value from local storage and send the request with the token header
 *     x-code-samples:
 *       - lang: javascript
 *         source: |
 *           const token = localStorage.getItem('myToken');
 *           fetch('https://localhost:5000/api/job/getjobs', {
 *             method: 'GET',
 *             headers: {
 *               'x-auth-token': token,
 *             },
 *           })
 *             .then(response => response.json())
 *             .then(data => console.log(data))
 *             .catch(error => console.error(error));  
 */
/**
 * @swagger
 * /api/profile/me:
 *   get:
 *     tags:
 *          - Profile
 *     summary: Fetching profile from database
 *     description: Fetching profile  from database by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: x-auth-token
 *         in: header
 *         description: Custom header for the request
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: To test Get Method
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *     # Add a script to retrieve the token value from local storage and send the request with the token header
 *     x-code-samples:
 *       - lang: javascript
 *         source: |
 *           const token = localStorage.getItem('myToken');
 *           fetch('https://localhost:5000/api/job/getjobs', {
 *             method: 'GET',
 *             headers: {
 *               'x-auth-token': token,
 *             },
 *           })
 *             .then(response => response.json())
 *             .then(data => console.log(data))
 *             .catch(error => console.error(error));  
 */
/**
* @swagger
* /api/profile/:
*  get:
*     summary: Get all Profiles
*     description: Get profiles from database
*     tags: [Profile]
*     requestBody:
*         required: false
*     responses:
*         200:
*             description: Added Successfully
*         404:
*             description: Not Found
*         500:
*             description: Internal Server Error
*/

/**
 * @swagger
 * /api/profile/user/{id}:
 *  get:
 *      tags:
 *         - Profile
 *      summary: fetching profiles by userid
 *      description: fetching profiles by userid from the database
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true;
 *            description:  String
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: To test Get Method
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */    
/**
 * @swagger
 * /api/profile/:
 *   delete:
 *     tags:
 *          - Profile
 *     summary: deleting profile from database
 *     description: deleting profile of user  from database
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: x-auth-token
 *         in: header
 *         description: Custom header for the request
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: To test Get Method
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *     # Add a script to retrieve the token value from local storage and send the request with the token header
 *     x-code-samples:
 *       - lang: javascript
 *         source: |
 *           const token = localStorage.getItem('myToken');
 *           fetch('https://localhost:5000/api/job/getjobs', {
 *             method: 'GET',
 *             headers: {
 *               'x-auth-token': token,
 *             },
 *           })
 *             .then(response => response.json())
 *             .then(data => console.log(data))
 *             .catch(error => console.error(error));  
 */

app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))

app.use('/api/job',require('./routes/api/job'))
app.use('/api/proposal',require('./routes/api/proposal'))

//Listen to port 5000
app.listen(PORT,()=>console.log(`Server has start at port ${PORT}`))
 