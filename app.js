var express        = require("express"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    methodOverride = require("method-override"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    seedDB         = require("./seeds");

var User       = require("./models/user"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

var app = express();
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v13";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();

// Passport Config
app.use(require("express-session")({
    secret: "Hello my name is chad",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(req, res){
   console.log("Yelp Camp Server Initiated"); 
});