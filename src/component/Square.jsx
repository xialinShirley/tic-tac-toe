import React from 'react';

function Square(props){
    //以button形式绘制每个方块，并从props传入点击事件和方块对应的图形
    return (<button className="square" onClick={props.onClick}>
    {props.value}
    </button>)
    ;
}

export default Square;