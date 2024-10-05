/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
  },
];


const newTravellers = [
  {
    id: 1, 
    name: 'Jack', 
    phone: 88885555,
    email: 'jack@example.com',  // new field
    age: 28,                    // new field
    gender: 'Male',             // new field
    seatNumber: 'A1',           // new field
    isVIP: false,               // new field
    bookingTime: new Date(),    
  },
  {
    id: 2, 
    name: 'Rose', 
    phone: 88884444,
    email: 'rose@example.com',  // new field
    age: 25,                    // new field
    gender: 'Female',           // new field
    seatNumber: 'B2',           // new field
    isVIP: true,                // new field
    bookingTime: new Date(),    
  },
];

function TravellerRow(props) {

  /*Q3. Placeholder to initialize local variable based on traveller prop.*/
  const { traveller } = props; // Get traveller data from props
  return (
    /*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/
    <tr>
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.email}</td> {/* new field */}
      <td>{traveller.age}</td> {/* new field */}
      <td>{traveller.gender}</td> {/* new field */}
      <td>{traveller.seatNumber}</td> {/* new field */}
      <td>{traveller.isVIP ? 'Yes' : 'No'}</td> {/* new field */}
      <td>{traveller.bookingTime.toLocaleString()}</td> {/* Display formatted time */}
    </tr>
  );
}

function Display(props) {

  /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  const { travellers } = props; // Get travellers array from props
  
  return (
    <table className="bordered-table">

      
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th> {/* new field */}
          <th>Age</th> {/* new field */}
          <th>Gender</th> {/* new field */}
          <th>Seat Number</th> {/* new field */}
          <th>VIP</th> {/* new field */}
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {travellers.map((traveller) => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <button>Add</button>
      </form>
    );
  }
}

class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	<input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
	</div>);
	}
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = {
      travellers: [], 
      selector: 'homepage',  // Default to showing homepage
      totalSeats: 10, // Total number of seats in the train
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this); // Bind the function for the navigation bar
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: newTravellers });
    }, 500);
  }

  // Switch the currently displayed component
  setSelector(value) {
    this.setState({ selector: value });
  }

  // Function to display the number of free seats
  displayFreeSeats() {
    const freeSeats = this.state.totalSeats - this.state.travellers.length;
    return (
      <div>
        <h3>Available Seats: {freeSeats}</h3>
      </div>
    );
  }

  bookTraveller(passenger) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
  }

  deleteTraveller(passenger) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
  }

  render() {
    const { selector } = this.state;

    return (
      <div>
        <h1>Ticket To Ride</h1>
        {/* Navigation bar */}
        <div>
          <button onClick={() => this.setSelector('homepage')}>Homepage</button>
          <button onClick={() => this.setSelector('add')}>Add Traveller</button>
          <button onClick={() => this.setSelector('display')}>Display Travellers</button>
        </div>

        {/* Display the component based on the selector value */}
        <div>
          {selector === 'homepage' && (
            <div>
              <h2>Welcome to the High-Speed Railway Booking System</h2>
              {this.displayFreeSeats()} {/* Display the number of available seats */}
            </div>
          )}

          {selector === 'add' && (
            <Add />
          )}

          {selector === 'display' && (
            <Display travellers={this.state.travellers} />
          )}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));