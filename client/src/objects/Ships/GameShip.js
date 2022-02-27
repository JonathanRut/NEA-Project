import Ship from "./Ship";
import InteractiveCell from "../Cells/InteractiveCell";
import MultiplayerCell from "../Cells/MultiplayerCell";

export default class GameShip extends Ship
{
    constructor(length,origin,properties,owner,board)
    {
        super(length,origin,properties,board);
        this.shipCells = [];
        this.borderCells = [];
        this.hits = 0;
        this.floating = true;
        this.owner = owner;
    }
    
    Hit()
    {
        this.hits += 1;
        if(this.hits === this.length)
        {
            this.borderCells.forEach(cell =>
            {
                cell.showCell(false);
            });
            this.floating = false;
            const messages = document.getElementById('messages');
            var newMessage = document.createElement('li');
            newMessage.textContent = `${this.owner}: You sunk my ${this.name}`;
            messages.appendChild(newMessage);
            messages.scrollTo(0,messages.scrollHeight);          
            this.board.justHit = false;
            this.board.sinks += 1
        }
    }

    AddBorderCell(cell)
    {
        this.borderCells.push(cell);
        if(!(cell instanceof InteractiveCell || cell instanceof MultiplayerCell))
        {
            cell.visualCell.setFillStyle(0xd0d0d0);
        }
    }

    AddShipCell(cell)
    {
        this.shipCells.push(cell);
        
        if(!(cell instanceof InteractiveCell || cell instanceof MultiplayerCell))
        {
            this.board.scene.add.sprite(cell.origin.x + 4, cell.origin.y + 4 ,'shipPart').setOrigin(0,0);
            cell.visualCell.setFillStyle(0xa0a0a0);
        }
    }
}