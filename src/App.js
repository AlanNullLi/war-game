import React from 'react';
import './App.css';
import { Input, Button } from 'antd';

// //forgot about splice so i panicked and made a queue class lol
// class Queue {
//   constructor() {
//     this.items = [];
//   }
//   enqueue(number) {
//     this.items.push(number);
//   }
//   dequeue() {
//     if (this.isEmpty()) {
//       return -1;
//     } else {
//       return this.items.shift()
//     }
//   }
//   isEmpty() {
//     return this.items.length === 0;
//   }
//   length() {
//     return this.items.length
//   }
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //two queues to hold the cards for bot and player
      bot: null,
      p1: null,
      name: '',
      inputName: '',
      game: false,
      //might make the game multiplayer if possible
      players: 2,
      //current card on top for playing
      botCard: null,
      p1Card: null,
    }
    this.startGame = this.startGame.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.play = this.play.bind(this);
  }

  startGame(p1Name) {
    //makes a deck of cards, can add suits later but might need to make 52 objects then
    //make a set class? no splicing but idk if thats possible in js
    let deck = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    ];
    //creates two new queues to hold hands
    let botHand = [];
    let p1Hand = [];
    //counter of current amount of cards
    let counter = 52;
    //loop to fill hands with all 52 cards
    while (counter > 0) {
      //create index from 1 to counter
      //subtracts one from counter
      //adds deck index to bot hand
      //removes deck index
      //repeats for player hand
      let index1 = Math.floor((Math.random() * counter) + 1);
      counter--;
      botHand.push(deck[index1]);
      deck = deck.splice(index1, 1);
      let index2 = Math.floor((Math.random() * counter) + 1);
      counter--;
      p1Hand.push(deck[index2]);
      deck = deck.splice(index2, 1);
    }
    //adds player name and the two hands to state and sets game to true
    //indicates game is ready to start
    this.setState({
      bot: botHand,
      p1: p1Hand,
      name: p1Name,
      game: true,
    })
  }

  //sets the input to the inputName in state
  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  //this will update the state with the top card of each player
  play() {
    let newBot = this.state.bot
    let newp1 = this.state.p1
    let newBotCard = newBot.shift()
    let newp1Card = newp1.shift()
    this.setState({
      bot: newBot,
      p1: newp1,
      botCard: newBotCard,
      p1Card: newp1Card,
    })
    if (this.state.botCard !== null && this.state.p1Card !== null) {
      if (this.state.botCard > this.state.p1Card) {
        let newHand = this.state.bot
        newHand.push(this.state.botCard)
        newHand.push(this.state.p1Card)
        this.setState({
          bot: newHand
        })
      } else if (this.state.botCard < this.state.p1Card) {
        let newHand = this.state.bot
        newHand.push(this.state.p1Card)
        newHand.push(this.state.botCard)
        this.setState({
          p1: newHand
        })
      }
    }
    console.log(this.state.botCard)
    console.log(this.state.p1Card)
  }

  componentDidUpdate() {
    //if one of the playing cards are -1, end game
  }

  //I think everything can stay in app since components don't do much
  //mostly just methods updating the cards
  //its just a simple display a card then replace it every button click
  render() {

    //if game is on will display the decks and cards but if not will display
    //the starting screen which will ask for a name
    //the game is kinda big could move it to dif component if have time
    if (this.state.game) {
      return (
        <div>
          <div>
            <h2>Bot's Card</h2>
            <h3>Cards remaining: {this.state.bot.length}</h3>
            <div>{this.state.botCard} bot value</div>
          </div>
          <div style={{ marginTop: 20, marginBottom: 20 }}>vs</div>
          <div>
            <div>{this.state.p1Card} p1 value</div>
            <h2>Your Card</h2>
            <h3>Cards remaining: {this.state.p1.length}</h3>
            <Button
              type='submit'
              onClick={this.play}
            >
              Play
            </Button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>I am the ultimate war machine you will never beat me!</h1>
          <Input
            placeholder="Before I crush you, what is your name?"
            value={this.state.inputName}
            onChange={this.handleInput}
            name="inputName"
          />
          <Button
            type='submit'
            onClick={this.startGame}
          >
            Start the robots reign!
          </Button>
        </div>

      );
    }
  }
}

export default App;
