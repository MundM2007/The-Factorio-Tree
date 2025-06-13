let modInfo = {
	name: "The Factorio Tree",
	id: "thefactoriotreeMM07",
	author: "MundM2007",
	pointsName: "seconds",
	modFiles: ["smelters.js", "research.js", "tree.js", "mod_utils.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.0",
	name: "Red Science",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1.1</h3><br>
		- Improved formula display.<br>
		- More Time II now boosts point gain and More Time II AiF.<br>
		- changes More Time II formula.<br>
		- increased Finally a new layer! boost.<br>
		- changed order of upgrades 21 and 22 and of upgrades 23 and 24.<br>
		- added 1 milestone.<br>
		- changes the cost of last 4 upgrades and changed description of last upgrade.<br>
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
	let add = new Decimal(1.7)

	if(hasUpgrade("s",12)) add = add.add(1.3)
	if(hasUpgrade("s",22)) add = add.add(upgradeEffect("s", 22))
	
	return add
}


function getPointGenExp() {
	let exp = new Decimal(2)

	exp = exp.add(buyableEffect("r", 11))
	if(hasUpgrade("s",25)) exp = exp.add(0.182)
	
	return exp
}


function getPointGenRoot() {
	let root = new Decimal(1/2)
	return root
}


function getPointGenLog() {
	let log = new Decimal(10)
	return log
}


function getPointGenMul() {
	let mul = new Decimal(1)

	if(hasUpgrade("s",11)) mul = mul.mul(2)
	if(hasMilestone("s",1)) mul = mul.mul(1.165)
	if(hasUpgrade("s",13)) mul = mul.mul(upgradeEffect("s", 13))
	if(hasUpgrade("s",23)) mul = mul.mul(upgradeEffect("s", 23))
	
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
		let object = {
			op: "mul",
			args: [
				{
					op: "pow",
					args: [
						{
							op: "add",
							args: [
								{
									op: "pow",
									args: [
										{
											op: "log",
											args: [
												{
													variable: "seconds+1"
												},
												{
													value: getPointGenLog()
												}
											]
										},
										{
											value: getPointGenRoot()
										}
									]
								},
								{
									value: getPointGenAdd()
								}
							]
						},
						{
							value: getPointGenExp()
						}
					]
				},
				{
					value: getPointGenMul()
				}
			]
		}

		return "Your seconds amount is increasing to <br>" + formatFormula(object) + "<br>every second."
	}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("490607"))
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