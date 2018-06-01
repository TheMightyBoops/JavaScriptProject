//***NOTE the unbind() calls make everything not explode, put one on every click.**
// This is calls all functions that will need to be run to play the game
$(function(){
    //hide unused windows
    $('.game').hide();
    //global vars
    var player;
    var npc;
    var scenario;
    var totalStats;
    var money = 0;

    if(getCookie("name") != null) {
        $('#current').html("Current character: " + getCookie("name"));
        $('#create').attr('value','Continue');
    }
    // If there is a cookie of a character in the form
    // this removes it.
    $('#erase').off('click').on('click', function () {
        eraseCookie("name");
        eraseCookie("age");
        eraseCookie("gender");
        eraseCookie("ch");
        eraseCookie("lu");
        eraseCookie("int");
        eraseCookie("money");
        $('#current').html("Current character: ");
        $('#create').attr('value','Create');
    });

    // First ask the user to create a character
    $('#create').off('click').on( 'click', function(){
            var $name = $('#name').val();
            var $age = $('#age').val();
            var $gender = $('#gender').val();
            var $charisma = parseInt($('#charisma').val());
            var $luck = parseInt($('#luck').val());
            var $intelligence = parseInt($('#intelligence').val());
            totalStats = 0;
            totalStats = $charisma + $luck + $intelligence;
            //get any existing cookies and assign them to the character
            if(getCookie("name") != null && getCookie("money") != null) {
                $name = getCookie("name");
                $age = getCookie("age");
                $gender = getCookie("gender");
                $charisma = parseInt(getCookie("ch"));
                $luck = parseInt(getCookie("lu"));
                $intelligence = parseInt(getCookie("int"));
                money = parseInt(getCookie("money"));
            }
            // Create a new main character
            player = new MainCharacter($name, $age, $gender, $charisma, $luck, $intelligence, money);
            // Check to make sure there are no blank fields.
            // if they are all filled out hide the creator.
            if(player.name != "" && player.age != "" && player.gender!= "" &&
                totalStats <= 9) {

                $('#characterCreator').hide();
                $('#error').hide();
                //show the button to allow the start of a scenario
                $('#start').show();
                //if the character is valid copy them to appear in this form
                var DAY = 1;
                //name
                setCookie("name", $name, DAY);
                //age
                setCookie("age", $age, DAY)
                //gender
                setCookie("gender", $gender, DAY);
                //ch
                setCookie("ch", $charisma, DAY);
                //lu
                setCookie("lu", $luck, DAY);
                //int
                setCookie("int", $intelligence, DAY);
                //money
                //setCookie("money", parseInt(getCookie("money")), DAY)


            } else if(totalStats > 9) {
                // make sure stats are valid
                $('#error').html("You cannot assign more than 9 points").css('color', 'black');

            } else {
                // make sure all fields are filled in
                $('#error').html("You have missed a field").css('color', 'black');
            }
        });


    // This code takes a player through a newly generated scenario
    $('#start').unbind().click(function(){
        // hide any leftovers from the last game
        $('.game').hide();
        $(this).hide();
        //update the cookie that holds player money
        setCookie("money", player.money, 1);
        //Always display money that the character has
        $('#money').html(player.money + " cr.");
        // Show the intro and char decisions
        $('#intro').show();
        $('[name="playerDecision"]').show();
        //Generate a np character for the scenario
        npc = new NPCharacter();
        // This allows stats to be compared to have different decisions in the scenario
        var playerStatToCompare = [player.charisma, player.luck, player.intelligence];
        var npcStatToCompare = [npc.charisma, npc.luck, npc.intelligence];
        var statToCompareIndex, statToCompareIndex2;
        // holds the rewards and consequences for different scenarios
        var rewOrcon = [0, 0, 0, 0];


        //Generate a new scenario
        scenario = new Scenario(player, npc);
        var scenarioIndex = scenario.scenario;
        //decide which stat is compared based on
        switch(scenarioIndex) {
            case 0:
                // This one is based on charisma
                statToCompareIndex = 0;
                // Based on int
                statToCompareIndex2= 2;
                break;
            case 1:
                // This one is based on intelligence
                statToCompareIndex = 2;
                // This one is based on luck
                statToCompareIndex2 = 1;
                break;
            case 2:
                // Int again
                statToCompareIndex = 2;
                // This one is based on luck
                statToCompareIndex2 = 1;
                break;
        }

        // decide rewards and consequences based on scenario
        // notes on the first help match index with which story
        // chunk they go with.
        if(scenarioIndex === 0) {
            // posRebuttal
            rewOrcon[0] = 8;
            // negRebuttal
            rewOrcon[1] = 5;
            // posNoEnding
            rewOrcon[2] = 1;
            // negNoEnding
            rewOrcon[3] = -5;
        }else if(scenarioIndex === 1) {
            rewOrcon[0] = -5;
            rewOrcon[1] = 0;
            rewOrcon[2] = 1;
            rewOrcon[3] = 0;
        } else if(scenarioIndex === 2) {
            rewOrcon[0] = -5;
            rewOrcon[1] = 0;
            rewOrcon[2] = 1;
            rewOrcon[3] = -5;
        }

        $('#intro').html(scenario.intro);
        // Decide which dialogue to show based on the player selection
        $('#yes').unbind().click(function () {
            $('[name="playerDecision"]').hide();
            $('#intro').hide();
            // Show positive npc decision
            $('#posNPDecision').show().html(scenario.posNPDecision);
            //now check stats to decide if you get a bonus because
            //youre charming
            $('#next').unbind().show().click(function(){
                if(playerStatToCompare[statToCompareIndex] >= npcStatToCompare[statToCompareIndex]) {
                    $('#posNPDecision').hide();
                    $('#posRebuttal').show().html(scenario.posRebuttle);
                    player.money = player.money + rewOrcon[0];
                } else {
                    $('#posNPDecision').hide();
                    $('#negRebuttal').show().html(scenario.negRebuttle);
                    player.money = player.money + rewOrcon[1];
                }
                // send the player back to the beginning
                $(this).unbind().click(function(){
                    $('#start').attr('value','restart').show();
                    $(this).hide();
                });
            });

        });
        // Game Ends
        $('#no').unbind().click(function(){
            $('[name="playerDecision"]').hide();
            $('#intro').hide();
            // show ending dialogue
            $('#negNPDecision').show().html(scenario.negNPDecision);
            $('#next').unbind().show().click(function () {
                // check for outcome of part 2
                if(playerStatToCompare[statToCompareIndex2] <= npcStatToCompare[statToCompareIndex2]) {
                    $('#negNPDecision').hide();
                    $('#posNoEnding').show().html(scenario.posNoEnding);
                    player.money = player.money + rewOrcon[2];
                } else {
                    $('#negNPDecision').hide();
                    $('#negNoEnding').show().html(scenario.negNoEnding);
                    player.money = player.money + rewOrcon[3];}
                // send the player back to the beginning
                $('#start').attr('value','restart').show();
                $(this).hide();

            });
        });
    });
});

