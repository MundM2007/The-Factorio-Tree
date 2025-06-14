addLayer("i", {
    name: "info", 
    symbol: "i",
    position: 0,
    startData() { return {
        unlocked: true,
    }},
    tooltip: "Info (Spoilers!)",
    color: "#20ff75",
    type: "none",
    row: "side",
    tabFormat: {
        "Assembler Challenges": {
            content: [
                ["display-text", () => `Here you can find different informations about the game.<br> To see the requirements for challenge completions, see the infoboxes.`],
                "blank",
                ["infobox", "ac1"],
                ["infobox", "ac2"],
                ["infobox", "ac3"]
            ],
        }
    },
    layerShown(){return true},
    doReset(resettingLayer) {
        return
    },
    infoboxes: {
        ac1: {
            title: "Assembler Challenge I",
            body() { 
                return `Completion 1: 2 assemblers, Improved Logistics upgrade, 5 Automation Science<br>
                Completion 2: 5 assembler, Triple Boost upgrade, 8 Automation Science`
            },
            unlocked(){
                return hasMilestone("a", 0)
            }
        },
        ac2: {
            title: "Assembler Challenge II",
            body() { 
                return `Completion 1: 2 assemblers, Improved Logistics upgrade, 5 Automation Science<br>
                Completion 2: 5 assembler, Triple Boost upgrade, 8 Automation Science`
            },
            unlocked(){
                return hasMilestone("a", 0)
            }
        },
        ac3: {
            title: "Assembler Challenge III",
            body() { 
                return `Completion 1: 2 assemblers, Improved Logistics upgrade, 6 Automation Science<br>
                Completion 2: 5 assembler, Triple Boost upgrade, 8 Automation Science`
            },
            unlocked(){
                return hasMilestone("a", 0)
            }
        }
    }
})
