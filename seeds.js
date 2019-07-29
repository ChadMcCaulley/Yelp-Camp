var mongoose   = require("mongoose"),
    Comment    = require("./models/comment"),
    Campground = require("./models/campground");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3805/9667057875_90f0a0d00a.jpg",
        price: 20.00,
        description: "As with any trails off the Tioga Road, the road itself needs to be open (June through October, roughly). For safety reasons, it's probably best avoided when you can spot snow on top of the mountain or when there are thunderstorms in the area. Low-flying clouds of any variety, for that matter, can envelop you and muck up the views; it's not for nothing that Clouds Rest got its name."
    },
    {
        name: "Fall Trail",
        image: "https://farm6.staticflickr.com/5059/5518252117_d232831997.jpg",
        price: 10.00,
        description: "One of Yosemite's oldest historic trails (built 1873 to 1877), the Yosemite Falls Trail leads to the top of North America’s tallest waterfall, which rises 2,425 feet (739 m) above the Valley floor. This trail starts near Camp 4, along the Valley Loop Trail, and immediately begins its climb, switchback after switchback, through oak woodland. You will begin to climb above some trees and into exposed plateaus that offer you a glimpse of what's to come: great views of Yosemite Valley and its many iconic landforms. Do not stray off of the maintained path, as you will find steep drops adjacent to the trail."
    },
    {
        name: "Gold Moutains",
        image: "https://farm6.staticflickr.com/5334/9925256586_c06d949b3e.jpg",
        price: 15.00,
        description: "This is an HDR infrared image taken at the Fish Creek Campground on Lake McDonald, in Glacier National Park (Montana). From this vantage point we can see Mount Cannon on the right hand side. Photo was taken with a Nikon D300 on August 30, 2013. (IR wavelength is 665nm)."
    },
    {
        name: "American River",
        image: "https://farm4.staticflickr.com/3565/3692463175_b88a3d2c7a.jpg",
        price: 15.00,
        description: "walking up the North Fork of the American River"
    },
        {
        name: "Valley of Fire",
        image: "https://farm5.staticflickr.com/4466/36822405663_e579168610.jpg",
        price: 12.00,
        description: "Beautiful red rock formations and cave systems"
    },
    {
        name: "Savage River, Denali, Alaska",
        image: "https://farm8.staticflickr.com/7076/7223411160_8838b82055.jpg",
        price: 7.50,
        description: "Savage River near the Savage River Campground in Denali National Park, Alaska."
    },
    {
        name: "Havasu Falls on path to campground - Grand Canyon",
        image: "https://farm8.staticflickr.com/7021/6571748351_80ee449b23.jpg",
        price: 12.50,
        description: "From the travertine, you can see that the falls used to cover this entire face. The flood of 1978(?) knocked 32 feet off the falls and created a channel. The flood of 2008 knocked an additional 8 feet off the falls and removed the old double channel."
    }
]

function seedDB(){
  // Remove all Campgrounds
  Campground.remove({}, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Removed campgrounds!');
        Comment.remove({}, function(err) {
          if (err) {
              console.log(err);
          } else {
              console.log("removed comments!");
               data.forEach(function(seed){
                 Campground.create(seed, function(err, campground){
                   if(err){
                       console.log(err);
                   } else {
                       console.log("added a campground");
                    //   Comment.create({
                    //      text: "This place is great, but I wish it had internet",
                    //      author: "Homer"
                    //   }, function(err, comment) {
                    //      if(err){
                    //          console.log(err);
                    //      } else{
                    //          campground.comments.push(comment._id);
                    //          campground.save();
                    //          console.log("created new comment");
                    //      }
                    //   });
                   }
                 });
               });
          }
        });
    }
  });
}
    
module.exports = seedDB;