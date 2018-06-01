function Scenario(playerCharacter, npcCharacter) {
    // Here are all of the types out scenarios, they are separated
    // from the constructor logic to make things look less cluttered
    // Scenario 1:
    var intro1 = "The " + npcCharacter.description + " " + npcCharacter.name + " stumbles into the bar. " +
        npcCharacter.name + ": I need your help! " +  " (Awkward Silence) " +
        npcCharacter.name + ": Okay, Ill start... I guess. I need you to hold onto these cyber-drugs for me!";
    var posNPDecision1 =  npcCharacter.name +": Thanks, here's a cut of the creds. ";
    var negNPDecision1 =  npcCharacter.name +
        ": I should have known you weren't a Friend now the feds are going to send me to a work colony!";
    // the rebuttals are decided  by a player's stats they decide any rewards or consequences for the player
    var posRebuttal1 =  playerCharacter.name +
        ": You realize if I do this for you, I need hazard-pay, because now it's on me. I want more. (creds + 8)";
    var negRebuttal1 = playerCharacter.name + ": ok, but get out of here! (creds + 5)";
    var posNoEnding1 = playerCharacter.name + ": Hey, it's not personal, it's just in these times you know how long " +
        "I could go away for. (" + npcCharacter.name + " understands, sits down and orders a beer (creds +1)";
    var negNoEnding1 = playerCharacter.name + ": Get out! (" + npcCharacter.name + " stares deep into your eyes and " +
        " takes 5 creds off the bar before running out.(creds -5))";

    //Scenario 2:
    var intro2 = "The " + npcCharacter.description + " " + npcCharacter.name + " strides to the bar. " +
        npcCharacter.name + ": Hey can you tell me what this is worth, or even what it is?";
    var posNPDecision2 =  npcCharacter.name + ": Thanks, " + playerCharacter.name +
        " someone said you knew a bunch about government issue gear.";
    var negNPDecision2 = npcCharacter.name +
        ": Well I'll keep looking. Give me a beer, I'm sure someone in here will know (creds +1)";

    var posRebuttal2 = playerCharacter.name + ": Yeah, this is definitely one of the taps those crooks use to skim info." +
    " You need to find somewhere to hide quickly. We never talked. Here's some creds, I can owe some people. You need this"
    + "(-5 creds)";

    var negRebuttal2 =  playerCharacter.name +
        ": Yes, well um this is um, a Children's Recorder? I wouldn't hassle yourself too much with government paranoia. " +
        "They probably have better people to be looking for. Don't sweat it.";
    var posNoEnding2 = " (A duster wearing haggard man walks in.)" + npcCharacter.name  +": Do you have any idea what... " +
        "(Before your new friend can finish the man crushes the device in his palm and tells " + npcCharacter.name +
        "to run. The man sits and orders a beer (creds +1)";
    var negNoEnding2 = "(" + playerCharacter.name +
        " sits at the bar until close. You shuffle them home and it's the last " + "time you ever see them.)";

    //Scenario 3
    var intro3 = npcCharacter.name + ", looking " + npcCharacter.description + ". " + npcCharacter.name+
    ": Hey " + playerCharacter.name + " I got info, if you got creds.";
    var posNPDecision3 = npcCharacter.name + ": You know the shipment of neural mods going to the Hayasaki clinic today?" +
        " Every last one is defective, but on purpose. Something big is happening.";
    var negNPDecision3 = npcCharacter.name + ": just give me a beer than. Maybe after a few you'll rethink it.";
    var posRebuttal3 = playerCharacter.name + ": We have to stop this, I'll try to get in contact with someone at the " +
        "clinic, we have to work fast. I'll go make a call. (creds -5)";
    var negRebuttal3 = playerCharacter.name + ": I want my five dollars back. You know that the good people at " +
        "Hayasaki would never hurt anyone! (You get your 5 creds back)";
    var posNoEnding3 = playerCharacter.name + ": I assure you I won't... (as " + npcCharacter.name +
    " leans over a piece of cyberNote falls out, still open reading --memo: ALL HAYASAKI IMPLANTS IN SHIPMENT DEFECTIVE--"
    + " you smile) " + playerCharacter.name + ": That will be a cred (cred + 1)";
    var negNoEnding3 = playerCharacter.name + ": I assure you I won't be spending that much coin on something "
        + "so potentially trivial. (" + npcCharacter.name + " finally finds someone to buy his info and they both" +
        " run out without paying their tabs (creds -5)";






    // These parallel
    // Arrays are all the possible scenarios a NPC can
    // be assigned.
    var intro = [intro1, intro2, intro3];
    var posNPDecision = [posNPDecision1, posNPDecision2, posNPDecision3];
    var negNPDecision = [negNPDecision1, negNPDecision2, negNPDecision3];
    var posRebuttal = [posRebuttal1, posRebuttal2, posRebuttal3];
    var negRebuttal = [negRebuttal1, negRebuttal2, negRebuttal3];
    var posNoEnding = [posNoEnding1, posNoEnding2, posNoEnding3];
    var negNoEnding = [negNoEnding1, negNoEnding2, negNoEnding3];
    //Roll a Scenario
    var scenario = getRandomInt(0, 3);

    this.scenario = scenario;
    this.intro = intro[scenario];
    this.posNPDecision = posNPDecision[scenario];
    this.negNPDecision = negNPDecision[scenario];
    this.posRebuttle = posRebuttal[scenario];
    this.negRebuttle = negRebuttal[scenario];
    this.posNoEnding = posNoEnding[scenario];
    this.negNoEnding = negNoEnding[scenario];




}


