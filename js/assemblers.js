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
        "Milestones": {
            content: [
                "milestones"
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

            if(hasMilestone("a", 4)) exp = exp.add(2)
            if(hasUpgrade("a", 33)) exp = exp.add(tmp.a.upgrades[33].effectToBelt)

            return exp
        },
        getMul(){
            let mul = new Decimal(1)

            mul = mul.mul(challengeEffect("a", 12))
            if(hasMilestone("a", 3)) mul = mul.mul(2)
            if(hasUpgrade("a", 23)) mul = mul.mul(upgradeEffect("a", 23))
            if(hasMilestone("s", 6)) mul = mul.mul(10)

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

            if(hasMilestone("a", 4)) exp = exp.add(2)
            if(hasUpgrade("a", 33)) exp = exp.add(tmp.a.upgrades[33].effectToInserter)

            return exp
        },
        getMul(){
            let mul = new Decimal(1)

            mul = mul.mul(challengeEffect("a", 12))
            if(hasUpgrade("a", 23)) mul = mul.mul(upgradeEffect("a", 23))
            if(hasUpgrade("a", 24)) mul = mul.mul(3)
            if(hasMilestone("s", 6)) mul = mul.mul(10)

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
            effectDescription: "Automate the third row of smelter upgrades and autoreset for smelters. Multiply plate production by 50 and unlock another smelter milestone.",
            done() {return player.a.points.gte(6)},
            unlocked() {return hasMilestone("a", 1)}
        },
        3: {
            requirementDescription: "7 assemblers",
            effectDescription: "Unlock the next 2 rows of upgrades and multiply belts gain by 2.",
            done() {return player.a.points.gte(7)},
            unlocked() {return hasMilestone("a", 2)}
        },
        4: {
            requirementDescription: "9 assemblers",
            effectDescription: "Resetting for smelters doesn't reset anything and increase belt and inserter production exponents by 2. Also multiply copper plate production by 4.",
            done() {return player.a.points.gte(9)},
            unlocked() {return hasMilestone("a", 3)}
        },
        5: {
            requirementDescription: "12 assemblers",
            effectDescription: "Increase seconds gain by 1.5 and unlock the next row of upgrades and unlock a new smelter milestone.",
            done() {return player.a.points.gte(12)},
            unlocked() {return hasMilestone("a", 4)}
        },
        6: {
            requirementDescription: "18 assemblers",
            effectDescription: "Unlock the next 2 reset layers.",
            done() {return player.a.points.gte(18)},
            unlocked() {return hasMilestone("a", 5)}
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
            currencyLocation: function() {return player[this.layer]}
        },
        12: {
            title: "Improved Logistics",
            description: "Using advanced logistics you were able to increase plate production by 100x.",
            cost: new Decimal(5000),
            unlocked() {return hasUpgrade("a", 11)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        13: {
            title: "Faster Research",
            description: "Decrease the Automation Science cost scaling exponent by 0.1 (so from 1.5 to 1.4).",
            cost: new Decimal(100000),
            unlocked() {return hasUpgrade("a", 12)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        14: {
            title: "Steel Furnaces",
            description: "Multiply the exponents in the plates formulas by 1.5 after all additions.",
            cost: new Decimal(300000),
            unlocked() {return hasUpgrade("a", 13)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        15: {
            title: "Triple Boost",
            description: "Increase C and D by 0.35 and Multiply E by 5.",
            cost: new Decimal(4000000),
            unlocked() {return hasUpgrade("a", 14)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        21: {
            title: "Trains",
            description: "Multiply iron plates production based on belts and copper plates production based on inserters. ",
            cost: new Decimal("5e7"),
            unlocked() {return hasUpgrade("a", 15) && hasMilestone("a", 3)},
            tooltip() {
                return "Formula: [Resource]^1.1"
            },
            effectToIron() {
                return Decimal.max(1, player.a.belts.pow(1.1), 1)
            },
            effectToCopper() {
                return Decimal.max(1, player.a.inserters.pow(1.1), 1)
            },
            effectDisplay() {
                return "<br>" + format(this.effectToIron()) + "x (Iron) and <br>" + format(this.effectToCopper()) + "x (Copper)"
            },
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        22: {
            title: "A new Science!",
            description: "Unlock the Logistic Science research building and after all multiplication exponentiate E by 1.05",
            cost: new Decimal("1e8"),
            unlocked() {return hasUpgrade("a", 21)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        23: {
            title: "Reverse Multiplier",
            description: "Smelters boost belt and inserter production at a changed rate.",
            cost: new Decimal("1e8"),
            unlocked() {return hasUpgrade("a", 22)},
            tooltip() {
                return "Formula: ([smelters]/100)^(8)"
            },
            effect() {
                return Decimal.max(1, player.s.points.div(100).pow(8))
            },
            effectDisplay() {
                return "x" + format(this.effect())
            },
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        24: {
            title: "Engines",
            description: "Boost inserter production by 3x.",
            cost: new Decimal("5e10"),
            unlocked() {return hasUpgrade("a", 23)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        25: {
            title: "Fluid Handling",
            description: "Fluids adds more depth to the game. Increase D by 0.3.",
            cost: new Decimal("1e11"),
            unlocked() {return hasUpgrade("a", 24)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        31: {
            title: "Multiplied Multiplier",
            description: "Boost seconds gain based on iron plates and belts",
            cost: new Decimal("1e14"),
            unlocked() {return hasUpgrade("a", 25)},
            tooltip() {
                return "Formula: log10( [iron plates]*[belts])^0.5"
            },
            effect() {
                return Decimal.max(1, player.s.iron_plates.mul(player.a.belts).log(10).pow(0.5))
            },
            effectDisplay() {
                return "x" + format(this.effect())
            },
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        32: {
            title: "Exponent Boost",
            description: "Increase iron plate production exponent by 3 and copper plate production exponent by 2.",
            cost: new Decimal("2e15"),
            unlocked() {return hasUpgrade("a", 31)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        33: {
            title: "Exponent Boost II",
            description: "Increase belt and inserter production exponent based on itself.",
            cost: new Decimal("2e15"),
            unlocked() {return hasUpgrade("a", 32)},
            tooltip() {
                return "Formula: [exponent]^0.5"
            },
            effectToBelt() {
                return Decimal.max(1, tmp.a.belts.getExp.pow(0.5))
            },
            effectToInserter() {
                return Decimal.max(1, tmp.a.inserters.getExp.pow(0.5))
            },
            effectDisplay() {
                return "<br>+" + format(this.effectToBelt()) + "(Belts) and <br>+" + format(this.effectToInserter()) + "(Inserters)"
            },
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        34: {
            title: "Tier 2 Assembly",
            description: "Better Assembling machines increase plate production by 100.",
            cost: new Decimal("2e18"),
            unlocked() {return hasUpgrade("a", 33)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        35: {
            title: "Easier challenges",
            description: "Decrease Assembler Challenge I nerf.",
            cost: new Decimal("5e18"),
            unlocked() {return hasUpgrade("a", 34)},
            tooltip() {
                return "0.1^(x^x) -> 0.8^(x)"
            },
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        41: {
            title: "Déjà-vu",
            description: "Increase seconds gain by 1.5",
            cost: new Decimal("5e19"),
            unlocked() {return hasUpgrade("a", 35) && hasMilestone("a", 5)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        42: {
            title: "Multiplied Multiplier II",
            description: "Increase D based in copper plates and inserters.",
            cost: new Decimal("5e20"),
            unlocked() {return hasUpgrade("a", 41)},
            tooltip() {
                return "Formula: log10( [copper plates]*[inserters])^0.1"
            },
            effect() {
                return Decimal.max(0, player.s.copper_plates.mul(player.a.inserters).log(10).pow(0.1))
            },
            effectDisplay() {
                return "+" + format(this.effect())
            },
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        43: {
            title: "Plastics & Sulfur",
            description: "Somehow they increase B by 0.28.",
            cost: new Decimal("2.5e21"),
            unlocked() {return hasUpgrade("a", 42)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        44: {
            title: "Explosives",
            description: "Explosives make the game more fun and thus increases C by 5.",
            cost: new Decimal("5e22"),
            unlocked() {return hasUpgrade("a", 43)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        },
        45: {
            title: "Advanced Circuits",
            description: "Increase the boost per AC1 challenge completion by 50.",
            cost: new Decimal("5e22"),
            unlocked() {return hasUpgrade("a", 44)},
            currencyDisplayName: "belts",
            currencyInternalName: "belts",
            currencyLocation: function() {return player[this.layer]}
        }
    },
    challenges: {
        11: {
            name: "Assembler Challenge I",
            unlocked() {return hasMilestone("a", 0)},
            challengeNerf(){
                if(hasUpgrade("a", 35)){
                    return new Decimal(0.8).pow(
                        new Decimal(challengeCompletions(this.layer, this.id))
                    )
                }else{
                    return new Decimal(0.1).pow(
                        new Decimal(challengeCompletions(this.layer, this.id)).pow(
                            Decimal.max(1, challengeCompletions(this.layer, this.id))
                        )
                    )
                }
            },
            challengeDescription(){
                return `E is constantly set to ${format(this.challengeNerf())}, upgrades and buyables that change this are disabled.<br>`
            },
            goalAmount(){
                return new Decimal(30000).mul(
                    new Decimal(10).pow(
                        new Decimal(challengeCompletions(this.layer, this.id)).pow(
                            2.1369
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
            rewardPerCompletion(){
                let rew = new Decimal(1000)
                if(hasUpgrade("a", 45)) rew = rew.mul(50)
                return rew
            },
            rewardDescription(){
                return `Multiply plates gain by ${formatWhole(this.rewardPerCompletion())} for each completion of this challenge.`
            },
            rewardEffect(){
                return this.rewardPerCompletion().pow(challengeCompletions(this.layer, this.id))
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
                return new Decimal(2000).mul(new Decimal(10).pow(new Decimal(challengeCompletions(this.layer, this.id)).pow(1.2)))
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
                return new Decimal(11750).mul(new Decimal("6.6666e7").pow(new Decimal(challengeCompletions(this.layer, this.id)).pow(0.57)))
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