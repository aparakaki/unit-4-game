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
            attPower: 8,
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

    for (var i = 0; i < charArray.length; i++) {
        var newDiv = $("<div>");
        newDiv.attr("id", charArray[i].idName);
        newDiv.addClass("hp-display");
        newDiv.attr("data-index", i);
        // newDiv.text(charArray[i].name + "\n" + charArray[i].hp);
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
            if(charArray[i].idName === "bobaFett") {
                $("#enemy-display").append($("#bobaFett"));
            }
            else if(charArray[i].idName === "darthMaul") {
                $("#enemy-display").append($("#darthMaul"));
            }
            else if(charArray[i].idName === "obiWan") {
                $("#enemy-display").append($("#obiWan"));
            } 
            else if(charArray[i].idName === "yoda") {
                $("#enemy-display").append($("#yoda"));
            } 
        }
    }
    $("#title1").appendTo($("#title-display"));
};

function defenderSelection(charName) {
    for (var i = 0; i <charArray.length; i++) {
        if (charName === charArray[i].name && charArray[i].defender === true) {
            if(charArray[i].idName === "bobaFett") {
                $("#defender-display").append($("#bobaFett"));
            }
            else if(charArray[i].idName === "darthMaul") {
                $("#defender-display").append($("#darthMaul"));
            }
            else if(charArray[i].idName === "obiWan") {
                $("#defender-display").append($("#obiWan"));
            } 
            else if(charArray[i].idName === "yoda") {
                $("#defender-display").append($("#yoda"));
            } 
        }
    }
};

function charReturn(charIndex) {
    for (var i = 0; i <charArray.length; i++) {
        if (i === charIndex && charArray[i].defender === true) {
            charArray[i].defender = false;
            if(charArray[i].idName === "bobaFett") {
                $("#enemy-display").append($("#bobaFett"));
            }
            else if(charArray[i].idName === "darthMaul") {
                $("#enemy-display").append($("#darthMaul"));
            }
            else if(charArray[i].idName === "obiWan") {
                $("#enemy-display").append($("#obiWan"));
            } 
            else if(charArray[i].idName === "yoda") {
                $("#enemy-display").append($("#yoda"));
            } 
        }
    }
};

function removeChar(charName) {
    if(charName === "bobaFett") {
        $("#bobaFett").remove();
    }
    else if(charName === "darthMaul") {
        $("#darthMaul").remove();
    }
    else if(charName === "obiWan") {
        $("#obiWan").remove();
    } 
    else if(charName === "yoda") {
        $("#yoda").remove();
    } 
}


$(document).ready(function() {

    $("div.hp-display").on("click", function() {
        console.log("img clicked");
        var index = $(this).attr("data-index");
        index = parseInt(index);
        enemyChar = charArray[index];

        if(charSelected === false) {
            // charArray[index].userChoice = true;
            userChar = charArray[index];
            userChar.userChoice = true;
            charSelection(userChar.name);

            charSelected = true;
        }
        else if (defSelected === false && enemyChar.userChoice === false) {
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

        console.log("user: ", userChar.hp);
        console.log("enemy: ", enemyChar.hp);
        if (userChar.hp <= 0) {
            $("#stat-display").empty();
            var newHead = $("<h3>");
            newHead.addClass("tClass");
            newHead.text("You Lost! GAME OVER!!");
            $("#stat-display").append(newHead);
            gameOver = true;
        }
        else if (enemyChar.hp <= 0 && charDefeated === 2) {
            removeChar(enemyChar.idName);
            $("#stat-display").empty();
            var newHead = $("<h3>");
            newHead.addClass("tClass");
            newHead.text("You won! GAME OVER!!");
            $("#stat-display").append(newHead);
            gameOver = true;
        }
        else if (enemyChar.hp <= 0) {
            $("#stat-display").empty();
            var newHead = $("<h3>");
            newHead.addClass("tClass");
            newHead.text("You defeated " + enemyChar.name + ", you can choose another enemy to fight.");
            $("#stat-display").append(newHead);
            removeChar(enemyChar.idName);
            charDefeated += 1;
            defSelected = false;
        }

    });

});