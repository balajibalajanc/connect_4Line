const allCells = document.querySelectorAll('.cell:not(.row-top)');
const topCells = document.querySelectorAll('.cell.row-top');
const resetButton = document.querySelector('.reset');
const statusSpan = document.querySelector('.status');

// columns
const column0 = [allCells[35], allCells[28], allCells[21], allCells[14], allCells[7], allCells[0], topCells[0]];
const column1 = [allCells[36], allCells[29], allCells[22], allCells[15], allCells[8], allCells[1], topCells[1]];
const column2 = [allCells[37], allCells[30], allCells[23], allCells[16], allCells[9], allCells[2], topCells[2]];
const column3 = [allCells[38], allCells[31], allCells[24], allCells[17], allCells[10], allCells[3], topCells[3]];
const column4 = [allCells[39], allCells[32], allCells[25], allCells[18], allCells[11], allCells[4], topCells[4]];
const column5 = [allCells[40], allCells[33], allCells[26], allCells[19], allCells[12], allCells[5], topCells[5]];
const column6 = [allCells[41], allCells[34], allCells[27], allCells[20], allCells[13], allCells[6], topCells[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6];


// rows
const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5], topCells[6]];
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5], allCells[6]];
const row1 = [allCells[7], allCells[8], allCells[9], allCells[10], allCells[11], allCells[12], allCells[13]];
const row2 = [allCells[14], allCells[15], allCells[16], allCells[17], allCells[18], allCells[19], allCells[20]];
const row3 = [allCells[21], allCells[22], allCells[23], allCells[24], allCells[25], allCells[26], allCells[27]];
const row4 = [allCells[28], allCells[29], allCells[30], allCells[31], allCells[32], allCells[33], allCells[34]];
const row5 = [allCells[35], allCells[36], allCells[37], allCells[38], allCells[39], allCells[40], allCells[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow];

//variables
let gameIsLive= true;
let yellowIsNext=true

//get classListArray
const classListArray=(cell)=>{

    const classlist=cell.classList;
    return [...classlist]
}

//get cell loaction

const getCellLocation= (cell)=>{
const classList=classListArray(cell);
const rowClass=classList.find(className => className.includes('row'));
const colClass=classList.find(className => className.includes('col'));
const rowIndex=rowClass[4];
const colIndex=colClass[4];

return[parseInt(rowIndex,10),parseInt(colIndex,10)];

};
//function
const getFirstOpenCellForColumn= (colIndex)=>{
    const column=columns[colIndex];
    const columnsWithoutTop=column.slice(0,6);
    for (const cell of columnsWithoutTop){
        const classList=classListArray(cell);
        if(!classList.includes('red') && !classList.includes('yellow'))
        {
            return(cell);
        }
    }
    return null;
    //console.log(columnsWithoutTop);
}

//function
const clearColorFromTop= (colIndex)=>{
    const topCell=topCells[colIndex];
    topCell.classList.remove('red');
    topCell.classList.remove('yellow');
}

const getColorOfCell=(cell)=>{
const classList=classListArray(cell);
if (classList.includes('yellow')) return 'yellow';
if (classList.includes('red')) return 'red';
return null;
}

const checkWininnigCells=(cells)=> {
    if (cells.length < 4) return false;

            gameIsLive=false;
            for (const cell of cells)
            {
                cell.classList.add('win');
            }
            statusSpan.textContent=`${yellowIsNext ? 'yellow':'red'} has won`
     return true;
}

const checkStatusOfGame=(cell)=>{
const color=getColorOfCell(cell);
if(!color)return;
const [rowIndex,colIndex]=getCellLocation(cell);
//check horizontally
let winningcell=[cell];
let rowToCheck=rowIndex;
let colToCheck=colIndex-1;
while(colToCheck >= 0){
const cellTocheck=rows[rowToCheck][colToCheck]
console.log(cellTocheck);
if(getColorOfCell(cellTocheck) === color)
{
    winningcell.push(cellTocheck);
    colToCheck--;

}
else{ break;}
}

colToCheck=colIndex+1;
while(colToCheck <= 6){
    const cellTocheck=rows[rowToCheck][colToCheck]
    if(getColorOfCell(cellTocheck) === color)
    {
        winningcell.push(cellTocheck);
        colToCheck++;
    
    }
    else{ break;}
    }

    let isWinningCombo=checkWininnigCells(winningcell);
    if(isWinningCombo) return;


//check vertically 
 winningcell=[cell];
 rowToCheck=rowIndex-1;
 colToCheck=colIndex;
while(rowToCheck >= 0){
const cellTocheck=rows[rowToCheck][colToCheck]
if(getColorOfCell(cellTocheck) === color)
{
    winningcell.push(cellTocheck);
    rowToCheck--;

}
else{ break;}
}

rowToCheck=rowIndex +1;
while(rowToCheck <= 5){
    const cellTocheck=rows[rowToCheck][colToCheck]
    if(getColorOfCell(cellTocheck) === color)
    {
        winningcell.push(cellTocheck);
        rowToCheck++;
    
    }
    else{ break;}
    }

     isWinningCombo=checkWininnigCells(winningcell);
    if(isWinningCombo) return;


    //check diagonally /
 winningcell=[cell];
 rowToCheck=rowIndex+1;
 colToCheck=colIndex-1;
while(rowToCheck <= 5 && colToCheck  >= 0){
const cellTocheck=rows[rowToCheck][colToCheck]
if(getColorOfCell(cellTocheck) === color)
{
    winningcell.push(cellTocheck);
    rowToCheck++;
    colToCheck--;

}
else{ break;}
}

rowToCheck=rowIndex -1;
colToCheck=colIndex +1;
while(rowToCheck >= 0 && colToCheck <= 6 ){
    const cellTocheck=rows[rowToCheck][colToCheck]
    if(getColorOfCell(cellTocheck) === color)
    {
        winningcell.push(cellTocheck);
        rowToCheck--;
        colToCheck++;    
    }
    else{ break;}
    }

     isWinningCombo=checkWininnigCells(winningcell);
    if(isWinningCombo) return;

     //check diagonally \
 winningcell=[cell];
 rowToCheck=rowIndex-1;
 colToCheck=colIndex-1;
while(rowToCheck >= 0 && colToCheck  >= 0){
const cellTocheck=rows[rowToCheck][colToCheck]
if(getColorOfCell(cellTocheck) === color)
{
    winningcell.push(cellTocheck);
    rowToCheck--;
    colToCheck--;

}
else{ break;}
}

rowToCheck=rowIndex +1;
colToCheck=colIndex +1;
while(rowToCheck <= 5 && colToCheck <=6 ){
    const cellTocheck=rows[rowToCheck][colToCheck]
    if(getColorOfCell(cellTocheck) === color)
    {
        winningcell.push(cellTocheck);
        rowToCheck++;
        colToCheck++;

    
    }
    else{ break;}
    }

     isWinningCombo=checkWininnigCells(winningcell);
    if(isWinningCombo) return;

const rowWithoutTop=rows.slice(0,6);
    for (const row of rowWithoutTop)
    {
        for (const cell of row )
        {
const classlist=classListArray(cell);
if(!classlist.includes('yellow') && !classlist.includes('red'))
{
    return;
}
        }
    }   
    gameIsLive=false;
    statusSpan.textContent="Game is  a Tie Samathanam "
};

//Event handlers
const handleMouseClick= (e)=>{
    if(!gameIsLive) return;
    const cell =e.target;
    const [rowIndex,colIndex]=getCellLocation(cell);
    console.log(rowIndex,colIndex);
    const openCell=getFirstOpenCellForColumn(colIndex);
    if(!openCell) return ;
    openCell.classList.add(yellowIsNext ? 'yellow':'red');
    checkStatusOfGame(openCell);
    yellowIsNext=!yellowIsNext;
    clearColorFromTop(colIndex);
    if(gameIsLive){
    const topCell=topCells[colIndex];
    topCell.classList.add(yellowIsNext ? 'yellow':'red');
    }
}
//Event Handlers
const handleMOuseOver =(e) =>{
    if(!gameIsLive) return;
const cell =e.target;
const [rowIndex,colIndex]=getCellLocation(cell);

const topCell=topCells[colIndex];
topCell.classList.add( yellowIsNext ? 'yellow' : 'red');
}

//Event Handlers
const handleMouseOut=(e)=> {
    if(!gameIsLive) return;
    const cell =e.target;
    const [rowIndex,colIndex]=getCellLocation(cell);
    //console.log(colIndex);
    clearColorFromTop(colIndex);
}


//Adding Event Listener
for(const row of rows)
{
    for(const cell of row)
    {
        cell.addEventListener('mouseover',handleMOuseOver);
        cell.addEventListener('mouseout',handleMouseOut);
        cell.addEventListener('click',handleMouseClick);
    }
}

resetButton.addEventListener('click',()=>{
    for(const row of rows)
    {
        for (const cell of row)
        {
            cell.classList.remove('red');
            cell.classList.remove('yellow');
            cell.classList.remove('win');
        }
    }
    gameIsLive=true;
    yellowIsNext=true; 
})