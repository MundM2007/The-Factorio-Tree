function getIronExp(){
    exp = new Decimal(2)
    if (hasUpgrade("s", 23)) exp = exp.add(1)
    return exp
}
function getIronGen(){
    let gain = player.s.points.pow(getIronExp())
    if (hasUpgrade("s", 15)) gain = gain.mul(2)
    if (hasUpgrade("s", 22)) gain = gain.mul(player.s.copper_plates.add(2).log2())
    return gain
}
function getCopperExp(){
    exp = new Decimal(1)
    if (hasUpgrade("s", 23)) exp = exp.add(1)
    return exp
}
function getCopperGen(){
    let gain = player.s.points.pow(getCopperExp())
    if (hasUpgrade("s", 15)) gain = gain.mul(2)
    if (hasUpgrade("s", 22)) gain = gain.mul(player.s.iron_plates.add(2).log2())
    return gain
}


addLayer("s", {
    name: "smelter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        iron_plates: new Decimal(0),
        copper_plates: new Decimal(0),
    }},
    color: "#EC1C24",
    requires: new Decimal(7), // Can be a function that takes requirement increases into account
    resource: "smelters", // Name of prestige currency
    baseResource: "seconds", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: function sLayerScalingExponent(){
        exponent = new Decimal(1.24)
        
        if(hasUpgrade("s", 14)) exponent = exponent.sub(0.24)

        return exponent
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for smelters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "milestones",
        ["display-text", 
            () => {
                if (!hasMilestone("s", 0)) return ""
                return `You have <h2 style="color: #707070; text-shadow: 0px 0px 10px #707070">${format(player.s.iron_plates)}</h2> iron plates<br>
                Your smelters are generating ${format(getIronGen())} iron plates per second (Formula: [smelters]^${format(getIronExp())})<br>
                You have <h2 style="color: #ffa982; text-shadow: 0px 0px 10px #ffa982">${format(player.s.copper_plates)}</h2> copper plates<br>
                Your smelters are generating ${format(getCopperGen())} copper plates per second (Formula: [smelters]^${format(getCopperExp())})`
            }
        ],
        "blank",
        "upgrades"
    ],
    layerShown(){return true},
    update(diff) {
        player.s.iron_plates = player.s.iron_plates.add(getIronGen().mul(diff))
        player.s.copper_plates = player.s.copper_plates.add(getCopperGen().mul(diff))
    },
    milestones: {
        0: {
            requirementDescription: "1 smelter",
            effectDescription: "Unlock the first row of upgrades and start producing iron and copper plates.",
            done() { return player.s.points.gte(1) }
        },
        1: {
            requirementDescription: "6 smelters",
            effectDescription: "Unlock the second row of upgrades and boost point gain by 1.04.",
            unlocked() { return hasMilestone("s", 0) },
            done() { return player.s.points.gte(6) }
        }
    },
    upgrades: {
        11: {
            title: "More Time",
            description: "Allocate more time to the game. Multiply seconds gain by 2.",
            cost: new Decimal(10),
            unlocked() {return hasMilestone("s", 0)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() { return player[this.layer]},
        },
        12: {
            title: "Electricity",
            description: "Build a Steam Engine. Increase the addition in the seconds formula (=AiF) by 1.3.",
            cost: new Decimal(100),
            unlocked() {return hasUpgrade("s",11)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() { return player[this.layer]},
        },
        13: {
            title: "More Time II",
            description: "Allocate even more time to the game. Increase AiF based on seconds.",
            cost: new Decimal(150),
            unlocked() {return hasUpgrade("s",12)},
            tooltip() {
                return "Formula: log2([smelters]+1)<br>^(4/3)"
            },
            effectDisplay() {
                return "+" + format(player.s.points.add(1).log(2).pow(4/3))
            },
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() { return player[this.layer]},
        },
        14: {
            title: "Electric Poles",
            description: "Spread Electricity. Decrease Smelter cost scaling exponent by 0.24 <br>(to 1).",
            cost: new Decimal(200),
            unlocked() {return hasUpgrade("s",13)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() { return player[this.layer]},
        },
        15: {
            title: "Research",
            description: "Unlock Research and Increase plates production by a factor of 2.",
            cost: new Decimal(750),
            unlocked() {return hasUpgrade("s",14)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() { return player[this.layer]},
        },
        21: {
            title: "More Time III",
            description: "More Time II now also boosts seconds gain at a reduced rate",
            cost: new Decimal(5000),
            unlocked() {return hasMilestone("s", 1)},
            tooltip() {
                return "Formula:<br>[More Time II Effect]^(0.5)"
            },
            effectDisplay() {
                return format(player.s.points.add(1).log(2).pow(4/3).pow(1/2)) + "x"
            },
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() { return player[this.layer]},
        },
        22: {
            title: "Automate Production",
            description: "iron and copper plates boost each other's production",
            cost: new Decimal(5000),
            unlocked() {return hasUpgrade("s",21)},
            tooltip() {
                return "Formula:<br>log2([Resource+2])"
            },
            effectDisplay() {
                return "<br>" + format(player.s.copper_plates.log2()) + "x (Iron) and <br>" + format(player.s.iron_plates.log2()) + "x (Copper)"
            },
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() { return player[this.layer]},
        },
        23: {
            title: "Logistics",
            description: "More efficient logistics leads to more plates. Exponents in the plates formulas are increased by 1.",
            cost: new Decimal(150000),
            unlocked() {return hasUpgrade("s",22)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() { return player[this.layer]},
        },
        24: {
            title: "Addicting!",
            description: "Seconds boosts it's own gain",
            cost: new Decimal(3500000),
            unlocked() {return hasUpgrade("s",23)},
            tooltip() {
                return "Formula:<br>[seconds+1]^(0.1)"
            },
            effectDisplay() {
                return format(player.points.pow(0.1)) + "x"
            },
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() { return player[this.layer]},
        },
        25: {
            title: "Finally a new Layer!",
            description: "Unlock the next layer and increase EiF by 0.135.",
            cost: new Decimal(5000000),
            unlocked() {return hasUpgrade("s",24)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() { return player[this.layer]},
        }
    }
})
