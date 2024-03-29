// All middleware goes here
var Campground = require("../models/campground"),
    Comment    = require("../models/comment");
var middlewareObj = {
    checkCampgroundOwnership: function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if (err || !foundCampground) {
                    req.flash("error", "Campground not found");
                    res.redirect("back");
                } else {
                    // does user own the campground
                    if(foundCampground.author.id.equals(req.user._id)){
                        next(); 
                    } else {
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
        }
    },
    checkCommentOwnership: function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if (err || !foundComment){
                    req.flash("error", "Comment not found");
                    res.redirect("back");
                } else {
                    // does user own the comment
                    if(foundComment.author.id.equals(req.user._id)){
                        next(); 
                    } else {
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that")
            res.redirect("back");
        }
    },
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        // Flash will show up only once something is rendered after it has been created
            // Always create the flash, then create the page
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;