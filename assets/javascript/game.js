var charArray = [];           //array that holds all characters
var charSelected = false;
var defSelected = false;
var userChar;                  
var enemyChar;                 

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
            // charArray[index].defender = true;
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

        if($("#defender-display").is(":empty")) {
            alert("Opponent has not been selected");
        }
        else {
            enemyChar.hp -= userChar.counterAtt;
            userChar.hp -= enemyChar.counterAtt;
            userChar.counterAtt += userChar.attPower;
            $("#defender-display .capClass").text(enemyChar.name + "\n" + enemyChar.hp);
            $("#selection-display .capClass").text(userChar.name + "\n" + userChar.hp);
        }

    });

});