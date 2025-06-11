addLayer("r", {
    name: "research", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🧪", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true
    }},
    tooltip: "Research",
    color: "#333333",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tabFormat: [
        ["display-text", () => `Here you can research different flasks. They are never reset unless otherwise stated.`],
        "blank",
        "buyables"
    ],
    layerShown(){return hasUpgrade("s",15)},
    buyables: {
        11: {
            title: "Automation Science",
            unlocked() {return hasUpgrade("s",15)},
            tooltip() {
                return "Formula:<br>0.5*[Amount]"
            },
            style() {
                const style = {"background-color": null}
                if (this.canAfford()) style["background-color"] = "#EC1C24"
                return style
            },
            cost(x){
                return (new Decimal(500)).mul((new Decimal(5)).pow(x)).mul(x.add(1).pow((new Decimal(1.5)).pow(x)))
            },
            canAfford() {return player.s.iron_plates.gte(this.cost()) && player.s.copper_plates.gte(this.cost())},
            display() {return `
                Amount: ${formatWhole(getBuyableAmount(this.layer, this.id))}, Cost: 
                ${format(player.s.iron_plates)}/${format(this.cost())} iron plates
                ${format(player.s.copper_plates)}/${format(this.cost())} copper plates<br>
                Effect: +${format(this.effect())} Exponent in the seconds formula (EiF).`
            },
            buy() {
                player.s.iron_plates = player.s.iron_plates.sub(this.cost())
                player.s.copper_plates = player.s.copper_plates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                add = new Decimal(0.5) * x
                return add
            }
        }
    }
})
