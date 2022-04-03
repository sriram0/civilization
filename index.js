$("#l2").hide(1000);
$("#l1").hide(1000);
data={
    r:{
        wood: 0,
        stone: 0,
        ore: 0,
    },
    b:{
        logger: 1,
        miner: 1
    },
    exp:0,
    l: [50, 0]
}

checkLvl = function(){
    if(data.exp >= data.l[0]){
        data.exp-=data.l[0];
        switch(data.l[1]){
            case 0:
                data.r.ingots=0;
                data.r.clay=0;
                data.r.brick=0;
                data.b.furnace=0;
                $("#l1").show(100);
                console.log("ys")
                data.l[1]++;
                data.l[0]+=25;
                break;
            case 1:
                data.r.food=0;
                data.r.people=0;
                data.b.farm=0;
                data.b.house=0;
                $("#l2").show(100);
                console.log("ys")
                data.l[1]++;
                data.l[0]+=25;
                break;
            default:
                console.log("error");
                break;
        }
        console.log(data)
    }
}

display = function(){
    $("#exp").text(data.exp+"/"+data.l[0])
    $("#wood").text(data.r.wood);
    $("#stone").text(data.r.stone);
    $("#ore").text(data.r.ore);
    $("#logger").text(data.b.logger);
    $("#miner").text(data.b.miner);
    if(data.l[1]>0){
        $("#clay").text(data.r.clay);
        $("#furnace").text(data.b.furnace);
        $("#brick").text(data.r.brick);
        $("#ingot").text(data.r.ingots);
    }
    if(data.l[1]>1){
        $("#food").text(data.r.food);
        $("#farm").text(data.b.farm);
        $("#people").text(data.r.people);
        $("#house").text(data.b.house);
    }
}

gather = function(type){
    switch(type){
        case "log":
            data.r.wood+=data.b.logger*3;
            data.exp+=1;
            break;
        case "mine":
            data.r.stone+=data.b.miner*2;
            data.r.ore+=data.b.miner;
            if(data.l[1]>0){
                data.r.clay+=data.b.miner;
            }
            data.exp+=1;
            break;
        case "smeltc":
            if(data.r.clay>=data.b.furnace){
                data.r.clay-=data.b.furnace;
                data.r.brick+=data.b.furnace;
                data.exp+=2;
            }else{
                data.r.brick+=data.r.clay;
                data.r.clay=0;
                data.exp+=2;
            }
            break;
        case "smelto":
            if(data.r.ore>=data.b.furnace){
                data.r.ore-=data.b.furnace;
                data.r.ingots+=data.b.furnace;
                data.exp+=2;
            }else{
                data.r.ingots+=data.r.ore;
                data.r.ore=0;
                data.exp+=2;
            }
            break;
        case "food":
            data.r.food+=data.b.farm;
            data.exp+=3;
            break;
        case "people":
            if(data.r.people<data.b.house*4 && data.r.food>=5){
                data.r.food-=5;
                data.r.people++;
                data.exp+=3;
            }
            break;
        default:
            console.log("hehhe");
            break;
    }
    checkLvl();
    display();
}

build = function(type){
    switch(type){
        case "log":
            if(data.r.wood>=12){
                data.b.logger++;
                data.r.wood-=12;
                data.exp+=2;
            }
            break;
        case "mine":
            if(data.r.wood>=8 && data.r.stone>=6){
                data.b.miner++;
                data.r.wood-=8;
                data.r.stone-=6;
                data.exp+=2;
            }
            break;
        case "smelt":
            if(data.r.wood>=2 && data.r.stone>=14){
                data.b.furnace++;
                data.r.wood-=2;
                data.r.stone-=14;
                data.exp+=2;
            }
            break;
        case "farm":
            if(data.r.wood>=10 && data.r.brick>=12){
                data.b.farm++;
                data.r.wood-=10;
                data.r.brick-=12;
                data.exp+=4;
            }
            break;
        case "house":
            if(data.r.brick>=7 && data.r.stone>=5){
                data.b.house++;
                console.log(data)
                data.r.brick-=7;
                data.r.stone-=5;
                data.exp+=3;
            }
            break;
        default:
            console.log("hehhe");
            break;
    }
    checkLvl();
    display();
}
