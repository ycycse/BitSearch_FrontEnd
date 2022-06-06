const removeLastCharacter = str => {
    if(str[str.length-1]==='"') return str.substring(0, str.length - 1);
    if(str[0]==='"') return str.substring(1, str.length);
    else return str;
}

export default removeLastCharacter;