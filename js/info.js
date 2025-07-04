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
        "Savebank": {
            content: [
                ["display-text", () => `Here you can find different informations about the game.<br> Here specifically you can jump to different states of the game.`],
                "blank",
                "clickables"
            ]
        },
        "Assembler Challenges": {
            content: [
                ["display-text", () => `Here you can find different informations about the game.<br> To see the requirements for challenge completions, see the infoboxes.`],
                "blank",
                ["infobox", "ac1"],
                ["infobox", "ac2"],
                ["infobox", "ac3"]
            ],
            unlocked() {
                return hasMilestone("a", 0)
            }
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
                Completion 2: 5 assembler, Triple Boost upgrade, 8 Automation Science<br>
                Completion 3: 7 assemblers, Fluid Handling upgrade, 10 AS & 3 LS<br>
                Completion 4: 11 assemblers, Easier Challenges upgrade, 12 AS & 5 LS<br>
                Completion 5: 17 assemblers, Explosives upgrade, 12 AS & 6 LS`
            },
            unlocked(){
                return hasMilestone("a", 0)
            }
        },
        ac2: {
            title: "Assembler Challenge II",
            body() { 
                return `Completion 1: 2 assemblers, Improved Logistics upgrade, 5 Automation Science<br>
                Completion 2: 5 assembler, Triple Boost upgrade, 8 Automation Science<br>
                Completion 3: 7 assemblers, Reverse Multiplier upgrade, 10 AS & 2 LS<br>
                Completion 4: 9 assemblers, Multiplied Multiplier upgrade, 11 AS & 4 LS<br>
                Completion 5: 12 assemblers, Easier Challenges upgrade, 12 AS & 6 LS`
            },
            unlocked(){
                return hasMilestone("a", 0)
            }
        },
        ac3: {
            title: "Assembler Challenge III",
            body() { 
                return `Completion 1: 2 assemblers, Improved Logistics upgrade, 6 Automation Science<br>
                Completion 2: 5 assembler, Triple Boost upgrade, 8 Automation Science<br>
                Completion 3: 7 assemblers, Fluid Handling upgrade, 10 AS & 3 LS<br>
                Completion 4: 9 assemblers, Multiplied Multiplier upgrade, 11 AS & 4 LS<br>
                Completion 5: 14 assemblers, Déjà-vu upgrade, 12 AS & 6 LS`
            },
            unlocked(){
                return hasMilestone("a", 0)
            }
        }
    },
    clickables: {
        11: {
            title: "Smelters",
            display: "Layer completed",
            canClick: true,
            onClick() {
                if(!confirm("Your current progress will not be saved!")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc0OTk5ODEyNTI2NSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJ0aGVmYWN0b3Jpb3RyZWVNTTA3IiwidmVyc2lvbiI6IjAuMi4wIiwidGltZVBsYXllZCI6NTk3Ljk2OTAwMDAwMDA1NzIsImtlZXBHb2luZyI6ZmFsc2UsImhhc05hTiI6ZmFsc2UsInBvaW50cyI6IjQ5MDYwNy40NzcwMzI0MjAyIiwic3VidGFicyI6eyJjaGFuZ2Vsb2ctdGFiIjp7fSwiYSI6eyJtYWluVGFicyI6Ik1haW4ifSwiaSI6eyJtYWluVGFicyI6IkFzc2VtYmxlciBDaGFsbGVuZ2VzIn19LCJsYXN0U2FmZVRhYiI6InMiLCJpbmZvYm94ZXMiOnsiaSI6eyJhYzEiOmZhbHNlLCJhYzIiOmZhbHNlLCJhYzMiOmZhbHNlfX0sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTk3Ljk2OTAwMDAwMDA1NzIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo1OTcuOTY5MDAwMDAwMDU3MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTk3Ljk2OTAwMDAwMDA1NzIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwicyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMTciLCJpcm9uX3BsYXRlcyI6IjEzMzUyODAwLjI4MDE1NjM2MyIsImNvcHBlcl9wbGF0ZXMiOiIxMzA5OTkyLjM5NjU1NjI1IiwidG90YWwiOiIxNyIsImJlc3QiOiIxNyIsInJlc2V0VGltZSI6MjAuNzUxOTk5OTk5OTk5OTgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0LDI1XSwibWlsZXN0b25lcyI6WyIwIiwiMSIsIjIiXSwibGFzdE1pbGVzdG9uZSI6IjIiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJhIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsImJlbHRzIjoiMCIsImluc2VydGVycyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTk3Ljk2OTAwMDAwMDA1NzIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjowLCIxMiI6MCwiMTMiOjB9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJyIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTk3Ljk2OTAwMDAwMDA1NzIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiNCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJpIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTk3Ljk2OTAwMDAwMDA1NzIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo1OTcuOTY5MDAwMDAwMDU3MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9fQ==")
            },
            style() {return{
                'background-color': tmp.s.color,
            }},
        },
        21: {
            title: "Assemblers (Part 1)",
            display: "After first AC1-3 completion",
            canClick: true,
            onClick() {
                if(!confirm("Your current progress will not be saved!")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc0OTk5ODk3MDAxNywibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJ0aGVmYWN0b3Jpb3RyZWVNTTA3IiwidmVyc2lvbiI6IjAuMi4wIiwidGltZVBsYXllZCI6MTQ0Mi43MjEwMDAwMDAyMTksImtlZXBHb2luZyI6ZmFsc2UsImhhc05hTiI6ZmFsc2UsInBvaW50cyI6IjI2ODguODk4MzA1MjgyOTUxIiwic3VidGFicyI6eyJjaGFuZ2Vsb2ctdGFiIjp7fSwiYSI6eyJtYWluVGFicyI6IkNoYWxsZW5nZXMifSwiaSI6eyJtYWluVGFicyI6IkFzc2VtYmxlciBDaGFsbGVuZ2VzIn19LCJsYXN0U2FmZVRhYiI6ImEiLCJpbmZvYm94ZXMiOnsiaSI6eyJhYzEiOnRydWUsImFjMiI6dHJ1ZSwiYWMzIjp0cnVlfX0sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTQ0Mi43MjEwMDAwMDAyMTksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxNDQyLjcyMTAwMDAwMDIxOSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTQ0Mi43MjEwMDAwMDAyMTksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwicyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsImlyb25fcGxhdGVzIjoiMCIsImNvcHBlcl9wbGF0ZXMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEyLjA1NDAwMDAwMDAwMDAwNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImEiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjIiLCJiZWx0cyI6IjE0ODI2LjA4NTAwMDAwMDI3MiIsImluc2VydGVycyI6IjUyNzIuODgxMDAwMDAwMTA4NSIsInRvdGFsIjoiMiIsImJlc3QiOiIyIiwicmVzZXRUaW1lIjoxMi4wNTQwMDAwMDAwMDAwMDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyXSwibWlsZXN0b25lcyI6WyIwIl0sImxhc3RNaWxlc3RvbmUiOiIwIiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MSwiMTIiOjEsIjEzIjoxfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJyIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTQ0Mi43MjEwMDAwMDAyMTksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiNiJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJpIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTQ0Mi43MjEwMDAwMDAyMTksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxNDQyLjcyMTAwMDAwMDIxOSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9fQ==")
            },
            style() {return{
                'background-color': tmp.a.color,
            }}
        },
        22: {
            title: "Assemblers (Part 2)",
            display: "After second AC1-3 completion",
            canClick: true,
            onClick() {
                if(!confirm("Your current progress will not be saved!")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc1MDAwMzk1Nzg4Niwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJ0aGVmYWN0b3Jpb3RyZWVNTTA3IiwidmVyc2lvbiI6IjAuMi4wIiwidGltZVBsYXllZCI6MjkyNC40NjY5OTk5OTk2MTY3LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJwb2ludHMiOiIzMTMzNjMuMTE0NTIxMDU3NSIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sImEiOnsibWFpblRhYnMiOiJDaGFsbGVuZ2VzIn0sImkiOnsibWFpblRhYnMiOiJBc3NlbWJsZXIgQ2hhbGxlbmdlcyJ9fSwibGFzdFNhZmVUYWIiOiJhIiwiaW5mb2JveGVzIjp7ImkiOnsiYWMxIjp0cnVlLCJhYzIiOnRydWUsImFjMyI6dHJ1ZX19LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjI5MjQuNDY2OTk5OTk5NjE2NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjI5MjQuNDY2OTk5OTk5NjE2NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjkyNC40NjY5OTk5OTk2MTY3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJpcm9uX3BsYXRlcyI6IjAiLCJjb3BwZXJfcGxhdGVzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0NC44MDI5OTk5OTk5OTk3MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImEiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjUiLCJiZWx0cyI6Ijg2NDkzODYuNzQ1MDAwMDA4IiwiaW5zZXJ0ZXJzIjoiNTY0MDM4LjEwMDk5OTk5NjgiLCJ0b3RhbCI6IjUiLCJiZXN0IjoiNSIsInJlc2V0VGltZSI6NDQuODAyOTk5OTk5OTk5NzIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1XSwibWlsZXN0b25lcyI6WyIwIiwiMSJdLCJsYXN0TWlsZXN0b25lIjoiMSIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjIsIjEyIjoyLCIxMyI6Mn0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiciI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjI5MjQuNDY2OTk5OTk5NjE2NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI4In0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImkiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyOTI0LjQ2Njk5OTk5OTYxNjcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjIxIjoiIiwiMjIiOiIiLCIyMyI6IiIsIjI0IjoiIiwiMjUiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjI5MjQuNDY2OTk5OTk5NjE2NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9fQ==")
            },
            style() {return{
                'background-color': tmp.a.color,
            }}
        },
        23: {
            title: "Assemblers (Part 3)",
            display: "After third AC1-3 completion",
            canClick: true,
            onClick() {
                if(!confirm("Your current progress will not be saved!")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc1MDUyMjQwNDIzMiwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJ0aGVmYWN0b3Jpb3RyZWVNTTA3IiwidmVyc2lvbiI6IjAuMi4yIiwidGltZVBsYXllZCI6NDA3NC4xNTg5OTk5OTg2NTEzLCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJwb2ludHMiOiI5LjY3MTA2NjgyNDY1NDU2NWUyMCIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sImEiOnsibWFpblRhYnMiOiJNYWluIn0sImkiOnsibWFpblRhYnMiOiJBc3NlbWJsZXIgQ2hhbGxlbmdlcyJ9fSwibGFzdFNhZmVUYWIiOiJzIiwiaW5mb2JveGVzIjp7ImkiOnsiYWMxIjpmYWxzZSwiYWMyIjpmYWxzZSwiYWMzIjpmYWxzZX19LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQwNzQuMTU4OTk5OTk4NjUxMywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQwNzQuMTU4OTk5OTk4NjUxMywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDA3NC4xNTg5OTk5OTg2NTEzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDA3NC4xNTg5OTk5OTg2NTEzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjE5NiIsImlyb25fcGxhdGVzIjoiNS45NzA0MjQ0ODExODIwODFlMzgiLCJjb3BwZXJfcGxhdGVzIjoiOS42NjQ0NjgzNjMzMjc3MThlMzQiLCJ0b3RhbCI6IjE5NiIsImJlc3QiOiIxOTYiLCJyZXNldFRpbWUiOjExLjU5MDk5OTk5OTk5OTk5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMzEsMTIsMzIsMTMsMzMsMTQsMzQsMTUsMzUsMjEsMjIsMjMsMjQsMjVdLCJtaWxlc3RvbmVzIjpbIjAiLCIxIiwiMiIsIjMiLCI0IiwiNSJdLCJsYXN0TWlsZXN0b25lIjoiNSIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImEiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjciLCJiZWx0cyI6IjMxMjEwNzI2ODI1LjE3MzU5IiwiaW5zZXJ0ZXJzIjoiMzExMDExNjI1OC4xMzI3MjEiLCJ0b3RhbCI6IjciLCJiZXN0IjoiNyIsInJlc2V0VGltZSI6NDYuNjUwOTk5OTk5OTk5NjUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0LDI1XSwibWlsZXN0b25lcyI6WyIwIiwiMSIsIjIiLCIzIl0sImxhc3RNaWxlc3RvbmUiOiIzIiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MywiMTIiOjMsIjEzIjozfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJyIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDA3NC4xNTg5OTk5OTg2NTEzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjEwIiwiMTIiOiIzIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImkiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0MDc0LjE1ODk5OTk5ODY1MTMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjIxIjoiIiwiMjIiOiIiLCIyMyI6IiIsIjI0IjoiIiwiMjUiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9fQ==")
            },
            style() {return{
                'background-color': tmp.a.color,
            }}
        },
        24: {
            title: "Assemblers (Part 4)",
            display: "After fifth AC2-3 and fourth AC1 completion",
            canClick: true,
            onClick() {
                if(!confirm("Your current progress will not be saved!")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc1MDUyNDE0NzcxOSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJ0aGVmYWN0b3Jpb3RyZWVNTTA3IiwidmVyc2lvbiI6IjAuMi4yIiwidGltZVBsYXllZCI6NTEwOC4yNzY5OTk5OTc0MzksImtlZXBHb2luZyI6ZmFsc2UsImhhc05hTiI6ZmFsc2UsInBvaW50cyI6IjEuMzY0NTM1MTYyMTQ5OTA1M2UyNiIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sImEiOnsibWFpblRhYnMiOiJNYWluIn0sImkiOnsibWFpblRhYnMiOiJBc3NlbWJsZXIgQ2hhbGxlbmdlcyJ9fSwibGFzdFNhZmVUYWIiOiJhIiwiaW5mb2JveGVzIjp7ImkiOnsiYWMxIjpmYWxzZSwiYWMyIjpmYWxzZSwiYWMzIjpmYWxzZX19LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjUxMDguMjc2OTk5OTk3NDM5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTEwOC4yNzY5OTk5OTc0MzksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjUxMDguMjc2OTk5OTk3NDM5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTEwOC4yNzY5OTk5OTc0MzksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwicyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMjUyIiwiaXJvbl9wbGF0ZXMiOiIyLjc5ODAyMTQ3NDM2NzQzOTRlNjUiLCJjb3BwZXJfcGxhdGVzIjoiNi4yMjI2NzQwMjgzODgzOTllNTYiLCJ0b3RhbCI6IjI1MiIsImJlc3QiOiIyNTIiLCJyZXNldFRpbWUiOjI2LjAzNjk5OTk5OTk5OTkzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwzMSwxMiwzMiwxMywzMywxNCwzNCwxNSwzNSwyMSwyMiwyMywyNCwyNV0sIm1pbGVzdG9uZXMiOlsiMCIsIjEiLCIyIiwiMyIsIjQiLCI1Il0sImxhc3RNaWxlc3RvbmUiOiI1IiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiYSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMTQiLCJiZWx0cyI6IjEuMDE3OTg3NzQ1Mzc0MTY4NmUyMCIsImluc2VydGVycyI6IjMuNTAzNjgzODYxOTA1NDM4MmUxNyIsInRvdGFsIjoiMTQiLCJiZXN0IjoiMTQiLCJyZXNldFRpbWUiOjI2LjAzNjk5OTk5OTk5OTkzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwyMSwyMiwyMywyNCwyNSwzMSwzMiwzMywzNCwzNSw0MV0sIm1pbGVzdG9uZXMiOlsiMCIsIjEiLCIyIiwiMyIsIjQiLCI1Il0sImxhc3RNaWxlc3RvbmUiOiI1IiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6NCwiMTIiOjUsIjEzIjo1fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJyIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTEwOC4yNzY5OTk5OTc0MzksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTIiLCIxMiI6IjYifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiaSI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjUxMDguMjc2OTk5OTk3NDM5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIyMSI6IiIsIjIyIjoiIiwiMjMiOiIiLCIyNCI6IiIsIjI1IjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifX0=")
            },
            style() {return{
                'background-color': tmp.a.color,
            }}
        },
        25: {
            title: "Assemblers (Part 5)",
            display: "Layer completed",
            canClick: true,
            onClick() {
                if(!confirm("Your current progress will not be saved!")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc1MDUyNTExODcwMSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJ0aGVmYWN0b3Jpb3RyZWVNTTA3IiwidmVyc2lvbiI6IjAuMi4yIiwidGltZVBsYXllZCI6NjA3Mi41NDM5OTk5OTY1NzIsImtlZXBHb2luZyI6ZmFsc2UsImhhc05hTiI6ZmFsc2UsInBvaW50cyI6IjIuMjA1NDI4MDM2MTYxNzI4ZTM4Iiwic3VidGFicyI6eyJjaGFuZ2Vsb2ctdGFiIjp7fSwiYSI6eyJtYWluVGFicyI6Ik1haW4ifSwiaSI6eyJtYWluVGFicyI6IkFzc2VtYmxlciBDaGFsbGVuZ2VzIn19LCJsYXN0U2FmZVRhYiI6InMiLCJpbmZvYm94ZXMiOnsiaSI6eyJhYzEiOnRydWUsImFjMiI6dHJ1ZSwiYWMzIjp0cnVlfX0sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NjA3Mi41NDM5OTk5OTY1NzIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo2MDcyLjU0Mzk5OTk5NjU3MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NjA3Mi41NDM5OTk5OTY1NzIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwicyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMzg4IiwiaXJvbl9wbGF0ZXMiOiI5LjAxNTQxOTk1MTc2OTIxMmU4NCIsImNvcHBlcl9wbGF0ZXMiOiI3LjIyMTI2NzIxOTEyNzQzN2U3NCIsInRvdGFsIjoiMzg4IiwiYmVzdCI6IjM4OCIsInJlc2V0VGltZSI6MTYyLjQ0MzAwMDAwMDAwMjIzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwzMSwxMiwzMiwxMywzMywxNCwzNCwxNSwzNSwyMSwyMiwyMywyNCwyNV0sIm1pbGVzdG9uZXMiOlsiMCIsIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiJdLCJsYXN0TWlsZXN0b25lIjoiNiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImEiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjE4IiwiYmVsdHMiOiI0LjM2NTEwNjEwNzM3MDQ3ZTI0IiwiaW5zZXJ0ZXJzIjoiMy45NDAyNjcxNTUyODI0MTNlMjEiLCJ0b3RhbCI6IjE4IiwiYmVzdCI6IjE4IiwicmVzZXRUaW1lIjoxNjIuNDQzMDAwMDAwMDAyMjMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0LDI1LDMxLDMyLDMzLDM0LDM1LDQxLDQyLDQzLDQ0LDQ1XSwibWlsZXN0b25lcyI6WyIwIiwiMSIsIjIiLCIzIiwiNCIsIjUiLCI2Il0sImxhc3RNaWxlc3RvbmUiOiI2IiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6NSwiMTIiOjUsIjEzIjo1fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJyIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NjA3Mi41NDM5OTk5OTY1NzIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTMiLCIxMiI6IjcifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiaSI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjYwNzIuNTQzOTk5OTk2NTcyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIyMSI6IiIsIjIyIjoiIiwiMjMiOiIiLCIyNCI6IiIsIjI1IjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo2MDcyLjU0Mzk5OTk5NjU3MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9fQ==")
            },
            style() {return{
                'background-color': tmp.a.color,
            }}
        }
    }
})
