addLayer("a", {
    name: "assembler",
    symbol: "A",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        belts: new Decimal(0),
        inserters: new Decimal(0)
    }},
    color: "#18e63a",
    requires: new Decimal(490000),
    resource: "assemblers",
    baseResource: "seconds",
    baseAmount() {return player.points},
    type: "static", // base^(x^exp)
    base: new Decimal(5),
    exponent: function sLayerScalingExp(){
        let exp = new Decimal(2)
        return exp
    },
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    directMult() {
        let mult = new Decimal(1)

        mult = mult.mul(challengeEffect("a", 13))

        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    row: 1,
    branches: ["s"],
    hotkeys: [
        {key: "s", description: "S: Reset for smelters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "milestones",
                ["display-text", 
                    () => {
                        if (!hasMilestone("a", 0)) return ""
                        return `You have <h2 style="color: #bbb800; text-shadow: 0px 0px 10px #bbb800">${format(player.a.belts)}</h2> belts<br>
                        Your assemblers are generating ${format(tmp.a.belts.getGain)} belts per second <br>Production ${getStandardFormula("a", "belts")}<br>
                        You have <h2 style="color: #daa000; text-shadow: 0px 0px 10px #daa000">${format(player.a.inserters)}</h2> inserters<br>
                        Your smelters are generating ${format(tmp.a.inserters.getGain)} inserters per second <br>Production ${getStandardFormula("a", "inserters")}`
                    }
                ],
                "blank",
                "upgrades"
            ]
        },
        "Challenges": {
            content: [
                ["display-text", 
                    () => {
                        return `You can start challenges here once you have unlocked them.<br>
                        Challenge requirements can be found in the info layer.`
                    }
                ],
                "blank",
                "challenges"
            ]
        }
    },
    layerShown(){
        if(player.a.unlocked) return true
        return hasMilestone("s", 2)
    },
    update(diff) {
        player.a.belts = player.a.belts.add(tmp.a.belts.getGain.mul(diff))
        player.a.inserters = player.a.inserters.add(tmp.a.inserters.getGain.mul(diff))
    },
    belts: {
        getExp(){
            let exp = new Decimal(4)
            return exp
        },
        getMul(){
            let mul = new Decimal(1)

            mul = mul.mul(challengeEffect("a", 12))

            return mul
        },
        getGain(){
            let gain = player.a.points.pow(tmp.a.belts.getExp)
            gain = gain.mul(tmp.a.belts.getMul)
            return gain
        }
    },
    inserters: {
        getExp(){
            let exp = new Decimal(2)
            return exp
        },
        getMul(){
            let mul = new Decimal(1)

            mul = mul.mul(challengeEffect("a", 12))

            return mul
        },
        getGain(){
            let gain = player.a.points.pow(tmp.a.inserters.getExp)
            gain = gain.mul(tmp.a.inserters.getMul)
            return gain
        }
    },
    milestones: {
        0: {
            requirementDescription: "1 assembler",
            effectDescription: "Unlock the first row of upgrades, some challenges and start producing belts and inserters.",
            done() {return player.a.points.gte(1)}
        },
        1: {
            requirementDescription: "3 assemblers",
            effectDescription: "the first two rows of Smelter upgrades are autobought every tick and also unlock more op smelter upgrades.",
            done() {return player.a.points.gte(3)},
            unlocked() {return hasMilestone("a", 0)}
        },
        2: {
            requirementDescription: "6 assemblers",
            effectDescription: "Automate the third row of smelter upgrades and autoreset for smelters. Multiply plate production by 50.",
            done() {return player.a.points.gte(6)},
            unlocked() {return hasMilestone("a", 1)}
        }
    },
    upgrades: {
        11: {
            title: "Toolbelt",
            description: "You can store more items and be more efficient. Increase C by 1 and unlock 2 more milestones in the smelter layer.",
            cost: new Decimal(300),
            unlocked() {return hasMilestone("a", 0)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]},
        },
        12: {
            title: "Improved Logistics",
            description: "Using advanced logistics you were able to increase plate production by 100x.",
            cost: new Decimal(5000),
            unlocked() {return hasUpgrade("a", 11)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]},
        },
        13: {
            title: "Faster Research",
            description: "Decrease the Automation Science cost scaling exponent by 0.1 (so from 1.5 to 1.4).",
            cost: new Decimal(100000),
            unlocked() {return hasUpgrade("a", 12)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]},
        },
        14: {
            title: "Steel Furnaces",
            description: "Multiply the exponents in the plates formulas by 1.5 after all additions.",
            cost: new Decimal(300000),
            unlocked() {return hasUpgrade("a", 13)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]},
        },
        15: {
            title: "Triple Boost",
            description: "Increase C and D by 0.35 and Multiply E by 5.",
            cost: new Decimal(4000000),
            unlocked() {return hasUpgrade("a", 14)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]},
        }
    },
    challenges: {
        11: {
            name: "Assembler Challenge I",
            unlocked() {return hasMilestone("a", 0)},
            challengeNerf(){
                return new Decimal(0.1).pow(
                    new Decimal(challengeCompletions(this.layer, this.id)).pow(
                        Decimal.max(1, challengeCompletions(this.layer, this.id))
                    )
                )
            },
            challengeDescription(){
                return `E is constantly set to ${format(this.challengeNerf())}, upgrades and buyables that change this are disabled.<br>`
            },
            goalAmount(){
                return new Decimal(30000).mul(
                    new Decimal(10).pow(
                        new Decimal(challengeCompletions(this.layer, this.id)).pow(
                            Decimal.max(1, challengeCompletions(this.layer, this.id))
                        )
                    )
                )
            },
            goalDescription(){
                return `Reach ${format(this.goalAmount())} seconds`
            },
            canComplete(){
                return player.points.gte(this.goalAmount())
            },
            rewardDescription(){
                return `Multiply plates gain by 1000 for each completion of this challenge.`
            },
            rewardEffect(){
                return new Decimal(1000).pow(challengeCompletions(this.layer, this.id))
            },
            rewardDisplay(){
                return `You have completed this challenge ${formatWhole(challengeCompletions(this.layer, this.id))}/${formatWhole(this.completionLimit)} times.<br>
                Current Effect: ${format(this.rewardEffect())}x.`
            },
            completionLimit: 5
        },
        12: {
            name: "Assembler Challenge II",
            unlocked() {return hasMilestone("a", 0)},
            challengeNerf(){
                return new Decimal(2).pow(new Decimal(0.95).pow(challengeCompletions(this.layer, this.id)))
            },
            challengeDescription(){
                return `D is constantly set to ${format(this.challengeNerf())}, upgrades and buyables that change this are disabled.<br>`
            },
            goalAmount(){
                return new Decimal(2000).mul(new Decimal(10).pow(challengeCompletions(this.layer, this.id)))
            },
            goalDescription(){
                return `Reach ${format(this.goalAmount())} seconds`
            },
            canComplete(){
                return player.points.gte(this.goalAmount())
            },
            rewardDescription(){
                return `Multiply belts and inserters gain by 10 for each completion of this challenge.`
            },
            rewardEffect(){
                return new Decimal(10).pow(challengeCompletions(this.layer, this.id))
            },
            rewardDisplay(){
                return `You have completed this challenge ${formatWhole(challengeCompletions(this.layer, this.id))}/${formatWhole(this.completionLimit)} times.<br>
                Current Effect: ${format(this.rewardEffect())}x.`
            },
            completionLimit: 5
        },
        13: {
            name: "Assembler Challenge III",
            unlocked() {return hasMilestone("a", 0)},
            challengeNerf(){
                return new Decimal(1).div(new Decimal(1.05).pow(challengeCompletions(this.layer, this.id)))
            },
            challengeDescription(){
                return `C is constantly set to ${format(this.challengeNerf())}, upgrades and buyables that change this are disabled.<br>`
            },
            goalAmount(){
                return new Decimal(11750).mul(new Decimal("6.6666e7").pow(challengeCompletions(this.layer, this.id)))
            },
            goalDescription(){
                return `Reach ${format(this.goalAmount())} seconds`
            },
            canComplete(){
                return player.points.gte(this.goalAmount())
            },
            rewardDescription(){
                return `Multiply assemblers gain by 1.2 for each completion of this challenge.`
            },
            rewardEffect(){
                return new Decimal(1.2).pow(challengeCompletions(this.layer, this.id))
            },
            rewardDisplay(){
                return `You have completed this challenge ${formatWhole(challengeCompletions(this.layer, this.id))}/${formatWhole(this.completionLimit)} times.<br>
                Current Effect: ${format(this.rewardEffect())}x.`
            },
            completionLimit: 5
        }
    }
})