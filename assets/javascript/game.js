var charArray = [];           //array that holds all characters
var charSelected = false;
var defSelected = false;
var userChar;                  
var enemyChar;           
var gameOver = false; 
var charDefeated = 0;     

function gameReset() {
    charArray = [
        char0 = {
            name: "Boba Fett",
            idName: "bobaFett",
            hp: 120,
            attPower: 9,
            counterAtt: 15,
            userChoice: false,
            defender: false,
            imageLink: "Boba-Fett.jpg"
        },
        char1 = {
            name: "Darth Maul",
            idName: "darthMaul",
            hp: 160,
            attPower: 6,
            counterAtt: 18,
            userChoice: false,
            defender: false,
            imageLink: "Darth-Maul.jpg"
        },
        char2 = {
            name: "Obi-Wan Kenobi",
            idName: "obiWan",
            hp: 130,
            attPower: 7,
            counterAtt: 20,
            userChoice: false,
            defender: false,
            imageLink: "Obi-Wan-Kenobi.jpg"
        },
        char3 = {
            name: "Yoda",
            idName: "yoda",
            hp: 150,
            attPower: 9,
            counterAtt: 17,
            userChoice: false,
            defender: false,
            imageLink: "Yoda.jpg"
        },
    ]

    charSelected = false;
    defSelected = false;
    gameOver = false; 
    charDefeated = 0; 

    // $("#title-display").empty();
    // $("#selection-display").empty();
    // $("#enemy-display").empty();
    // $("#defender-display").empty();
    // $("#stat-display").empty();

    var h2Title = $("<h2>");
    h2Title.addClass("tClass");
    h2Title.attr("id", "title1");
    h2Title.text("Your Character");
    $(h2Title).appendTo($("#title-display2"));

    for (var i = 0; i < charArray.length; i++) {
        var newDiv = $("<div>");
        newDiv.attr("id", charArray[i].idName);
        newDiv.addClass("hp-display");
        newDiv.attr("data-index", i);
        
        var newImg = $("<img>");
        newImg.addClass("img-size");
        newImg.attr("src", "assets/images/" + charArray[i].imageLink);

        var newCap = $("<p>");
        newCap.addClass("capClass");
        newCap.text(charArray[i].name + "\n" + charArray[i].hp);
        $(newDiv).append(newImg);
        $(newDiv).append(newCap);
        $("#selection-display").append(newDiv);
    }
};

gameReset();

function charSelection(charName) {
    for (var i = 0; i <charArray.length; i++) {
        if (charName !== charArray[i].name) {
            $(`#${charArray[i].idName}`).addClass("enemy");
            $("#enemy-display").append($(`#${charArray[i].idName}`));
        }
    }
    $("#title1").appendTo($("#title-display"));
};

function defenderSelection(charName) {
    for (var i = 0; i <charArray.length; i++) {
        if (charName === charArray[i].name && charArray[i].defender === true) {
            $(`#${charArray[i].idName}`).removeClass("enemy");
            $(`#${charArray[i].idName}`).addClass("defender");
            $("#defender-display").append($(`#${charArray[i].idName}`));
        }
    }
};

function charReturn(charIndex) {                            //returns current enemy to the enemy list
    for (var i = 0; i <charArray.length; i++) {
        if (i === charIndex && charArray[i].defender === true) {
            charArray[i].defender = false;
            $(`#${charArray[i].idName}`).removeClass("defender");
            $(`#${charArray[i].idName}`).addClass("enemy");
            $("#enemy-display").append($(`#${charArray[i].idName}`));
        }
    }
};

function removeChar(charName) {
    $(`#${charName}`).remove();
}

function statDisp(x) {                      //1.game lost  2.game won  3.enemy defeated
    $("#stat-display").empty();
    var newHead = $("<h3>");
    newHead.addClass("tClass");
    if (x === 1) {
        newHead.text("You Lost! GAME OVER!!");
    }
    else if (x === 2) {
        newHead.text("You won! GAME OVER!!");
    }
    else {
        newHead.text("You defeated " + enemyChar.name + ", you can choose another enemy to fight.");
    }
    
    $("#stat-display").append(newHead);
}


$(document).ready(function() {

    $("div.hp-display").on("click", function() {
        var index = $(this).attr("data-index");
        index = parseInt(index);
        // enemyChar = charArray[index];

        if(charSelected === false) {
            // charArray[index].userChoice = true;
            userChar = charArray[index]; 
            userChar.userChoice = true;
            charSelection(userChar.name);

            charSelected = true;
        }
        else if (defSelected === false && charArray[index].userChoice === false) {
            $("#stat-display").empty();
            enemyChar = charArray[index];
            enemyChar.defender = true;
            defenderSelection(charArray[index].name);

            defSelected = true;
        }
        else if (defSelected === true && charArray[index].defender === true) {
            charReturn(index);
            defSelected = false;
        }
    });

    $("button").on("click", function() {

        if($("#defender-display").is(":empty") && gameOver !== true) {
            alert("Opponent has not been selected");
        }
        else if (gameOver) {
            var restart = confirm("Would you like to play again?");
            if(restart) {
                location.reload();
                // gameReset();
            }
        }
        else {
            enemyChar.hp -= userChar.counterAtt;
            userChar.hp -= enemyChar.counterAtt;
            userChar.counterAtt += userChar.attPower;
            $("#defender-display .capClass").text(enemyChar.name + "\n" + enemyChar.hp);
            $("#selection-display .capClass").text(userChar.name + "\n" + userChar.hp);

            $("#stat-display").empty();
            var newHead = $("<h4>");
            newHead.addClass("tClass");
            newHead.html("You attacked " + enemyChar.name + " for " + userChar.counterAtt + " damage. <br/>" +
            enemyChar.name + " attacked you back for " + enemyChar.counterAtt + " damage.");
            $("#stat-display").append(newHead);

        }

        console.log("enemy: ", enemyChar.hp);
        console.log(charDefeated);
        if (userChar.hp <= 0) {
            statDisp(1);
            gameOver = true;
        }
        else if (enemyChar.hp <= 0 && charDefeated === 2) {
            removeChar(enemyChar.idName);
            statDisp(2);
            gameOver = true;
        }
        else if (enemyChar.hp <= 0) {
            statDisp(3);
            removeChar(enemyChar.idName);
            charDefeated += 1;
            defSelected = false;
        }

        // if (gameOver) {
        //     var restart = confirm("Would you like to play again?");
        //     if(restart) {
        //         gameReset();
        //     }
        // }

    });

});