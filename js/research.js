addLayer("r", {
    name: "research", 
    symbol: "🧪",
    position: 1,
    startData() { return {
        unlocked: false,
    }},
    tooltip: "Research",
    color: "#333333",
    type: "none",
    row: "side",
    tabFormat: [
        ["display-text", () => `Here you can research different sciences.<br> They are never reset unless otherwise stated.<br> To see the cost and effect formulas hover over the buyables.`],
        "blank",
        "buyables"
    ],
    layerShown(){
        if(player.r.unlocked) return true
        if(hasUpgrade("s", 15)){
            player.r.unlocked = true
            return true
        }
    },
    doReset(resettingLayer) {
        return
    },
    shouldNotify(){
        return tmp.r.buyables[11].canAfford || tmp.r.buyables[12].canAfford
    },
    automation_science: {
        costScalingExponent() {
            let exp = new Decimal(1.5)
            if (hasUpgrade("a", 13)) exp = exp.sub(0.1)
            return exp
        },
        effectMult() {
            let mul = new Decimal(0.5)
            if (hasMilestone("s", 5)) mul = mul.add(0.04353)
            return mul
        }
    },
    buyables: {
        11: {
            title: "Automation Science",
            unlocked() {return true},
            tooltip() {
                return `Cost Formula:<br>500 * 5^x * x^(${tmp.r.automation_science.costScalingExponent}^x)<br>Effect Formula:<br>${tmp.r.automation_science.effectMult}*[Amount]`
            },
            style() {
                const style = {"background-color": null}
                if (this.canAfford()) style["background-color"] = "#ec1c24"
                return style
            },
            cost(x){
                return (new Decimal(500)).mul((new Decimal(5)).pow(x)).mul(Decimal.max(1, x.pow((tmp.r.automation_science.costScalingExponent).pow(x))))
            },
            canAfford() {return player.s.iron_plates.gte(this.cost()) && player.s.copper_plates.gte(this.cost())},
            display() {return `
                Amount: ${formatWhole(getBuyableAmount(this.layer, this.id))}, Cost: 
                ${format(player.s.iron_plates)}/${format(this.cost())} iron plates
                ${format(player.s.copper_plates)}/${format(this.cost())} copper plates<br>
                Effect: +${format(this.effect())} Exponent in the seconds formula (D).`
            },
            buy() {
                player.s.iron_plates = player.s.iron_plates.sub(this.cost())
                player.s.copper_plates = player.s.copper_plates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let add = new Decimal(tmp.r.automation_science.effectMult) * x
                return add
            }
        },
        12: {
            title: "Logistic Science",
            unlocked() {return hasUpgrade("a", 22)},
            tooltip() {
                return `Cost Formula:<br>2,500,000 * 10^x * x^(1.5^x)<br>Effect Formula:<br>2^[Amount]`
            },
            style() {
                const style = {"background-color": null}
                if (this.canAfford()) style["background-color"] = "#18e63a"
                return style
            },
            cost(x){
                return (new Decimal("3e6")).mul((new Decimal(10)).pow(x)).mul(Decimal.max(1, x.pow(new Decimal(1.5).pow(x))))
            },
            canAfford() {return player.a.belts.gte(this.cost()) && player.a.inserters.gte(this.cost())},
            display() {return `
                Amount: ${formatWhole(getBuyableAmount(this.layer, this.id))}, Cost: 
                ${format(player.a.belts)}/${format(this.cost())} belts
                ${format(player.a.inserters)}/${format(this.cost())} inserters<br>
                Effect: x${format(this.effect())} Seconds Production (E).`
            },
            buy() {
                player.a.belts = player.a.belts.sub(this.cost())
                player.a.inserters = player.a.inserters.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let mul = new Decimal(2).pow(x)
                return mul
            }
        }
    }
})
