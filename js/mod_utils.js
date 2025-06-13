// Formula Display Functions
function getStandardFormula(layer, resource){
    let object = {
        op: "mul",
        args: [
            {
                op: "pow",
                args: [
                    {
                        "variable": tmp[layer].resource 
                    },
                    {
                        "value": tmp[layer][resource].getExp
                    }
                ]
            },
            {
                "value": tmp[layer][resource].getMul
            }
        ]
    }

    return `Formula: ${removeBrackets(formatFormula(object))}`
}


function removeBrackets(str) {
    if (str.startsWith("(") && str.endsWith(")")) return str.slice(1, -1)
    return str
}  


function filterFormula(argument, type) {
    switch (type) {
        case "add":
            if(argument instanceof Object && argument.eq(0)) return false
            return true
        case "sub":
            if(argument instanceof Object && argument.eq(0)) return false
            return true
        case "mul":
            if(argument instanceof Object && argument.eq(1)) return false
            return true
        case "pow":
            if(argument instanceof Object && argument.eq(1)) return false
            return true
        default:
            return true
    }
}


function formatArgument(arg){
    if (arg instanceof Object) {
        return format(arg)
    }
    return arg
}


function formatFormula(object){
    if (object.value) {
        return object.value
    }
    if (object.variable) {
        return `[${object.variable}]`
    }

    switch (object.op) {
        case "add":
            return "(" + object.args.map(formatFormula).filter(arg => filterFormula(arg, "add")).map(formatArgument).join('+') + ")"
        case "sub":
            return "(" + object.args.map(formatFormula).filter(arg => filterFormula(arg, "sub")).map(formatArgument).join('-') + ")"
        case "mul":
            return object.args.map(formatFormula).filter(arg => filterFormula(arg, "mul")).map(formatArgument).join('*')
        case "log": 
            let arg = formatArgument(formatFormula(object.args[0]))
            if(arg.startsWith("(") && arg.endsWith(")")) return "log" + formatArgument(formatFormula(object.args[1])) + arg
            return "log" + formatArgument(formatFormula(object.args[1])) + "(" + arg + ")"
        case "pow": 
            let exp = formatFormula(object.args[1])
            let base = formatArgument(formatFormula(object.args[0]))
            if(!filterFormula(exp, "pow")) return base
            if(base.endsWith(")") || base.endsWith("]")) return "(" + base + "^" + formatArgument(exp) + ")"
            return "(" + "(" + base + ")" + "^" + formatArgument(exp) + ")"
        default:
            return ""
    }
}