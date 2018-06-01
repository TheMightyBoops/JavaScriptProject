/***************************************************************************************
 * This has guidelines for creating both main and non-player characters for the game
 * in an instance of the game there will be a main character as well as an npc for them
 * to talk to.
 *
 * Lucas Nolting                                                                12/7/2017
 *****************************************************************************************/


// This constant sets the maximum number for a statistic
var STAT_MAX = 6;


function MainCharacter(name, age, gender, charisma, luck, intelligence, money) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.charisma = charisma;
    this.luck = luck;
    this.intelligence = intelligence;
    this.money = money;
}

function NPCharacter()
{
    // This constant tells the various functions how many different possible characters
    // There are... the arrays it references must be equal
    var NP_CHARACTERS = 3;


    var possibleNames = ["CyberDan", "Jimmy Legs", "Floyd"];
    var possibleDescriptions= [" tall, and stick-like", " dead looking", " firey tempered" ];

    // NPCharacter Constructors
    this.name = possibleNames[getRandomInt(0, NP_CHARACTERS)];//TODO These will all be random
    this.description = possibleDescriptions[getRandomInt(0, NP_CHARACTERS)];
    this.charisma = getRandomInt(1, STAT_MAX);
    this.luck = getRandomInt(1, STAT_MAX);
    this.intelligence = getRandomInt(1, STAT_MAX);

}

// This function is used to generate stats for characters. As well as iterate through arrays
// To decide what the npc will be like.
function getRandomInt(minNum, maxNum)
{
    // set the ceiling and floor for the
    // number to be generated
    var min = Math.ceil(minNum);
    var max = Math.floor(maxNum);
    // return the guess to the requests made
    // by generateComputerGuesses
    return Math.floor(Math.random() * (max - min))
        + min;
}