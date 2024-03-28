
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/cookies");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secretkey",
    resave: true,
    saveUninitialized: true,
    cookie: {  maxAge: 60000 }, // 60 seconds for session
  })
);


function set_session(req , content) {
    req.session.id =content
}
function get_session(req) {
  return req.id
}
module.exports= {set_session, get_session}