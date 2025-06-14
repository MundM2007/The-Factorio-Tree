let modInfo = {
	name: "The Factorio Tree",
	id: "thefactoriotreeMM07",
	author: "MundM2007",
	pointsName: "seconds",
	modFiles: ["smelters.js", "assemblers.js", "research.js", "info.js", "tree.js", "mod_utils.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2.0",
	name: "Assemblers!",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.2.0: Assemblers!</h3><br>
		- Added 1 Layer + 1 Information Layer.<br>
		- Added 3 Resources.<br>
		- Added 10 Upgrades.<br>
		- Added 5 Milestones.<br>
		- Added 3 Challenges.<br>
		- Added 3 Infoboxes.<br>
		- Added automation<br>
		- Current Endgame: 1.14e17 seconds<br>
	<h3>v0.1.2</h3><br>
		- changed second formula display.<br>
	<h3>v0.1.1</h3><br>
		- Improved formula display.<br>
		- More Time II now boosts point gain and More Time II AiF.<br>
		- changed More Time II formula.<br>
		- increased Finally a new layer! boost.<br>
		- changed order of upgrades 21 and 22 and of upgrades 23 and 24.<br>
		- added 1 milestone.<br>
		- changed the cost of the last 4 upgrades and changed description of the last upgrade.<br>
		- Current Endgame: 490,607 seconds<br>
	<h3>v0.1.0: Red Science</h3><br>
		- Added 2 Layers.<br>
		- Added 4 resources.<br>
		- Added 10 upgrades.<br>
		- Added 2 milestones.<br>
		- Added 1 buyable.<br>
		- Current Endgame: 125,832 seconds.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}


function getPointGenAdd() {
	if(inChallenge("a", 13)) return tmp.a.challenges[13].challengeNerf
	let add = new Decimal(1.7)

	if(hasUpgrade("s",12)) add = add.add(1.3)
	if(hasUpgrade("s",22)) add = add.add(upgradeEffect("s", 22))
	if(hasUpgrade("a",11)) add = add.add(1.3)
	if(hasUpgrade("a",15)) add = add.add(0.35)
	
	return add
}


function getPointGenExp() {
	if(inChallenge("a", 12)) return tmp.a.challenges[12].challengeNerf
	let exp = new Decimal(2)

	//add
	exp = exp.add(buyableEffect("r", 11))
	if(hasUpgrade("s",25)) exp = exp.add(0.182)
	if(hasUpgrade("s",32)) exp = exp.add(upgradeEffect("s", 32))
	if(hasUpgrade("a",15)) exp = exp.add(0.35)
	
	//mul
	if(hasUpgrade("s",31)) exp = exp.mul(1.25)
	
	return exp
}


function getPointGenRoot() {
	let root = new Decimal(1/2)

	if(hasUpgrade("s",34)) root = root.add(0.22)

	return root
}


function getPointGenLog() {
	let log = new Decimal(10)
	return log
}


function getPointGenMul() {
	if(inChallenge("a", 11)) return tmp.a.challenges[11].challengeNerf
	let mul = new Decimal(1)

	if(hasUpgrade("s",11)) mul = mul.mul(2)
	if(hasMilestone("s",1)) mul = mul.mul(1.165)
	if(hasUpgrade("s",13)) mul = mul.mul(upgradeEffect("s", 13))
	if(hasUpgrade("s",23)) mul = mul.mul(upgradeEffect("s", 23))
	if(hasMilestone("s",4)) mul = mul.mul(1.456)
	if(hasUpgrade("a",15)) mul = mul.mul(5)
	
	return mul
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new Decimal(0)

	return player.points.add(1)
		.log(getPointGenLog())
		.pow(getPointGenRoot())
		.add(getPointGenAdd())
		.pow(getPointGenExp())
		.mul(getPointGenMul())
		.sub(player.points)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){
		return `A = ${format(getPointGenLog())};
				B = ${format(getPointGenRoot())};
				C = ${format(getPointGenAdd())};
				D = ${format(getPointGenExp())};
				E = ${format(getPointGenMul())}<br>
			Because of these values your seconds amount is increasing to<br>(((logA([seconds+1])^B)+C)^D)*E every second.`
	}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1.14e17"))
}


// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}