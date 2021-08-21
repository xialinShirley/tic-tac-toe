import React,{useState} from 'react';
import Board from './Board';

function Game(){
        //存储棋局情况
        const [history,setHistory]=useState([{squares:Array(9).fill(null),}]);
        //记录下一手轮到谁
        const [xIsNext,setxIsNext]=useState(true);
        const [stepNumber,setstepNumber]=useState(0);
        function handleClick(i){
            const tempHistory=history.slice(0,stepNumber+1);
            const current=tempHistory[tempHistory.length-1];
            const tempSquares=current.squares.slice();
            //对局已结束或者该位置已经有棋子
            if(calculateWinner(tempSquares)||tempSquares[i]){
                return;
            }
            //在点击位置记录棋子
            tempSquares[i]=xIsNext?'X':'O';
            //更新状态
            setHistory(tempHistory.concat([{squares:tempSquares}]));
            setxIsNext(prev=>!prev);
            setstepNumber(tempHistory.length)
        }
        //跳转到记录的某一步
        function jumpTo(step){
            setstepNumber(step);
            setxIsNext(step%2===0);
        }
        
        function showStatus(squares){
            const winner=calculateWinner(squares);
            let status;
            if(winner){
                status='Winner'+winner;
            }else{
                status='Next Player：'+(xIsNext?'X':'O');
            }
            return status;
            }
        function showMoves(history){
            const moves=history.map((step,move)=>{
                const desc=move?'Go to move #'+ move : 'Go to game start';
                return(
                    <li key={move}>
                    <button onClick={()=>jumpTo(move)}>{desc}</button>
                    </li>
                )
            })
            return moves;
        }
        return(
            <div className="game">
            <div className="game-board">
            <Board squares={history[stepNumber].squares} onClick={(i)=>handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{showStatus(history[stepNumber].squares)}</div>
                <ol>{ showMoves(history)}</ol>
            </div>
            </div>
        )
}
export default Game;


//判断对局是否已决出胜负
function calculateWinner(squares){
//存储所有获胜棋谱
const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
for(let i=0;i<lines.length;i++){
    const [a,b,c]=lines[i];
    //保证是同一玩家连成三子
    if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c])
    {
        return squares[a];
    }
}
return null;
}