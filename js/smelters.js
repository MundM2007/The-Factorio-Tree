addLayer("s", {
    name: "smelter",
    symbol: "S",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        iron_plates: new Decimal(0),
        copper_plates: new Decimal(0),
    }},
    color: "#EC1C24",
    requires: new Decimal(7),
    resource: "smelters",
    baseResource: "seconds",
    baseAmount() {return player.points},
    type: "static",
    base: new Decimal(2),
    exponent: function sLayerScalingExp(){
        let exp = new Decimal(1.24)
        
        if(hasUpgrade("s", 14)) exp = exp.sub(0.24)

        return exp
    },
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    directMult(){
        let mult = new Decimal(1)

        if(hasMilestone("s", 3)) mult = mult.mul(1.5)
        if(hasUpgrade("s", 33)) mult = mult.mul(upgradeEffect("s", 33))

        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    row: 0,
    hotkeys: [
        {key: "s", description: "S: Reset for smelters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", 
                    () => {
                        if (!hasMilestone("s", 0)) return ""
                        return `You have <h2 style="color: #707070; text-shadow: 0px 0px 10px #707070">${format(player.s.iron_plates)}</h2> iron plates<br>
                        Your smelters are generating ${format(tmp.s.iron_plates.getGain)} iron plates per second <br>Production ${getStandardFormula("s", "iron_plates")}<br>
                        You have <h2 style="color: #ffa982; text-shadow: 0px 0px 10px #ffa982">${format(player.s.copper_plates)}</h2> copper plates<br>
                        Your smelters are generating ${format(tmp.s.copper_plates.getGain)} copper plates per second <br>Production ${getStandardFormula("s", "copper_plates")}`
                    }
                ],
                "blank",
                "upgrades"
            ]
        },
        "Milestones": {
            content: [
                "milestones"
            ]
        }
    },
    layerShown(){return true},
    update(diff) {
        player.s.iron_plates = player.s.iron_plates.add(tmp.s.iron_plates.getGain.mul(diff))
        player.s.copper_plates = player.s.copper_plates.add(tmp.s.copper_plates.getGain.mul(diff))
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, [])
    },
    resetsNothing(){
        return hasMilestone("a", 4)
    },
    automate(){
        let autoUpgrade = []
        if(hasMilestone("a", 1)){
            autoUpgrade.push(11, 12, 13, 14, 15, 21, 22, 23, 24, 25)
        }
        if(hasMilestone("a", 2)){
            autoUpgrade.push(31, 32, 33, 34, 35)
        }

        for (let i = 0; i < autoUpgrade.length; i++) {
            buyUpgrade("s", autoUpgrade[i])
        }
    },
    autoPrestige() {
        return hasMilestone("a", 2)
    },
    iron_plates: {
        getExp(){
            let exp = new Decimal(2)
            if (hasUpgrade("s", 24)) exp = exp.add(1)
            if (hasUpgrade("a", 32)) exp = exp.add(3)

            if (hasUpgrade("a", 14)) exp = exp.mul(1.5)
            return exp
        },
        getMul(){
            let mul = new Decimal(1)
            if (hasUpgrade("s", 15)) mul = mul.mul(2)
            if (hasUpgrade("s", 21)) mul = mul.mul(tmp.s.upgrades[21].effectToIron)
            if (hasUpgrade("a", 12)) mul = mul.mul(100)
            mul = mul.mul(challengeEffect("a", 11))
            if (hasUpgrade("s", 35)) mul = mul.mul(5)
            if (hasMilestone("a", 2)) mul = mul.mul(50)
            if (hasUpgrade("a", 21)) mul = mul.mul(tmp.a.upgrades[21].effectToIron)
            if (hasUpgrade("a", 34)) mul = mul.mul(100)
            return mul
        },
        getGain(){
            let gain = player.s.points.pow(tmp.s.iron_plates.getExp)
            gain = gain.mul(tmp.s.iron_plates.getMul)
            return gain
        }
    },
    copper_plates: {
        getExp(){
            let exp = new Decimal(1)
            if (hasUpgrade("s", 24)) exp = exp.add(1)
            if (hasUpgrade("a", 32)) exp = exp.add(2)

            if (hasUpgrade("a", 14)) exp = exp.mul(1.5)
            return exp
        },
        getMul(){
            let mul = new Decimal(1)
            if (hasUpgrade("s", 15)) mul = mul.mul(2)
            if (hasUpgrade("s", 21)) mul = mul.mul(tmp.s.upgrades[21].effectToCopper)
            if (hasMilestone("s", 2)) mul = mul.mul(3)
            if (hasUpgrade("a", 12)) mul = mul.mul(100)
            mul = mul.mul(challengeEffect("a", 11))
            if (hasUpgrade("s", 35)) mul = mul.mul(5)
            if (hasMilestone("a", 2)) mul = mul.mul(50)
            if (hasUpgrade("a", 21)) mul = mul.mul(tmp.a.upgrades[21].effectToCopper)
            if (hasMilestone("a", 4)) mul = mul.mul(4)
            if (hasUpgrade("a", 34)) mul = mul.mul(100)
            return mul
        },
        getGain(){
            let gain = player.s.points.pow(tmp.s.copper_plates.getExp)
            gain = gain.mul(tmp.s.copper_plates.getMul)
            return gain
        }
    },
    milestones: {
        0: {
            requirementDescription: "1 smelter",
            effectDescription: "Unlock the first row of upgrades and start producing iron and copper plates.",
            done() {return player.s.points.gte(1)}
        },
        1: {
            requirementDescription: "6 smelters",
            effectDescription: "Unlock the second row of upgrades and boost point gain by 1.165.",
            unlocked() {return hasMilestone("s", 0)},
            done() {return player.s.points.gte(6)},
        },
        2: {
            requirementDescription: "15 smelters",
            effectDescription: "Unlock the next reset layer and multiply copper plates production by 3.",
            unlocked() {return hasMilestone("s", 1)},
            done() {return player.s.points.gte(15)},
        },
        3: {
            requirementDescription: "18 smelters",
            effectDescription: "Smelters gain is multiplied by 1.5.",
            unlocked() {return hasMilestone("s", 2) && hasUpgrade("a", 11)},
            done() {return player.s.points.gte(18)},
        },
        4: {
            requirementDescription: "27 smelters",
            effectDescription: "Seconds gain is multiplied by 1.456.",
            unlocked() {return hasMilestone("s", 3)},
            done() {return player.s.points.gte(27)},
        },
        5: {
            requirementDescription: "154 smelters",
            effectDescription(){return "Automation Science's effect is increased by 0.04353 per buyable bought."},
            unlocked() {return hasMilestone("s", 4) && hasMilestone("a", 2)},
            done() {return player.s.points.gte(154)}
        },
        6: {
            requirementDescription: "380 smelters",
            effectDescription(){return "Multiply belts and inserters production by 10 and seconds gain by 1.5."},
            unlocked() {return hasMilestone("s", 5) && hasMilestone("a", 5)},
            done() {return player.s.points.gte(380)}
        }
    },
    upgrades: {
        11: {
            title: "More Time",
            description: "Allocate more time to the game. Multiply seconds gain (E) by 2.",
            cost: new Decimal(10),
            unlocked() {return hasMilestone("s", 0)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        12: {
            title: "Electricity",
            description: "Build a Steam Engine. Increase the addition in the seconds formula (C) by 1.3.",
            cost: new Decimal(100),
            unlocked() {return hasUpgrade("s",11)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        13: {
            title: "More Time II",
            description: "Allocate even more time to the game. Multiply seconds gain (E) based on smelters.",
            cost: new Decimal(150),
            unlocked() {return hasUpgrade("s",12)},
            tooltip() {
                return "Formula: log2([smelters])<br>^(1.5)+0.025"
            },
            effect() {
                return Decimal.max(1, player.s.points.log(2).pow(3/2).add(0.025))
            },
            effectDisplay() {
                return "x" + format(this.effect())
            },
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        14: {
            title: "Electric Poles",
            description: "Spread Electricity. Decrease Smelter cost scaling exponent by 0.24 <br>(to 1).",
            cost: new Decimal(200),
            unlocked() {return hasUpgrade("s",13)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        15: {
            title: "Research",
            description: "Unlock Research and Increase plates production by a factor of 2.",
            cost: new Decimal(750),
            unlocked() {return hasUpgrade("s",14)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        21: {
            title: "Automate Production",
            description: "iron and copper plates boost each other's production",
            cost: new Decimal(5000),
            unlocked() {return hasMilestone("s", 1)},
            tooltip() {
                return "Formula:<br>log2([Resource])"
            },
            effectToIron() {
                return Decimal.max(1, player.s.copper_plates.log2())
            },
            effectToCopper() {
                return Decimal.max(1, player.s.iron_plates.log2())
            },
            effectDisplay() {
                return "<br>x" + format(this.effectToIron()) + "(Iron) and <br>x" + format(this.effectToCopper()) + "(Copper)"
            },
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        22: {
            title: "More Time III",
            description: "More Time II now also increases C at a reduced rate",
            cost: new Decimal(60000),
            unlocked() {return hasUpgrade("s",21)},
            tooltip() {
                return "Formula:<br>[More Time II Effect]^(0.5)"
            },
            effect() {
                return tmp.s.upgrades[13].effect.pow(0.5)
            },
            effectDisplay() {
                return "+" + format(this.effect())
            },
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        23: {
            title: "Addicting!",
            description: "Seconds boosts its own gain (E)",
            cost: new Decimal(150000),
            unlocked() {return hasUpgrade("s",22)},
            tooltip() {
                return "Formula:<br>[seconds]^(0.1)"
            },
            effect() {
                return Decimal.max(1, player.points.pow(0.1))
            },
            effectDisplay() {
                return "x" + format(this.effect())
            },
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        24: {
            title: "Logistics",
            description: "More efficient logistics leads to more plates. Exponents in the plates formulas are increased by 1.",
            cost: new Decimal(500000),
            unlocked() {return hasUpgrade("s",23)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        25: {
            title: "The last upgrade before a new layer",
            description: "Increase D by 0.182.",
            cost: new Decimal(5000000),
            unlocked() {return hasUpgrade("s",24)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        31: {
            title: "What? How Op!",
            description: "After all additions to D, multiply it by 1.25.",
            cost: new Decimal("1e14"),
            unlocked() {return hasMilestone("a",1)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        32: {
            title: "More Time IV",
            description: "More Time II now also increases D at a heavily reduced rate.",
            cost: new Decimal("2e16"),
            unlocked() {return hasUpgrade("s",31)},
            tooltip() {
                return "Formula:<br>[More Time II Effect]^(0.1)"
            },
            effect() {
                return tmp.s.upgrades[13].effect.pow(0.1)
            },
            effectDisplay() {
                return "+" + format(this.effect())
            },
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        33: {
            title: "Pure Magic",
            description: "Smelters now boost it's own gain.",
            cost: new Decimal("5e16"),
            unlocked() {return hasUpgrade("s",32)},
            tooltip() {
                return "Formula:<br>log4([Smelters])<br>^(0.5)"
            },
            effect() {
                return Decimal.max(1, player.s.points.log(4).pow(0.5))
            },
            effectDisplay() {
                return "x" + format(this.effect())
            },
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        34: {
            title: "B for Big Boost",
            description: "The B value in the seconds formula is increased by 0.22.",
            cost: new Decimal("1e18"),
            unlocked() {return hasUpgrade("s",33)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        },
        35: {
            title: "Not that big of a boost",
            description: "Multiply plates gain by 5.",
            cost: new Decimal("1.5e18"),
            unlocked() {return hasUpgrade("s",34)},
            currencyDisplayName: "iron plates",
            currencyInternalName: "iron_plates",
            currencyLocation: function() {return player[this.layer]},
        }
    }
})
