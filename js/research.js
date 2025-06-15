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
        return tmp.r.buyables[11].canAfford
    },
    automation_science: {
        costScalingExponent() {
            let exp = new Decimal(1.5)
            if (hasUpgrade("a", 13)) exp = exp.sub(0.1)
            return exp
        }
    },
    buyables: {
        11: {
            title: "Automation Science",
            unlocked() {return true},
            tooltip() {
                return `Cost Formula:<br>500 * 5^x * x^(${tmp.r.automation_science.costScalingExponent}^x)<br>Effect Formula:<br>0.5*[Amount]`
            },
            style() {
                const style = {"background-color": null}
                if (this.canAfford()) style["background-color"] = "#EC1C24"
                return style
            },
            cost(x){
                return (new Decimal(500)).mul((new Decimal(5)).pow(x)).mul(Decimal.max(x.pow((tmp.r.automation_science.costScalingExponent).pow(x)), 1))
            },
            canAfford() {return player.s.iron_plates.gte(this.cost()) && player.s.copper_plates.gte(this.cost())},
            display() {return `
                Amount: ${formatWhole(getBuyableAmount(this.layer, this.id))}, Cost: 
                ${format(player.s.iron_plates)}/${format(this.cost())} iron plates
                ${format(player.s.copper_plates)}/${format(this.cost())} copper plates<br>
                Effect: +${format(this.effect())} Exponent in the seconds formula (E).`
            },
            buy() {
                player.s.iron_plates = player.s.iron_plates.sub(this.cost())
                player.s.copper_plates = player.s.copper_plates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let add = new Decimal(0.5) * x
                return add
            }
        }
    }
})
