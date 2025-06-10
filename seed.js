(async function () {

    require("dotenv").config();

    const mongoose = require("mongoose");

    await mongoose.connect(process.env.MONGODB_URI);

    const Hero = require('./models/hero');


    const heroData = [
        {
    name: "Iron Man",
    description: "Genius billionaire Tony Stark in a high-tech armored suit.",
    ability: "Powered Armor Suit",
    cost: 200
  },
  {
    name: "Captain America",
    description: "Super-soldier with an indestructible vibranium shield.",
    ability: "Enhanced Strength & Agility",
    cost: 150
  },
  {
    name: "Thor",
    description: "Norse god of thunder wielding the enchanted hammer Mjolnir.",
    ability: "God of Thunder",
    cost: 300
  },
  {
    name: "Black Widow",
    description: "Highly trained spy and martial artist.",
    ability: "Espionage & Martial Arts",
    cost: 100
  },
  {
    name: "Hulk",
    description: "Scientist who transforms into a super-strong green behemoth.",
    ability: "Superhuman Strength",
    cost: 300
  },
  {
    name: "Spider-Man",
    description: "Simply The Greatest SuperHero In History",
    ability: "Wall-Crawling & Web-Shooting",
    cost: 200
  },
  {
    name: "Doctor Strange",
    description: "Master of the mystic arts and protector of reality.",
    ability: "Sorcery",
    cost: 250
  },
  {
    name: "You",
    description: "Just Do What You Can Bud.",
    ability: "Butter Knife",
    cost: 1
  },
  {
    name: "Black Panther",
    description: "King of Wakanda with enhanced strength and agility.",
    ability: "Vibranium Suit & Enhanced Reflexes",
    cost: 200
  },
  {
    name: "Scarlet Witch",
    description: "Powerful wielder of chaos magic and reality manipulation.",
    ability: "Reality Warping",
    cost: 300
  },
  {
    name: "James Clark",
    description: "I'm at the edge of my seat here Mate.",
    ability: "Reality Manipulation",
    cost: 800
  }
    ];

    // Delete all heroes to prevent duplicates
    await Hero.deleteMany({});

    const heroes = await Hero.create(heroData);

    console.log(heroes);

    process.exit();
})();