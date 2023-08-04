const mongoose = require("mongoose");
const cities = require("./cities");
const {
    places,
    descriptors
} = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/camp-advisor");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const imgArray = [
    "https://source.unsplash.com/collection/9046579",
    "https://source.unsplash.com/collection/429524",
    "https://source.unsplash.com/collection/2319173",
    "https://source.unsplash.com/collection/973270",
    "https://source.unsplash.com/collection/10489597",
    "https://source.unsplash.com/collection/8569700",
    "https://source.unsplash.com/collection/2029045",
    "https://source.unsplash.com/collection/9326440",
    "https://source.unsplash.com/collection/11650954",
    "https://source.unsplash.com/collection/1583359",
    "https://source.unsplash.com/collection/4803919"
]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 30; i++) {
        const randomCity = Math.floor(Math.random() * 144);
        const randomImageIndex = Math.floor(Math.random() * imgArray.length); // Generate a random index for imgArray
        const price = Math.floor(Math.random() * 30) + 10
        const camp = new Campground({
            location: `${cities[randomCity].city}, ${cities[randomCity].admin_name}`,
            title: `${sample(places)} ${sample(descriptors)}`,
            image: imgArray[randomImageIndex], // Use the randomly selected image URL from imgArray
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[randomCity].lat,
                    cities[randomCity].lng,
                ]
            },
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});